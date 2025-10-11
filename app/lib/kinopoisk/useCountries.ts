"use client";

import { useQuery } from "@tanstack/react-query";
import { ICountryListResponse } from "@app/lib/kinopoisk/types";

export function useCountries() {
    return useQuery<ICountryListResponse, Error>({
        queryKey: ["countries"],
        queryFn: async () => {
            const res = await fetch("/api/countries");
            if (!res.ok) throw new Error("Failed to load countries");
            return res.json();
        },
        staleTime: 1000 * 60 * 60,
    });
}