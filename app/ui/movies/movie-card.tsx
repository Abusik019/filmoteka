import { MovieDtoV1 } from "@openmoviedb/kinopoiskdev_client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
    movie: MovieDtoV1;
    hasSearchQuery: boolean;
}

export default function MovieCard({ movie, hasSearchQuery }: MovieCardProps) {
    const posterSrc = hasSearchQuery
        ? movie.poster || "/images/no-poster.jpg"
        : (typeof movie.poster === "object"
              ? movie.poster?.url
              : movie.poster) || "/images/no-poster.jpg";

    const getRatingText = () => {
        if (!hasSearchQuery) {
            const rating = movie.rating;
            if (typeof rating === "object" && rating !== null) {
                return `IMDb: ${rating?.imdb ?? "—"}`;
            }
            return "IMDb: —";
        } else {
            return `Кинопоиск: ${movie.rating ?? "—"}`;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900 p-3 rounded-xl border border-gray-700 hover:scale-[1.02] transition-transform"
        >
            <Link href={`/movies/${movie.id}`} className="w-full h-full">
                <Image
                    src={String(posterSrc)}
                    alt={movie.name || "poster"}
                    className="rounded-lg w-full h-64 object-cover"
                />
                <h3 className="mt-3 font-medium text-white">
                    {movie.name || "Без названия"}
                </h3>
                <p className="text-sm text-gray-400">
                    {movie.year
                        ? `${movie.year} • ${getRatingText()}`
                        : getRatingText()}
                </p>
            </Link>
        </motion.div>
    );
}
