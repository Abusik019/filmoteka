import { NextResponse } from "next/server";
import { tmdbFetcher } from "@app/lib/kinopoisk/fetcher";
import { IGenreListResponse } from "@app/lib/kinopoisk/types";
import { TMDB_PATHS } from "@app/lib/kinopoisk/endpoints";

export async function GET() {
    try {
        const data = await tmdbFetcher<IGenreListResponse>(TMDB_PATHS.genres);
        return NextResponse.json(data);
    } catch (error: unknown) {
        console.error("Failed to fetch genres:", error);
        return NextResponse.json(
            { message: "Error fetching genres" },
            { status: 500 }
        );
    }
}