import React from "react";

export const useMediaQuery = (query: string): boolean => {
    const [media, setMedia] = React.useState<boolean>(window.matchMedia(query).matches);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMedia(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => {
            mediaQuery.removeEventListener("change", handler);
        };
    }, []);

    return media;
};
