import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "API klíč nenalezen. Nastavte GOOGLE_PLACES_API_KEY v .env.local",
      },
      { status: 500 },
    );
  }

  let placeId = process.env.GOOGLE_PLACE_ID;

  try {
    // 1. Získat Place ID pokud není definováno, přes Find Place API
    if (!placeId) {
      const findPlaceRes = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Separé%20Mikulandská%20133&inputtype=textquery&fields=place_id&key=${apiKey}`,
        { next: { revalidate: 86400 } }, // Cache na den
      );
      const findPlaceData = await findPlaceRes.json();

      if (
        findPlaceData.status === "OK" &&
        findPlaceData.candidates.length > 0
      ) {
        placeId = findPlaceData.candidates[0].place_id;
      } else {
        return NextResponse.json(
          { error: "Podnik nenalezen na Google Maps.", data: findPlaceData },
          { status: 404 },
        );
      }
    }

    // 2. Stáhnout detaily podniku: 5 nejnovějších recenzí + agregát (rating + count)
    const detailsRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=cs&reviews_sort=newest&key=${apiKey}`,
      { next: { revalidate: 14400 } },
    );
    const detailsData = await detailsRes.json();

    if (detailsData.status !== "OK" || !detailsData.result?.reviews) {
      return NextResponse.json(
        { error: "Nepodařilo se načíst recenze.", status: detailsData.status },
        { status: 500 },
      );
    }

    // 3. Vyfiltrovat recenze (jen 5 hvězd) a namapovat do našeho formátu
    const rawReviews = detailsData.result.reviews;

    interface GoogleReview {
      author_name: string;
      text: string;
      relative_time_description: string;
      rating: number;
    }

    const filtered = rawReviews
      .filter(
        (r: GoogleReview) =>
          r.rating === 5 && r.text && r.text.trim().length > 0,
      )
      .map((r: GoogleReview) => ({
        name: r.author_name,
        text: r.text,
        date: r.relative_time_description,
        rating: r.rating,
      }))
      .slice(0, 3);

    return NextResponse.json(
      {
        reviews: filtered,
        rating: detailsData.result.rating ?? null,
        ratingsTotal: detailsData.result.user_ratings_total ?? null,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=14400, stale-while-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Chyba při stahování Google recenzí:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 },
    );
  }
}
