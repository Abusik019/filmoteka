"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const { RangePicker } = DatePicker;

export default function YearRangeFilter() {
    const searchParams = useSearchParams();

    const getCurrentYearRange = () => {
        const currentYear = sessionStorage.getItem("year");
        if (!currentYear) return { startYear: null, endYear: null };
        const [start, end] = currentYear.split("-").map(Number);
        return { startYear: start, endYear: end };
    };

    const [yearRange, setYearRange] = useState<{ startYear: number | null; endYear: number | null }>(getCurrentYearRange);

    const handleSetDate = (value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
        if (!value || !value[0] || !value[1]) {
            sessionStorage.removeItem("year");
            setYearRange({ startYear: null, endYear: null });
            return;
        }

        const [start, end] = value;
        const startYear = start.year();
        const endYear = end.year();

        sessionStorage.setItem("year", `${startYear}-${endYear}`);
        setYearRange({ startYear, endYear });
    };

    useEffect(() => {
        setYearRange(getCurrentYearRange());
    }, [searchParams]);

    return (
        <div>
            <RangePicker
                picker="year"
                onChange={handleSetDate}
                value={
                    yearRange.startYear && yearRange.endYear
                        ? [dayjs().year(yearRange.startYear), dayjs().year(yearRange.endYear)]
                        : null
                }
            />
        </div>
    );
}
