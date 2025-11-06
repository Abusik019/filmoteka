import { kp } from "@app/lib/kinopoisk";
import MovieClient from "@app/ui/movies/movie-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);
    if (!numericId) return { title: "Фильм не найден" };

    const response = await kp.movie.getById(numericId).catch(() => null);
    const data = response?.data;

    const title = data?.name || data?.alternativeName || `Фильм ${id}`;

    return { title };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const numericId = Number(id);

    if (!numericId) notFound();

    const response = await kp.movie.getById(numericId).catch(() => null);
    const data = response?.data;

    if (!data) notFound();

    return <MovieClient movie={data} />;
}
