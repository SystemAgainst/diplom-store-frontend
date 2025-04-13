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
    ADMIN: "админ",
    SUPPLIER: "поставщик",
    SOLE_TRADER: "продавец",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export interface IUserProduct {
    id: number;
    title: string;
    quantity: number;
    price: number;          // Себестоимость
    sellingPrice: number;   // Цена продажи
}
