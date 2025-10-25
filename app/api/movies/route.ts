import { kp } from "@app/lib/kinopoisk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const year = searchParams.get("year");
    const rating = searchParams.get("rating");
    const country = searchParams.get("country");

    try {
        const filters: Record<string, unknown> = {};
        if (genre) filters["genres.name"] = genre;
        if (country) filters["countries.name"] = country;
        if (year) filters.year = Number(year);

        if (rating) {
            const [minStr, maxStr] = rating.split(/[-–—]/).map(s => s.trim());
            const min = Number(minStr);
            const max = maxStr ? Number(maxStr) : undefined;

            if (Number.isFinite(min) && Number.isFinite(max)) {
                filters["rating.imdb"] = `${min}-${max}`;
            } else if (Number.isFinite(min)) {
                filters["rating.imdb"] = `${min}-10`;
            }
        }

        const data = await kp.movie.getByFilters({
            limit: 10,
            ...filters,
        });
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return NextResponse.json(
            { message: "Error fetching movies" },
            { status: 500 }
        );
    }
}