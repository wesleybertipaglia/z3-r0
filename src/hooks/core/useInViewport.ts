import { useState, useEffect } from "react";

export const useInViewport = (ref: React.RefObject<HTMLElement | null>, threshold: number = 0.5) => {
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInViewport(entry.isIntersecting);
        }, { threshold });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return isInViewport;
};