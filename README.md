# Filmoteka

Filmoteka is a web application built with Next.js that allows users to search and filter movies. It leverages the Kinopoisk API to fetch movie data, including details like genres, countries, ratings, and trailers.

## Features and Functionality

*   **Movie Search:** Users can search for movies by title using the search bar.
*   **Filtering:** Movies can be filtered based on genre, country, year, and IMDb rating.  Filters are persisted using `sessionStorage` to keep selections active during navigation.
*   **Pagination:**  The movie grid implements pagination to handle large result sets.
*   **Movie Details:**  Clicking on a movie card navigates to a dedicated page with detailed information, including the trailer (if available), description, genres, and ratings from IMDb and Kinopoisk.
*   **Responsive Design:** The application is designed to be responsive and work well on different screen sizes.
*   **Error Handling:**  Graceful error handling and "Not Found" pages are implemented for movie details.
*   **Client-Side Data Fetching:** Uses `react-query` for efficient data fetching and caching.

## Technology Stack

*   **Next.js:**  A React framework for building performant web applications.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Kinopoisk API:**  Used to fetch movie data (`@openmoviedb/kinopoiskdev_client`).
*   **react-query:**  For data fetching, caching, and state management.
*   **Ant Design (Antd):**  A UI library for React (used for `DatePicker`, `Checkbox`, and `Rate` components). `@ant-design/v5-patch-for-react-19` is used for compatibility.
*   **framer-motion:** For animations.
*   **react-lite-youtube-embed:** For embedding YouTube trailers.
*   **dayjs:** For date manipulation with `DatePicker`.

## Prerequisites

Before running the application, ensure you have the following installed:

*   **Node.js:** (version 18 or higher)
*   **npm** or **yarn:** Package managers for JavaScript.

You will also need a Kinopoisk API key. Obtain one from [https://openmoviedb.com/](https://openmoviedb.com/) and set it as an environment variable.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Abusik019/filmoteka.git
    cd filmoteka
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Set environment variables:**

    Create a `.env.local` file in the root directory and add the following:

    ```
    API_KEY=YOUR_KINOPOISK_API_KEY
    API_BASE=https://api.kinopoisk.dev/
    ```

    Replace `YOUR_KINOPOISK_API_KEY` with your actual Kinopoisk API key.

4.  **Run the development server:**

    ```bash
    npm run dev  # or yarn dev
    ```

    This will start the application at `http://localhost:3000`.

## Usage Guide

1.  **Home Page:**

    *   The home page (`/`) displays a welcome message and a link to the movie search page.
2.  **Movie Search Page:**

    *   Navigate to `/movies` to access the movie search page.
    *   **Search:** Use the search input to find movies by title.  The search query is reflected in the URL as `?query=your+search+term`.
        *   `app/ui/search-input.tsx` handles the search input and updates the URL.
    *   **Filters:** Use the filters panel on the left side to refine your search.
        *   **Rating:** Filter movies by IMDb rating using the `RatingFilter` component in `app/ui/filters/rating-filter.tsx`.
        *   **Genres:** Filter movies by genre using the `GenreFilter` component in `app/ui/filters/genre-filter.tsx`.  The selected genres are stored in `sessionStorage` as `genre` and are appended to the URL as `?genre=genre1&genre=genre2`.
        *   **Countries:** Filter movies by country using the `CountryFilter` component in `app/ui/filters/country-filter.tsx`. The selected countries are stored in `sessionStorage` as `country` and are appended to the URL as `?country=country1&country=country2`.
        *   **Year:** Filter movies by year using the `YearRangeFilter` component in `app/ui/filters/year-range-filter.tsx`. The selected year range is stored in `sessionStorage` as `year` and appended to the URL as `?year=startYear-endYear`.
        *   `app/ui/filters/filters-panel.tsx` manages the filter components and their open/closed state.
    *   **Pagination:** Use the pagination controls at the bottom to navigate through the search results. The current page is reflected in the URL as `?page=2`. The `PaginationBar` component in `app/ui/pagination/pagination-bar.tsx` handles page changes.
    *   **Movie Grid:** The movie grid (`app/ui/movies/movie-grid.tsx`) displays the search results as a grid of movie cards.
        *   `MovieCard` component in `app/ui/movies/movie-card.tsx` displays individual movie information.
        *   Skeleton loaders (`app/ui/skeletons/movie-card-skeleton.tsx`) are used during the loading state.
    *   **Reset Filters:**  The "Сброс фильтров" button in `app/ui/filters/reset-filters-button.tsx` clears all filters and navigates back to the default search state. It removes the saved filter information in the `sessionStorage`.

3.  **Movie Details Page:**

    *   Click on a movie card to view its details page at `/movies/[id]`.  For example, `/movies/615` will display the details for the movie with ID 615.
    *   `app/movies/[id]/page.tsx` fetches the movie data using the Kinopoisk API and renders the `MovieClient` component.
    *   `MovieClient` component in `app/ui/movies/movie-client.tsx` displays the movie details, including:
        *   Title and alternative title
        *   Year and country
        *   Movie length
        *   Poster image
        *   YouTube trailer (if available)
        *   IMDb and Kinopoisk ratings
        *   Genres
        *   Description
    *   A "Назад" button allows navigation back to the previous page.
    *   `app/movies/[id]/error.tsx`, `app/movies/[id]/loading.tsx`, and `app/movies/[id]/not-found.tsx` provide error handling, loading, and "not found" states for the movie details page.

## API Documentation

The application exposes the following API endpoints:

*   **`/api/movies`:**  Fetches movies based on filters passed in the query parameters.
    *   **Parameters:**
        *   `genre`:  Movie genre(s). Multiple genres can be specified.  Use `+genreName` to include or `!genreName` to exclude.
        *   `country`: Movie country(ies). Multiple countries can be specified. Use `+countryName` to include or `!countryName` to exclude.
        *   `year`:   Movie year(s).  Multiple years can be specified.
        *   `rating.imdb`: IMDb rating.
        *   `page`:   Page number for pagination. Defaults to 1.
        *   `limit`:  Number of movies per page. Defaults to 12.
    *   **Example:** `/api/movies?genre=+драма&country=+США&year=2020&page=2&limit=24`
    *   `app/api/movies/route.ts` handles this endpoint.
*   **`/api/movies/search`:**  Searches for movies by a query string.
    *   **Parameters:**
        *   `query`: The search query string. Required.
        *   `page`:  Page number for pagination. Defaults to 1.
        *   `limit`: Number of movies per page. Defaults to 12.
    *   **Example:** `/api/movies/search?query=Star%20Wars&page=1`
    *   `app/api/movies/search/route.ts` handles this endpoint.
*   **`/api/genres`:**  Fetches a list of available movie genres.
    *   `app/api/genres/route.ts` handles this endpoint and uses `app/lib/kinopoisk/endpoints.ts` to get the URL.
*   **`/api/countries`:** Fetches a list of available movie countries.
    *   `app/api/countries/route.ts` handles this endpoint and uses `app/lib/kinopoisk/endpoints.ts` to get the URL.

All API requests are made using the `kinopoiskFetcher` function in `app/lib/kinopoisk/fetcher.ts`, which adds the required `X-API-KEY` header and handles error responses.

## Contributing Guidelines

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Submit a pull request to the `main` branch.

## License Information

No license specified. All rights reserved.

## Contact/Support Information

For questions or support, please contact: [https://github.com/Abusik019](https://github.com/Abusik019)