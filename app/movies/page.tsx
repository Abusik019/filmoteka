import React from 'react'
import SearchInput from '@app/ui/search-input'
import MovieGrid from '@app/ui/movies/movie-grid'
import Image from 'next/image'
import Link from 'next/link'
import FiltersPanel from '@app/ui/filters/filters-panel'

export default function Page() {
    return (
        <div className='max-h-fit bg-[#1f2833] px-20 py-10 box-border min-h-screen flex items-start gap-20'>
            <aside className='w-70 flex flex-col items-start gap-20'>
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        width={90}
                        height={90}
                        alt="logo"
                    />
                </Link>
                <FiltersPanel />
            </aside>
            <main className='w-[calc(100%-360px)] flex flex-col items-center gap-10'>
                <SearchInput />
                <MovieGrid />
            </main>
        </div>
    )
}
