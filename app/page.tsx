'use client';

import { useState } from "react";
import { Oswald } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const oswald = Oswald({
    subsets: ["latin"],
});

export default function Home() {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="max-h-fit bg-[#1f2833] px-20 py-10 box-border overflow-hidden min-h-screen text-white">
            <nav className="flex items-center justify-between">
                <Image
                    src="/images/logo.png"
                    width={90}
                    height={90}
                    alt="logo"
                />
                <h1 className={`${oswald.className} text-5xl`}>Filmoteka</h1>
                <Link href="/movies" className="bg-[#66FCF0] px-4 py-2 box-border text-black font-medium">Перейти к поиску</Link>
            </nav>
            <div className="max-w-[600px] flex flex-col items-center gap-20 my-0 mx-auto mt-30 relative">
                <h2
                    className="text-9xl text-[#66FCF0] font-medium z-10 cursor-pointer select-none transition-transform duration-500 animate-glow"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    ПРИВЕТ
                </h2>
                <div
                    className={`absolute top-[100px] left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out ${
                        hovered
                            ? "translate-y-[0px] opacity-100"
                            : "-translate-y-[200px] opacity-0"
                    }`}
                >
                    <Image
                        className="drop-shadow-[0_0_20px_#66FCF0]"
                        src="/images/spiderman.png"
                        width={336}
                        height={643}
                        alt="spiderman"
                    />
                </div>
                <p
                    className={`text-center text-xl transition-all duration-1000 ease-out ${
                        hovered ? "translate-y-[300px]" : "translate-y-0"
                    }`}
                >
                    У нас на сайте вы можете ознакомиться с большим
                    ассортиментом фильмов. Найдите фильм под свои критерии с
                    помощью наших фильтров, и наслаждайтесь просмотром. А если
                    вам приглянуться несколько фильмов, то вы можете добавить их
                    в избранное.
                </p>
            </div>
        </div>
    );
}
