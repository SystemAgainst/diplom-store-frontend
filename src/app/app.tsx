import { Outlet } from "react-router-dom";
import styles from "./app.module.css";
import { useInitUser } from "@/features/user/model/use-init-user.ts";

export function App() {
    useInitUser();

    return (
        <div>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
}
