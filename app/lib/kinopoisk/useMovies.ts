"use client";

import { MovieDocsResponseDtoV1 } from "@openmoviedb/kinopoiskdev_client";
import { useQuery } from "@tanstack/react-query";
import { IMovieFilters } from "./types";

export function useMovies(filters: IMovieFilters) {
    return useQuery<MovieDocsResponseDtoV1, Error>({
        queryKey: ["movies", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.genre) params.set("genres.name", filters.genre);
            if (filters.country) params.set("countries.name", filters.country);
            if (filters.year) params.set("year", filters.year);
            if (filters.rating) params.set("rating.imdb", filters.rating);

            const res = await fetch(`/api/movies?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch movies");

            return res.json() as Promise<MovieDocsResponseDtoV1>;
        },
        staleTime: 1000 * 60 * 60,
    });
}