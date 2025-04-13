import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { ReactNode } from "react";

export const ProductsHeader = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.header}>
            <Link to="/home" className={styles.backArrow}>
                ←
            </Link>
            <h2 className={styles.title}>{children}</h2>
        </div>
    );
};
