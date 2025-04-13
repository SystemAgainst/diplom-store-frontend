const USER_ID_KEY = "userId";

export const authStorage = {
    getUserId(): string | null {
        return localStorage.getItem(USER_ID_KEY);
    },

    setUserId(userId: string) {
        localStorage.setItem(USER_ID_KEY, userId);
    },

    clear() {
        localStorage.removeItem(USER_ID_KEY);
    },
};
