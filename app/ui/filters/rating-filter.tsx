'use client';

import { Rate } from 'antd';
import { toDefaultRatingFormat, toSearchRatingFormat } from '@app/lib/utils/format';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const RatingFilter: React.FC = () => {
    const searchParams = useSearchParams();
    const [rating, setRating] = useState<number>(0);

    const handleChangeRating = (value: number) => {
        if (value === 0) {
            sessionStorage.removeItem("rating");
        } else {
            const { min, max } = toSearchRatingFormat(value);
            sessionStorage.setItem("rating", `${min}-${max}`);
        }
        setRating(value);
    };

    useEffect(() => {
        const currentRating = sessionStorage.getItem("rating") ?? "";
        setRating(toDefaultRatingFormat(currentRating));
    }, [searchParams]);
    
    return (
        <div className='bg-[#66FCF0] px-2 py-1 box-border rounded-3xl w-fit'>
            <Rate onChange={handleChangeRating} value={rating}/>
        </div>
    )
};

export default RatingFilter;