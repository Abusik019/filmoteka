"use client";

import { useGenres } from "@app/lib/kinopoisk/useGenres";
import { Checkbox } from "antd";
import Loader from "@app/ui/loader";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function GenreFilter() {
    const searchParams = useSearchParams();

    const { data, isLoading, error, isSuccess } = useGenres();
    
    const [genres, setGenres] = useState<string[]>(() => {
        const saved = sessionStorage.getItem("genre");
        return saved ? saved.split(",") : [];
    });

    const handleUpdateGenres = (genre: string, isChecked: boolean) => {
        const updatedGenres = isChecked
            ? [...genres, genre]
            : genres.filter((g) => g !== genre);

        setGenres(updatedGenres);

        if (updatedGenres.length > 0) {
            sessionStorage.setItem("genre", updatedGenres.join(","));
        } else {
            sessionStorage.removeItem("genre");
        }
    };

    useEffect(() => {
        const saved = sessionStorage.getItem("genre");
        setGenres(saved ? saved.split(",") : []);
    }, [searchParams]);

    if (isLoading) return <Loader />;
    if (error) return <p>Ошибка при загрузке жанров</p>;

    return (
        <ul className="flex flex-col items-start gap-2">
            {isSuccess &&
                data.map((g) => (
                    <li key={g.name}>
                        <Checkbox
                            style={{
                                color: "white",
                                textTransform: "capitalize",
                                fontSize: "16px",
                                gap: "10px",
                            }}
                            checked={genres.includes(g.name)}
                            onChange={(e) => handleUpdateGenres(g.name, e.target.checked)}
                        >
                            {g.name}
                        </Checkbox>
                    </li>
                ))}
        </ul>
    );
}
