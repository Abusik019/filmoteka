'use client';

import { useRouter } from "next/navigation";

export default function SearchByFiltersButton() {
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();

        const genre = localStorage.getItem("genre");
        const country = localStorage.getItem("country");
        const year = localStorage.getItem("year");
        const rating = localStorage.getItem("rating");

        if (genre) params.set("genre", genre);
        if (country) params.set("country", country);
        if (year) params.set("year", year);
        if (rating) params.set("rating", rating);

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <button
            onClick={handleSearch}
            className="text-black bg-[#66FCF0] border border-black w-full py-2 box-border text-center font-medium rounded-lg cursor-pointer"
        >
            Поиск по фильтрам
        </button>
    );
}
