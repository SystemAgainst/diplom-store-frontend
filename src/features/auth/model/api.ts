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

// Утилита: получение заголовка авторизации (Basic)
export const getAuthHeader = () => {
    const login = localStorage.getItem("login");
    const password = localStorage.getItem("password");
    if (!login || !password) throw new Error("Не авторизован");
    return "Basic " + btoa(`${login}:${password}`);
};

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
            loginTelegram: "", // пока неизвестно
            chatId: "",
            role: ROLES.SUPPLIER, // временно, уточняется при fetchUser()
        };

        // Сохраняем и user, и auth-данные
        authStorage.setUser(user);
        localStorage.setItem("login", payload.login);
        localStorage.setItem("password", payload.password);

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

        authStorage.setUser(user);
        localStorage.setItem("login", payload.login);
        localStorage.setItem("password", payload.password);

        return user;
    },

    async fetchUser(): Promise<IUser> {
        const userId = authStorage.getUserId();
        if (!userId) throw new Error("Не авторизован");

        const res = await fetch(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: getAuthHeader(),
            },
        });

        if (!res.ok) {
            throw new Error("Пользователь не найден");
        }

        const user: IUser = await res.json();
        authStorage.setUser(user);
        return user;
    },

    logout() {
        authStorage.clear();
        localStorage.removeItem("login");
        localStorage.removeItem("password");
        window.location.href = "/login";
    },
};
