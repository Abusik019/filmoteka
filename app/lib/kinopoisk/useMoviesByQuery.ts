"use client";

import { MovieDocsResponseDtoV1 } from "@openmoviedb/kinopoiskdev_client";
import { useQuery } from "@tanstack/react-query";

export function useMoviesByQuery(query: string, page: string) {
    return useQuery<MovieDocsResponseDtoV1, Error>({
        queryKey: ["moviesByQuery", query, page],
        queryFn: async () => {
            const params = new URLSearchParams();

            if(query) params.append("query", query);
            if(page) params.append("page", page);

            const res = await fetch(`/api/movies/search?${params.toString()}`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch movies");

            const json = await res.json();
            return json.data as MovieDocsResponseDtoV1;
        },
        enabled: !!query, 
        staleTime: 1000 * 60 * 60,
    });
}