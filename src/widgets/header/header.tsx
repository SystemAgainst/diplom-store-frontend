import styles from "./header.module.css";
import { useUserStore } from "@/features/user/model/user-store.ts";
import { authApi } from "@/features/auth/model/api.ts";


export const Header = () => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>DiplomStore</h1>
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
