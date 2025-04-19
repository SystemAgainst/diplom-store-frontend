import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
    children: ReactNode;
    className?: string;
}

export const ProductsHeader = ({ children, className }: Props) => {
    const navigate = useNavigate();

    return (
        <div className={clsx(styles.header, className)}>
            <button type="button" onClick={() => navigate(-1)} className={styles.backArrow}>
                ←
            </button>
            <h2 className={styles.title}>{children}</h2>
        </div>
    );
};
