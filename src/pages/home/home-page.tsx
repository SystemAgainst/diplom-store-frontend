import styles from "./home.module.css";
import { Header } from "@/widgets";
import { ROLES } from "@/features/auth/model/types";
import { RequireRole } from "@/features/auth/ui/require-role";
import { Link, Outlet } from "react-router-dom";

export const HomePage = () => {
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
                            <Link key={item.path} to={item.path} className={styles.menuLink}>
                                {item.label}
                            </Link>
                        ))}
                        <Link to="/login" className={styles.menuLink}>Выйти</Link>
                    </nav>
                </aside>

                <div className={styles.main}>
                    <Header />
                    <main className={styles.content}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </RequireRole>
    );
};
