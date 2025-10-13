import { NextResponse } from "next/server";
import { kinopoiskFetcher } from "@app/lib/kinopoisk/fetcher";
import { IGenreListResponse } from "@app/lib/kinopoisk/types";
import { KINOPOISK_PATHS } from "@app/lib/kinopoisk/endpoints";

export async function GET() {
    try {
        const data = await kinopoiskFetcher<IGenreListResponse>(KINOPOISK_PATHS.genres);
        return NextResponse.json(data);
    } catch (error: unknown) {
        console.error("Failed to fetch genres:", error);
        return NextResponse.json(
            { message: "Error fetching genres" },
            { status: 500 }
        );
    }
}