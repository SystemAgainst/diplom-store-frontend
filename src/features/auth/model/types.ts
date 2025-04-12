export interface ILoginPayload {
    login: string;
    password: string;
}

export interface IRegisterPayload {
    login: string;
    password: string;
    loginTelegram?: string;
    chatId?: string;
    role: Role;
}

export const ROLES = {
    ADMIN: "ADMIN",
    SUPPLIER: "SUPPLIER",
    SOLE_TRADER: "SOLE_TRADER",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];