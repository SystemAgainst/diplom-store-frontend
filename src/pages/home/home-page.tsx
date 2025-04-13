import { ReactNode } from "react";
import styles from "./home.module.css";
import { Header } from "@/widgets";
import { useUserStore } from "@/features/user/model/user-store.ts";
import { ROLES } from "@/features/auth/model/types.ts";
import {Link} from "react-router-dom";
import {routes} from "@/shared/config/routes.ts";

export const HomePage = ({ children }: { children: ReactNode }) => {
    const user = useUserStore((s) => s.user);

    if (user?.role !== ROLES.SUPPLIER) {
        return (
            <div className={styles.formContainer}>У вас нет доступа к этой странице.
                <span>Вернитесь на {" "}
                    <Link to={routes.login}>страницу</Link> входа в систему
                </span>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>🌐 Меню</div>
                <nav className={styles.sidebarLinks}>
                    <a href="#">Мои заказы</a>
                    <a href="#">Финансы</a>
                    <a href="#">Настройки</a>
                    <a href="#">Поддержка</a>
                    <a href="#">Выход</a>
                </nav>
            </aside>

            <div className={styles.main}>
                <Header />

                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
};
