export interface IGenre {
    name: string;
    slug: string;
}

export type IGenreListResponse = IGenre[];

export interface ICountry {
    name: string;
    slug: string;
}

export type ICountryListResponse = ICountry[];

export interface IMovieFilters {
    query?: string;  
    genres?: string[];
    countries?: string[];
    year?: string;
    rating?: string;
}

