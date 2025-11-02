import { kp } from "@app/lib/kinopoisk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const   query = searchParams.get("query")?.trim(),
            page = Number(searchParams.get("page") || "1"),
            limit = Number(searchParams.get("limit") || "12");

    try {
        if (!query) {
            return NextResponse.json(
                { message: "Query parameter is required" },
                { status: 400 }
            );
        }

        const params: Record<string, unknown> = { page, limit, query };

        const data = await kp.movie.getBySearchQuery(params);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return NextResponse.json(
            { message: "Error fetching movies" },
            { status: 500 }
        );
    }
}
