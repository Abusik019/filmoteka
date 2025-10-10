import { useGenres } from '@app/lib/kinopoisk/useGenres';
import React from 'react';

export default function GenreFilter() {
    const { data: genres, isLoading, error, isSuccess } = useGenres();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке жанров</p>;

    return (
        <ul>
            {isSuccess && genres.map((g) => (
                <li key={g.name}>{g.name}</li>
            ))}
        </ul>
    );
}