const BASE_URL = process.env.API_BASE!;
const API_KEY = process.env.API_KEY!;

export async function tmdbFetcher<T>(
    path: string,
    params?: Record<string, string | number>
): Promise<T> {
    const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
    const normalizedPath = path.replace(/^\//, "");
    const url = new URL(normalizedPath, base);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const res = await fetch(url.toString(), {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        console.error(`Fetch Error [${res.status}]: ${await res.text()}`);
        throw new Error(`API request failed with status ${res.status}`);
    }

    return res.json();
}
