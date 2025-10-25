"use client";

import { useCountries } from "@app/lib/kinopoisk/useCountries";
import { Checkbox } from "antd";
import Loader from "@app/ui/loader";
import { useState } from "react";

export default function CountryFilter() {
    const { data, isLoading, error, isSuccess } = useCountries();
    const currentCountries = localStorage.getItem("country") ? localStorage.getItem("country")!.split(",") : [];
    const [countries, setCountries] = useState<string[]>(currentCountries);

    const handleUpdateCountries = (country: string, isChecked: boolean) => {
        const updatedCountries = isChecked ? [...countries, country] : countries.filter((c) => c !== country);

        setCountries(updatedCountries);

        if (updatedCountries.length > 0) {
            localStorage.setItem("country", updatedCountries.join(","));
        } else {
            localStorage.removeItem("country");
        }
    };

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
