import {
    ILoginPayload,
    IRegisterPayload,
    Role,
    ROLES,
} from "./types";
import { authStorage } from "@/features/auth/model/authStorage";
import { API_URL } from "@/features/auth/model/constants";

export interface IUser {
    id: string;
    login: string;
    loginTelegram?: string;
    chatId?: string;
    role: Role;
}

export const authApi = {
    async login(payload: ILoginPayload): Promise<IUser> {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const message = await res.text();
            throw new Error(message || "Неверный логин или пароль");
        }

        const id = await res.text();

        const user: IUser = {
            id,
            login: payload.login,
            loginTelegram: "",
            chatId: "",
            role: ROLES.SUPPLIER, // временно
        };

        authStorage.setUserId(id);

        return user;
    },

    async register(payload: IRegisterPayload): Promise<IUser> {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const message = await res.text();
            throw new Error(message || "Ошибка регистрации");
        }

        const id = await res.text();

        const user: IUser = {
            id,
            login: payload.login,
            loginTelegram: payload.loginTelegram,
            chatId: payload.chatId,
            role: payload.role,
        };

        authStorage.setUserId(id);

        return user;
    },

    async fetchUser(): Promise<IUser> {
        const userId = authStorage.getUserId();
        const login = localStorage.getItem("login");

        if (!userId || !login) {
            throw new Error("Не авторизован");
        }

        const authHeader = "Basic " + btoa(`${login}`);

        const res = await fetch(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: authHeader,
            },
        });

        if (!res.ok) {
            throw new Error("Пользователь не найден");
        }

        const user: IUser = await res.json();
        return user;
    },

    logout() {
        authStorage.clear();
        window.location.href = "/login";
    },
};
