import React from "react";

export const useDebounce = <T extends (...val: any) => void>(func: T, delay: number) => {
    const timeout = React.useRef<NodeJS.Timeout | null>(null);
    return function (...args) {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            timeout.current = null;
            func(...args);
        }, delay);
    } as T;
};
