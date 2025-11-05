export default function getYouTubeId(url?: string) {
    if (!url) return null;
    const patterns = [
        /[?&]v=([-\w]{11})/,
        /youtu\.be\/([-\w]{11})/,
        /youtube\.com\/embed\/([-\w]{11})/,
    ];
    for (const re of patterns) {
        const m = url.match(re);
        if (m) return m[1];
    }
    return null;
}
