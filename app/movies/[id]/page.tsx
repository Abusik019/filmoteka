import { kp } from "@app/lib/kinopoisk";
import MovieClient from "@app/ui/movies/movie-client";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numericId = Number(id);

    if (!numericId) notFound();

    const response = await kp.movie.getById(numericId).catch(() => null);
    const data = response?.data;

    if (!data) notFound();

    return <MovieClient movie={data} />;
}
