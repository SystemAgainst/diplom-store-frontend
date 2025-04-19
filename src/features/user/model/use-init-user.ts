import { useEffect } from "react";
import { useUserStore } from "./user-store";
import { authApi } from "@/features/auth/model/api";

export const useInitUser = () => {
    const setUser = useUserStore((s) => s.setUser);

    useEffect(() => {
        authApi.fetchUser()
            .then(setUser)
            .catch((e) => {
                console.warn("User init failed:", e.message);
                setUser(null);
            });
        }, []);
};
