import { NextResponse } from "next/server";
import { kinopoiskFetcher } from "@app/lib/kinopoisk/fetcher";
import { ICountryListResponse } from "@app/lib/kinopoisk/types";
import { KINOPOISK_PATHS } from "@app/lib/kinopoisk/endpoints";

export async function GET() {
    try {
        const data = await kinopoiskFetcher<ICountryListResponse>(KINOPOISK_PATHS.countries);
        return NextResponse.json(data);
    } catch (error: unknown) {
        console.error("Failed to fetch countries:", error);
        return NextResponse.json(
            { message: "Error fetching countries" },
            { status: 500 }
        );
    }
}