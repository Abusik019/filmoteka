'use client';

import { IMovieFilters } from "@app/lib/kinopoisk/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchByFiltersButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<IMovieFilters>({});

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        setFilters(params);
    }, [searchParams]);

    return (
        <button 
            onClick={() => {router.replace(window.location.pathname, { scroll: false })}}
            className="text-black bg-[#66FCF0] border border-black w-full py-2 box-border text-center font-medium rounded-lg cursor-pointer"
        >
            Поиск по фильтрам
        </button>
    );
}
