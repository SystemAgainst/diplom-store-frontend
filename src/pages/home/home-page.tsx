import { ReactNode } from "react";
import styles from "./home.module.css";
import { Header } from "@/widgets";
import { useUserStore } from "@/features/user/model/user-store";
import { ROLES } from "@/features/auth/model/types";
import { RequireRole } from "@/features/auth/ui/require-role";

export const HomePage = ({ children }: { children: ReactNode }) => {
    const user = useUserStore((s) => s.user);

    const menuItems = [
        { label: "📦 Мои товары", path: "/products/my" },
        { label: "📑 Заказы", path: "/orders" },
        { label: "🧍‍♂️ Профиль", path: "/profile" },
        { label: "❓ Поддержка", path: "#" },
    ];

    return (
        <RequireRole role={ROLES.SUPPLIER}>
            <div className={styles.root}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarTitle}>🌐 Меню</div>
                    <nav className={styles.sidebarLinks}>
                        {menuItems.map((item) => (
                            <a key={item.path} href={item.path}>
                                {item.label}
                            </a>
                        ))}
                        <a onClick={() => window.location.href = "/login"}>🚪 Выйти</a>
                    </nav>
                </aside>

                <div className={styles.main}>
                    <Header />
                    <main className={styles.content}>{children}</main>
                </div>
            </div>
        </RequireRole>
    );
};
