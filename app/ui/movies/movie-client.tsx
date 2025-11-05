'use client';

import Image from "next/image";
import Link from "next/link";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import NoTrailerPlaceholder from "@app/ui/skeletons/trailer-placeholder";
import getYouTubeId from "@app/lib/utils/get-yt-id";

export default function MovieClient({ movie }: { movie: MovieDtoV13 }) {
    const trailerUrl = movie?.videos?.trailers?.[0]?.url ?? "";
    const posterUrl = movie?.poster?.url ?? "/images/no-poster.jpg";
    const countryName = movie?.countries?.[0]?.name ?? "Неизвестно";
    const ytId = getYouTubeId(trailerUrl);

    return (
        <div className="min-h-screen bg-[#1f2833] px-20 py-10">
            <Link href="#" onClick={() => window.history.back()} className="flex flex-row items-center gap-1.5 cursor-pointer">
                <Image src="/icons/back.arrow.svg" width={20} height={20} alt="back" />
                <span className="text-[#66fcf0]">Назад</span>
            </Link>
            <div className="mt-8 flex justify-between">
                <div>
                    <h1 className="text-5xl font-semibold">{movie.name},</h1>
                    {movie.alternativeName && (
                        <span className="text-gray-400 mt-2 block">или {movie.alternativeName}</span>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl">
                        {movie.year}, {countryName}
                    </h2>
                    <span className="text-gray-400 mt-2 block float-end">{movie.movieLength} мин.</span>
                </div>
            </div>
            <div className="flex items-center justify-start mt-8 gap-10">
                <Image
                    src={posterUrl}
                    width={278}
                    height={414}
                    alt={movie.name || "poster"}
                    unoptimized
                    className="rounded-lg object-cover"
                />
                {ytId ? (
                    <div className="w-[737px] h-[414px]">
                        <LiteYouTubeEmbed 
                            id={ytId} 
                            title={movie.name || "trailer"} 
                            noCookie 
                            poster="hqdefault" 
                            style={{ borderRadius: "8px" }}
                        />
                    </div>
                ) : (
                    <NoTrailerPlaceholder />
                )}
                <div className="flex flex-col items-center gap-10">
                    <div className="relative">
                        <Image src="/images/imdb.jpg" width={150} height={150} alt="imdb logo"/>
                        <div className="absolute left-0 bottom-0 bg-white text-black w-10 h-10 flex items-center justify-center font-bold text-lg">{movie.rating?.imdb}</div>
                    </div>
                    <div className="relative">
                        <Image src="/images/kinopoisk.webp" width={150} height={150} alt="imdb logo"/>
                        <div className="absolute left-0 bottom-0 bg-white text-black w-10 h-10 flex items-center justify-center font-bold text-lg">{movie.rating?.kp?.toFixed(1)}</div>
                    </div>
                </div>
            </div>
            <ul className="mt-8 flex items-center justify-start gap-2.5">
                {movie.genres?.map((g, index) => (
                    <li key={index} className="border-[#66fcf0] border rounded-2xl text-[#fff] font-medium px-6 py-1 box-border">{g.name}</li>
                ))}
            </ul>
            <p className="mt-8 text-lg w-4/5">{movie.description}</p>
        </div>
    );
}
