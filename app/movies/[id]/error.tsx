'use client';

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Movie page error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1f2833] text-white">
            <h1 className="text-3xl font-bold text-[#66fcf0] mb-2">
                Что-то пошло не так 😢
            </h1>
            <p className="text-gray-400 mb-6">
                Не удалось загрузить информацию о фильме.
            </p>
            <button
                onClick={() => reset()}
                className="bg-[#45a29e] hover:bg-[#66fcf0] transition-all text-black px-4 py-2 rounded-xl font-medium"
            >
                Попробовать снова
            </button>
        </div>
    );
}
