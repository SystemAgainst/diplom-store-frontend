import { ReactNode } from "react";
import styles from "./home.module.css";
import { Header } from "@/widgets";

export const HomePage = ({ children }: { children: ReactNode }) => {
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
