import { DatePicker } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function YearRangeFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const currentYear = params.get("year");
    const [startYear, endYear] = currentYear ? currentYear.split("-").map(Number) : [null, null];

    const handleSetDate = (value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
        if (!value || !value[0] || !value[1]) {
            params.delete("year");
        } else {
            const [start, end] = value;
            params.set("year", `${start.year()}-${end.year()}`);
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div>
            <RangePicker
                picker="year"
                onChange={handleSetDate}
                value={
                    startYear && endYear
                        ? [dayjs().year(startYear), dayjs().year(endYear)]
                        : null
                }
            />
        </div>
    );
}
