"use client";

import { useCountries } from "@app/lib/kinopoisk/useCountries";
import { useSearchParams, useRouter } from "next/navigation"; 
import { Checkbox } from "antd";
import Loader from "@app/ui/loader";

export default function CountryFilter() {
    const { data: countries, isLoading, error, isSuccess } = useCountries();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const currentCountries = params.get("country") ? params.get("country")!.split(",") : [];

    const handleUpdateCountries = (country: string, isChecked: boolean) => {
        if (isChecked) {
            if (!currentCountries.includes(country)) {
                currentCountries.push(country);
            }
        } else {
            const index = currentCountries.indexOf(country);
            if (index > -1) {
                currentCountries.splice(index, 1);
            }
        }

        if (currentCountries.length > 0) {
            params.set("country", currentCountries.join(","));
        } else {
            params.delete("country");
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Ошибка при загрузке стран</p>;

    return (
        <ul className="flex flex-col items-start gap-2">
            {isSuccess &&
                countries.map((c) => (
                    <li key={c.name}>
                        <Checkbox
                            style={{
                                color: "white",
                                textTransform: "capitalize",
                                fontSize: "16px",
                                gap: "10px",
                            }}
                            checked={currentCountries.includes(c.name)}
                            onChange={(e) => handleUpdateCountries(c.name, e.target.checked)}
                        >
                            {c.name}
                        </Checkbox>
                    </li>
                ))}
        </ul>
    );
}
