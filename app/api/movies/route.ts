import { kp } from "@app/lib/kinopoisk";
import { NextResponse } from "next/server";

function normalizeIncludeExclude(values: string[]) {
    // Обрезаем пробелы и отбрасываем пустые
    const cleaned = values.map((v) => v.trim()).filter(Boolean);

    // Если пользователь уже передал + или !, оставляем как есть.
    // Если без префикса — добавляем + (включить) для явного AND по каждому значению.
    return cleaned.map((v) =>
        v.startsWith("+") || v.startsWith("!") ? v : `+${v}`
    );
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Поддерживаем оба варианта: ваш клиентский 'genre' и прямой 'genres.name'
    const rawGenres = [
        ...searchParams.getAll("genre"),
        ...searchParams.getAll("genres.name"),
    ];

    const rawCountries = [
        ...searchParams.getAll("country"),
        ...searchParams.getAll("countries.name"),
    ];

    // year может быть повторяющимся (несколько лет) или диапазоном "2020-2023"
    const years = searchParams
        .getAll("year")
        .map((y) => y.trim())
        .filter(Boolean);
    const ratingImdb = searchParams.get("rating.imdb")?.trim(); // например "8-10"

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "12");

    try {
        const query: Record<string, unknown> = { page, limit };

        // Жанры: формируем как повторяющиеся genres.name с явным оператором + или !
        // Повторение параметров => AND. Префикс + делает намерение явно “включить”.
        const genres = normalizeIncludeExclude(rawGenres);
        if (genres.length === 1) {
            // Один жанр — можно строкой (SDK сформирует ?genres.name=%2Bбоевик)
            query["genres.name"] = genres[0];
        } else if (genres.length > 1) {
            // Несколько жанров — массив (SDK сформирует повторяющиеся ?genres.name=...)
            query["genres.name"] = genres;
        }

        // Страны: тот же подход (можно включать/исключать через + / !)
        const countries = normalizeIncludeExclude(rawCountries);
        if (countries.length === 1) {
            query["countries.name"] = countries[0];
        } else if (countries.length > 1) {
            query["countries.name"] = countries;
        }

        // Годы: поддержим и несколько значений, и диапазон (как в доке)
        if (years.length === 1) {
            query["year"] = years[0]; // "2023" или "2020-2023"
        } else if (years.length > 1) {
            query["year"] = years; // ?year=2022&year=2023
        }

        if (ratingImdb) {
            query["rating.imdb"] = ratingImdb; // "8-10" или "8"
        }

        // Для отладки полезно посмотреть фактический запрос
        // console.log("KP query:", JSON.stringify(query, null, 2));

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
