'use client';

import { Rate } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import { toDefaultRatingFormat, toSearchRatingFormat } from '@app/lib/utils/format';
import { useEffect, useState } from 'react';

const RatingFilter: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const currentRating = params.get("rating") ?? "";
    const [rating, setRating] = useState<number>(toDefaultRatingFormat(currentRating));

    useEffect(() => {
        setRating(toDefaultRatingFormat(currentRating));
    }, [currentRating]);

    const handleChangeRating = (value: number) => {
        if (value === 0) {
            params.delete("rating");
        } else {
            const { min, max } = toSearchRatingFormat(value);
            params.set("rating", `${min}-${max}`);
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }       
    
    return (
        <div className='bg-[#66FCF0] px-2 py-1 box-border rounded-3xl w-fit'>
            <Rate onChange={handleChangeRating} value={rating}/>
        </div>
    )
};

export default RatingFilter;