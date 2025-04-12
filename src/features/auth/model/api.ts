import {
    ILoginPayload,
    IRegisterPayload,
    Role,
} from "./types";

export interface IUser {
    id: string;
    login: string;
    loginTelegram?: string;
    chatId?: string;
    role: Role;
}

const API_URL = "http://localhost:8080";

export const authApi = {
    async login(payload: ILoginPayload): Promise<IUser> {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error("Неверный логин или пароль");
        }

        const user: IUser = await res.json();
        localStorage.setItem("userId", user.id);
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

        const newUser: IUser = await res.json();
        localStorage.setItem("userId", newUser.id);
        return newUser;
    },

    async fetchUser(): Promise<IUser> {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("Не авторизован");

        const res = await fetch(`${API_URL}/user/${userId}`);
        if (!res.ok) throw new Error("Пользователь не найден");

        return res.json();
    },

    logout() {
        localStorage.removeItem("userId");
        window.location.href = "/login";
    },
};
