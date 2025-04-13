import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { useUserStore } from "@/features/user/model/user-store.ts";
import { authApi } from "@/features/auth/model/api.ts";

/*
* TODO: fix user?.login -> show data (not null)
* */

export const Header = () => {
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
  };

  const isActive = (path: string) => location.pathname === path;
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Anti-patterns</h1>
        <nav className={styles.headerNav}>
          <Link
            to="/#"
            className={`${styles.navLink} ${isActive("/tracks") ? styles.active : ""}`}
          >
            About
          </Link>
          <Link
              to="/#"
              className={`${styles.navLink} ${isActive("/tasks") ? styles.active : ""}`}
          >
            More
          </Link>
        </nav>
        <div className={styles.headerUser}>
          <span className={styles.username}>{user?.login}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button>
        </div>

      </div>
    </header>
  );
};
