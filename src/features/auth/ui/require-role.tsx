import { ReactNode } from "react";
import { useUserStore } from "@/features/user/model/user-store";
import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";
import {  Role } from "@/features/auth/model/types";
import styles from "@/features/auth/ui/style.module.css";

export const RequireRole = ({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) => {
  const user = useUserStore((s) => s.user);

  if (user?.role !== role) {
    return (
        <div className={styles.requireRoleContainer}>
          У вас нет доступа к этой странице.
          <span>
          Вернитесь на{" "}
            <Link to={routes.login}>страницу входа</Link> в систему
        </span>
        </div>
    );
  }

  return <>{children}</>;
};
