"use client";

import { useSearchParams } from "next/navigation";
import { useMovies } from "@app/lib/kinopoisk/useMovies";
import { useMoviesByQuery } from "@app/lib/kinopoisk/useMoviesByQuery"; 
import MovieCardSkeleton from "@app/ui/skeletons/movie-card-skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieGrid() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const page = searchParams.get("page") || "1";

    const filters = {
        genres: searchParams.getAll("genre"),
        countries: searchParams.getAll("country"),
        year: searchParams.get("year") || "",
        rating: searchParams.get("rating") || "",
        page: page,
    };

    const { data: moviesData, isLoading: moviesLoading, isError: moviesError } = useMovies(filters);
    const { data: searchData, isLoading: searchLoading, isError: searchError } = useMoviesByQuery(query, page);

    const hasSearchQuery = !!query;
    const data = hasSearchQuery ? searchData : moviesData;
    const isLoading = hasSearchQuery ? searchLoading : moviesLoading;
    const isError = hasSearchQuery ? searchError : moviesError;

    if (isError)
        return <p className="text-red-400">Ошибка при загрузке фильмов</p>;

    const movies = data?.docs || [];

    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 12 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!movies.length) {
        return (
            <p className="text-gray-300">
                {hasSearchQuery 
                    ? `Не найдено фильмов по запросу "${query}"`
                    : "Нет фильмов по выбранным фильтрам"
                }
            </p>
        );
    }

    return (
        <motion.div
            key={`${query}-${page}`} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
            <AnimatePresence>
                {movies.map((movie) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="bg-gray-900 p-3 rounded-xl border border-gray-700 hover:scale-[1.02] transition-transform"
                    >
                        <img
                            // @ts-ignore
                            src={hasSearchQuery 
                                ? (movie.poster || "/images/no-poster.jpg")
                                : (movie.poster?.url || "/images/no-poster.jpg")
                            }
                            alt={movie.name || 'poster'}
                            className="rounded-lg w-full h-64 object-cover"
                        />
                        <h3 className="mt-3 font-medium text-white">
                            {movie.name}
                        </h3>
                        {!hasSearchQuery ? (
                            <p className="text-sm text-gray-400">
                                {movie.year} • IMDb: {movie.rating?.imdb ?? "—"}
                            </p>
                        ) : (
                            // @ts-ignore
                            <p className="text-sm text-gray-400"> {movie.year} • Кинопоиск: {movie.rating ?? "—"}</p>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}