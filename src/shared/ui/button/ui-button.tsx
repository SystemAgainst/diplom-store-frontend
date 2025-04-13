import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean;
}

export const UiButton = ({ children, loading, disabled, className, ...rest }: Props) => {
    return (
        <button
            className={clsx(styles.button, className)}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? "Загрузка..." : children}
        </button>
    );
};
