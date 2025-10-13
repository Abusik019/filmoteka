"use client";

import { TypeFilter, TypeFilterState } from "@app/types";
import RatingFilter from "@app/ui/filters/rating-filter";
import GenreFilter from "@app/ui/filters/genre-filter";
import CountryFilter from "@app/ui/filters/country-filter";
import YearRangeFilter from "@app/ui/filters/year-range-filter";
import ResetFiltersButton from "@app/ui/filters/reset-filters-button";
import SearchByFiltersButton from "@app/ui/filters/search-by-filters-button";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filters: TypeFilter[] = [
    {
        id: 1,
        label: "Рейтинг",
        name: "rating",
        content: <RatingFilter />
    },
    {
        id: 2,
        label: "Жанры",
        name: "genres",
        content: <GenreFilter />
    },
    {
        id: 3,
        label: "Страны",
        name: "countries",
        content: <CountryFilter />
    },
    {
        id: 4,
        label: "Дата выпуска фильмов",
        name: "date",
        content: <YearRangeFilter />
    },
];

export default function FiltersPanel() {
    const [openFilters, setOpenFilters] = useState<TypeFilterState[]>([
        { name: "rating", isOpen: false },
        { name: "genres", isOpen: false },
        { name: "countries", isOpen: false },
        { name: "date", isOpen: false },
    ]);

    const toggleFilter = (name: string) => {
        setOpenFilters((prev) =>
            prev.map((f) => (f.name === name ? { ...f, isOpen: !f.isOpen } : f))
        );
    };

    return (
        <section className="w-full h-fit p-5 box-border rounded-3xl border-2 border-[#66FCF0] flex flex-col items-center gap-5">
            <h1 className="text-center font-medium text-xl">
                Поиск по фильтрам
            </h1>
            <ul className="w-full mt-10 flex flex-col items-start gap-5">
                {filters.map((item) => {
                    const current = openFilters.find((f) => f.name === item.name);
                    const isOpen = current?.isOpen ?? false;

                    return (
                        <li key={item.id} className="w-full">
                            <div className="mb-2 border-b-2 border-[#66FCF0] pb-2 box-border flex items-center justify-between">
                                <h2 className="text-lg font-medium">{item.label} </h2>
                                <button
                                    className={`cursor-pointer transition-transform duration-300 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                    onClick={() => toggleFilter(item.name)}
                                >
                                    <Image
                                        src="/icons/arrow.svg"
                                        width={24}
                                        height={24}
                                        alt="arrow"
                                    />
                                </button>
                            </div>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        className="mt-5 w-full"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {item.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    );
                })}
            </ul>
            <div className="w-full flex flex-col items-center gap-2 mt-20">
                <ResetFiltersButton />
                <SearchByFiltersButton />
            </div>
        </section>
    );
}
