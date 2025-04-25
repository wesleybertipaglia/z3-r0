import { useState, useEffect, useCallback } from "react";

export function useNotification() {
    const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);
    const [isPageVisible, setIsPageVisible] = useState<boolean>(!document.hidden);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPageVisible(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const requestPermission = useCallback(() => {
        if (!("Notification" in window)) return;

        Notification.requestPermission().then((result) => {
            setPermission(result);
        });
    }, []);

    useEffect(() => {
        // If permission is "default" ask the user for permission.
        if (permission === "default") {
            requestPermission();
        }
    }, [permission, requestPermission]);


    const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
        console.log("isPageVisible", isPageVisible);
        console.log("permission", permission);
        if (permission === "granted" && !isPageVisible) {
            new Notification(title, options);
        }
    }, [permission, isPageVisible]);

    return { permission, requestPermission, sendNotification };
}
