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

export type Role = keyof typeof ROLES;

export const ROLE_LABELS: Record<Role, string> = {
    ADMIN: "админ",
    SUPPLIER: "поставщик",
    SOLE_TRADER: "продавец",
};

export interface IUserProduct {
    id: number;
    title: string;
    quantity: number;
    price: number;          // Себестоимость
    sellingPrice: number;   // Цена продажи
}
