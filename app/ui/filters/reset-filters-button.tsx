'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function ResetFiltersButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname(); 

    const handleReset = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());

        ['rating', 'year', 'genre', 'genres', 'country', 'countries'].forEach((filter) => {
            params.delete(filter);
        });

        const newUrl = params.toString() ? `?${params.toString()}` : '';

        router.push(`${pathname}${newUrl}`, { scroll: false });

        ['rating', 'year', 'genre', 'genres', 'country', 'countries'].forEach((filter) => {
            localStorage.removeItem(filter);
        });
    }, [router, searchParams, pathname]);

    return (
        <button 
            onClick={handleReset}
            className="text-white bg-black w-full py-2 box-border text-center font-medium rounded-lg cursor-pointer"
        >
            Сброс фильтров
        </button>
    );
}
