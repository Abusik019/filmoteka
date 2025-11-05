'use client';

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || ""
    const [query, setQuery] = useState<string>(initialQuery);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        
        const params = new URLSearchParams(searchParams.toString());

        if(query){
            params.set("query", query);
        } else {
            params.delete("query");
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    return (
        <form onSubmit={handleSearch} className='w-full'>
            <div className='w-full border-b-2 border-[#66FCF0] p-3 box-border flex items-center justify-between'>
                <input 
                    type="text"
                    className='w-[calc(100%-60px)] border-none outline-none appearance-none'
                    placeholder='Звездные войны: Империя наносит обратный удар'
                    value={query}
                    onChange={handleInputChange} 
                />
                <button type="submit" className='cursor-pointer'>
                    <Image src="/icons/search.svg" width={24} height={24} alt='search' className='transition-all hover:drop-shadow-[0_0_6px_#66FCF0]'/>
                </button>
            </div>
        </form>
    )
}