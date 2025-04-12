import { Outlet } from "react-router-dom";
import styles from "./app.module.css";

export function App() {
    return (
        <div>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
}
