import { kp } from "@app/lib/kinopoisk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const year = searchParams.get("year");
    const rating = searchParams.get("rating");

    try {
        const filters: Record<string, unknown> = {};
        if (genre) filters.genres = genre;
        if (year) filters.year = Number(year);
        if (rating) filters["rating.imdb"] = { $gte: Number(rating) };

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
