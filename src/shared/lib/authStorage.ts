export const authStorage = {
    setUser: ({ id, login }: { id: string; login: string }) => {
        localStorage.setItem("userId", id);
        localStorage.setItem("login", login);
    },
    getUserId: (): string | null => {
        return localStorage.getItem("userId");
    },
    clear: () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("login");
    },
};
