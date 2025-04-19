import { useEffect, useState } from "react";
import { Role } from "@/features/auth/model/types";
import { authStorage } from "@/features/auth/model/authStorage";

export const useUserRole = (): Role | null => {
    const [role, setRole] = useState<Role | null>(null);

    useEffect(() => {
        const user = authStorage.getUser();
        setRole(user?.role ?? null);
    }, []);

    return role;
};
