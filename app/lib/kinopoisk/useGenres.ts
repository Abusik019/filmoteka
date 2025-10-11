"use client";

import { useQuery } from "@tanstack/react-query";
import { IGenreListResponse } from "@app/lib/kinopoisk/types";

export function useGenres() {
    return useQuery<IGenreListResponse, Error>({
        queryKey: ["genres"],
        queryFn: async () => {
            const res = await fetch("/api/genres");
            if (!res.ok) throw new Error("Failed to load genres");
            return res.json();
        },
        staleTime: 1000 * 60 * 60,
    });
}