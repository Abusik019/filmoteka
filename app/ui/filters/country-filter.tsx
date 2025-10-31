"use client";

import { useCountries } from "@app/lib/kinopoisk/useCountries";
import { Checkbox } from "antd";
import Loader from "@app/ui/loader";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CountryFilter() {
    const searchParams = useSearchParams();
    const { data, isLoading, error, isSuccess } = useCountries();

    const [countries, setCountries] = useState<string[]>(() => {
        const saved = sessionStorage.getItem("country");
        return saved ? saved.split(",") : [];
    });

    const handleUpdateCountries = (country: string, isChecked: boolean) => {
        const updatedCountries = isChecked ? [...countries, country] : countries.filter((c) => c !== country);

        setCountries(updatedCountries);

        if (updatedCountries.length > 0) {
            sessionStorage.setItem("country", updatedCountries.join(","));
        } else {
            sessionStorage.removeItem("country");
        }
    };

    useEffect(() => {
        const saved = sessionStorage.getItem("country");
        setCountries(saved ? saved.split(",") : []);
    }, [searchParams]);

    if (isLoading) return <Loader />;
    if (error) return <p>Ошибка при загрузке стран</p>;

    return (
        <ul className="flex flex-col items-start gap-2">
            {isSuccess &&
                data.map((c) => (
                    <li key={c.name}>
                        <Checkbox
                            style={{
                                color: "white",
                                textTransform: "capitalize",
                                fontSize: "16px",
                                gap: "10px",
                            }}
                            checked={countries.includes(c.name)}
                            onChange={(e) => handleUpdateCountries(c.name, e.target.checked)}
                        >
                            {c.name}
                        </Checkbox>
                    </li>
                ))}
        </ul>
    );
}
