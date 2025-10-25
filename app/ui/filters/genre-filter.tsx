"use client";

import { useGenres } from "@app/lib/kinopoisk/useGenres";
import { Checkbox } from "antd";
import Loader from "@app/ui/loader";
import { useState } from "react";

export default function GenreFilter() {
    const { data, isLoading, error, isSuccess } = useGenres();
    const currentGenres = localStorage.getItem("genre") ? localStorage.getItem("genre")!.split(",") : [];
    const [genres, setGenres] = useState<string[]>(currentGenres);

    const handleUpdateGenres = (genre: string, isChecked: boolean) => {
        const updatedGenres = isChecked
            ? [...genres, genre]
            : genres.filter((g) => g !== genre);

        setGenres(updatedGenres);

        if (updatedGenres.length > 0) {
            localStorage.setItem("genre", updatedGenres.join(","));
        } else {
            localStorage.removeItem("genre");
        }
    };

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
