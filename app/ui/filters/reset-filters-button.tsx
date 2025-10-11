'use client';

import { useRouter } from "next/navigation";

export default function ResetFiltersButton() {
    const router = useRouter();

    return (
        <button 
            onClick={() => {
                router.replace(window.location.pathname, { scroll: false });
            }}
            className="text-white bg-black w-full py-2 box-border text-center font-medium rounded-lg cursor-pointer"
        >
            Сброс фильтров
        </button>
    )
}
