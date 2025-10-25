import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const { RangePicker } = DatePicker;

export default function YearRangeFilter() {
    const currentYear = localStorage.getItem("year");
    const [start, end] = currentYear ? currentYear.split("-").map(Number) : [null, null];
    const [yearRange, setYearRange] = useState<{ startYear: number | null, endYear: number | null}>({ startYear: start, endYear: end });

    const handleSetDate = (value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
        if (!value || !value[0] || !value[1]) {
            localStorage.removeItem("year");
            setYearRange({ startYear: null, endYear: null });
            return;
        }

        const [start, end] = value;
        const startYear = start.year();
        const endYear = end.year();

        localStorage.setItem("year", `${startYear}-${endYear}`);
        setYearRange({ startYear, endYear });
    };

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
