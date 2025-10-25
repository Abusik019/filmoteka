'use client';

import { Rate } from 'antd';
import { toDefaultRatingFormat, toSearchRatingFormat } from '@app/lib/utils/format';
import { useEffect, useState } from 'react';

const RatingFilter: React.FC = () => {
    const currentRating = localStorage.getItem("rating") ?? "";
    const [rating, setRating] = useState<number>(toDefaultRatingFormat(currentRating));


    const handleChangeRating = (value: number) => {
        if (value === 0) {
            localStorage.removeItem("rating");
        } else {
            const { min, max } = toSearchRatingFormat(value);
            localStorage.setItem("rating", `${min}-${max}`);
        }
        setRating(value);
    };

    useEffect(() => {
        setRating(toDefaultRatingFormat(currentRating));
    }, []);
    
    return (
        <div className='bg-[#66FCF0] px-2 py-1 box-border rounded-3xl w-fit'>
            <Rate onChange={handleChangeRating} value={rating}/>
        </div>
    )
};

export default RatingFilter;