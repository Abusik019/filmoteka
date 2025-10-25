'use client';

import { useSearchParams } from "next/navigation";
import { useMovies } from "@app/lib/kinopoisk/useMovies";
import Loader from "@app/ui/loader";

export default function MovieGrid() {
    const searchParams = useSearchParams();

    const filters = {
        genre: searchParams.get("genre") || "",
        country: searchParams.get("country") || "",
        year: searchParams.get("year") || "",
        rating: searchParams.get("rating") || "",
    };

    const { data, isLoading, isError } = useMovies(filters);

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-red-400">Ошибка при загрузке фильмов</p>;

    const movies = data?.data.docs || [];

    if (!movies.length) return <p>Нет фильмов по выбранным фильтрам</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="bg-gray-900 p-3 rounded-xl border border-gray-700 hover:scale-[1.02] transition-transform"
                >
                    <img
                        src={movie.poster?.url || "/no-poster.jpg"}
                        alt={movie.name}
                        className="rounded-lg w-full h-64 object-cover"
                    />
                    <h3 className="mt-3 font-medium text-white">{movie.name}</h3>
                    <p className="text-sm text-gray-400">
                        {movie.year} • IMDb: {movie.rating?.imdb ?? "—"}
                    </p>
                </div>
            ))}
        </div>
    );
}
