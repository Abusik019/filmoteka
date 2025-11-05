const NoTrailerPlaceholder = () => {
    return (
        <div className="w-[737px] h-[414px] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30" />

            <FilmPerforations />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <CameraIcon />
                <MainText />
                <SecondaryText />
                <LoadingDots />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-20 animate-pulse" />
        </div>
    );
};

const FilmPerforations = () => {
    const perforations = Array.from({ length: 8 }, (_, i) => i);

    return (
        <>
            <div className="absolute top-2 left-0 w-full flex justify-between px-4">
                {perforations.map((i) => (
                    <div
                        key={`top-${i}`}
                        className="w-4 h-4 bg-gray-800 rounded-full"
                    />
                ))}
            </div>
            <div className="absolute bottom-2 left-0 w-full flex justify-between px-4">
                {perforations.map((i) => (
                    <div
                        key={`bottom-${i}`}
                        className="w-4 h-4 bg-gray-800 rounded-full"
                    />
                ))}
            </div>
        </>
    );
};

const CameraIcon = () => (
    <div className="mb-6 relative">
        <div className="w-24 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="w-16 h-12 bg-gray-800 rounded-md flex items-center justify-center">
                <div className="w-10 h-8 bg-gray-900 rounded-sm" />
            </div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-red-300 rounded-full animate-pulse" />
        </div>
    </div>
);

const MainText = () => (
    <h1 className="text-5xl font-bold text-white mb-4 tracking-wider text-center">
        НЕТ ТРЕЙЛЕРА
    </h1>
);

const SecondaryText = () => (
    <p className="text-gray-400 text-lg text-center max-w-md mb-6">
        Трейлер для этого контента пока недоступен. <br />
        Пожалуйста, проверьте позже.
    </p>
);

const LoadingDots = () => (
    <div className="flex space-x-4">
        {[0, 0.2, 0.4].map((delay, index) => (
            <div
                key={index}
                className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"
                style={{ animationDelay: `${delay}s` }}
            />
        ))}
    </div>
);

export default NoTrailerPlaceholder;
