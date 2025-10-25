"use client";

import { MovieDocsResponseDtoV1 } from "@openmoviedb/kinopoiskdev_client";
import { useQuery } from "@tanstack/react-query";
import { IMovieFilters } from "./types";

export function useMovies(filters: IMovieFilters) {
    return useQuery<{ data: MovieDocsResponseDtoV1 }, Error>({
        queryKey: ["movies", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.genre) params.set("genre", filters.genre);
            if (filters.country) params.set("country", filters.country);
            if (filters.year) params.set("year", filters.year);
            if (filters.rating) params.set("rating.imdb", filters.rating);

            const res = await fetch(`/api/movies?${params.toString()}`, { cache: "no-store" });
            if (!res.ok) throw new Error("Failed to fetch movies");

            return res.json();
        },
        staleTime: 1000 * 60 * 60, 
    });
}
