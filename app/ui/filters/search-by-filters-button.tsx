'use client';

import { useRouter } from "next/navigation";

export default function SearchByFiltersButton() {
    const router = useRouter();

    return (
        <button 
            onClick={() => {
                router.replace(window.location.pathname, { scroll: false });
            }}
            className="text-black bg-[#66FCF0] border border-black w-full py-2 box-border text-center font-medium rounded-lg cursor-pointer"
        >
            Поиск по фильтрам
        </button>
    )
}
