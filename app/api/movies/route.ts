import { kp } from "@app/lib/kinopoisk";
import { NextResponse } from "next/server";

function normalizeIncludeExclude(values: string[]) {
    const cleaned = values.map((v) => v.trim()).filter(Boolean);

    return cleaned.map((v) =>
        v.startsWith("+") || v.startsWith("!") ? v : `+${v}`
    );
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const rawGenres = [
        ...searchParams.getAll("genre"),
        ...searchParams.getAll("genres.name"),
    ];

    const rawCountries = [
        ...searchParams.getAll("country"),
        ...searchParams.getAll("countries.name"),
    ];

    const years = searchParams
        .getAll("year")
        .map((y) => y.trim())
        .filter(Boolean);
    const ratingImdb = searchParams.get("rating.imdb")?.trim();

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "12");

    try {
        const query: Record<string, unknown> = { page, limit };
        const genres = normalizeIncludeExclude(rawGenres);

        if (genres.length === 1) {
            query["genres.name"] = genres[0];
        } else if (genres.length > 1) {
            query["genres.name"] = genres;
        }

        const countries = normalizeIncludeExclude(rawCountries);
        if (countries.length === 1) {
            query["countries.name"] = countries[0];
        } else if (countries.length > 1) {
            query["countries.name"] = countries;
        }

        if (years.length === 1) {
            query["year"] = years[0];
        } else if (years.length > 1) {
            query["year"] = years; 
        }

        if (ratingImdb) {
            query["rating.imdb"] = ratingImdb; 
        }

        const data = await kp.movie.getByFilters(query);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return NextResponse.json(
            { message: "Error fetching movies" },
            { status: 500 }
        );
    }
}
