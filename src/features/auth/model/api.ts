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

        console.log(':: ', res)
        const id = await res.text();

        const user: IUser = {
            id,
            login: payload.login,
            loginTelegram: "",
            chatId: "",
            role: ROLES.SUPPLIER, // временно, пока сервер не отдает роль
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

        const newUser: IUser = {
            id,
            login: payload.login,
            loginTelegram: payload.loginTelegram,
            chatId: payload.chatId,
            role: payload.role,
        };

        authStorage.setUserId(id);
        return newUser;
    },

    async fetchUser(): Promise<IUser> {
        const userId = authStorage.getUserId();
        if (!userId) throw new Error("Не авторизован");

        const res = await fetch(`${API_URL}/user/${userId}`);
        if (!res.ok) throw new Error("Пользователь не найден");

        console.log('fetschUser - res: ', res);
        return res.json(); // здесь возвращается полноценный JSON с login, role и т.д.
    },

    logout() {
        authStorage.clear();
        window.location.href = "/login";
    },
};
