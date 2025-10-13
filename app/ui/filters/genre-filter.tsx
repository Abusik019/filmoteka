"use client";

import { useGenres } from "@app/lib/kinopoisk/useGenres";
import { useSearchParams, useRouter } from "next/navigation"; 
import { Checkbox } from "antd";
import Loader from "@app/ui/loader";

export default function GenreFilter() {
    const { data: genres, isLoading, error, isSuccess } = useGenres();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const currentGenres = params.get("genre") ? params.get("genre")!.split(",") : [];

    const handleUpdateGenres = (genre: string, isChecked: boolean) => {
        if (isChecked) {
            if (!currentGenres.includes(genre)) {
                currentGenres.push(genre);
            }
        } else {
            const index = currentGenres.indexOf(genre);
            if (index > -1) {
                currentGenres.splice(index, 1);
            }
        }

        if (currentGenres.length > 0) {
            params.set("genre", currentGenres.join(","));
        } else {
            params.delete("genre");
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Ошибка при загрузке жанров</p>;

    return (
        <ul className="flex flex-col items-start gap-2">
            {isSuccess &&
                genres.map((g) => (
                    <li key={g.name}>
                        <Checkbox
                            style={{
                                color: "white",
                                textTransform: "capitalize",
                                fontSize: "16px",
                                gap: "10px",
                            }}
                            checked={currentGenres.includes(g.name)}
                            onChange={(e) => handleUpdateGenres(g.name, e.target.checked)}
                        >
                            {g.name}
                        </Checkbox>
                    </li>
                ))}
        </ul>
    );
}
