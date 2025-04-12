import { create } from "zustand";
import { IUser } from "@/features/auth/model/api";


interface IUserState  {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
