import { IUser } from "@/features/auth/model/api";

const USER_KEY = "user";
const USER_ID_KEY = "userId";

export const authStorage = {
    setUser(user: IUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(USER_ID_KEY, user.id); // отдельное поле для быстрого доступа
    },

    setUserId(userId: string) {
        localStorage.setItem(USER_ID_KEY, userId);
    },

    // Получает id
    getUserId(): string | null {
        return localStorage.getItem(USER_ID_KEY);
    },

    getUser(): IUser | null {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;

        try {
            return JSON.parse(raw) as IUser;
        } catch {
            return null;
        }
    },

    clear() {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(USER_ID_KEY);
    },
};