import { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";
import { Role, ROLES } from "@/features/auth/model/types";
import { authApi } from "../model/api";
import {useUserStore} from "@/features/user/model/user-store.ts";


interface RegisterFormData {
  login: string;
  loginTelegram: string;
  password: string;
  chatId: string;
  role: Role;
}

export const RegisterForm = () => {
  const setUser = useUserStore((s) => s.setUser);

  const [formData, setFormData] = useState<RegisterFormData>({
    loginTelegram: "",
    password: "",
    login: "",
    chatId: "",
    role: ROLES.SUPPLIER,
  });
  const [error, setError] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authApi.register(formData);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <label htmlFor="login" className={styles.label}>
            Username
          </label>
          <input
              type="text"
              id="login"
              value={formData.login}
              onChange={(e) =>
                  setFormData({...formData, login: e.target.value})
              }
              className={styles.inputGroup}
              required
          />
        </div>

        <div>
          <label htmlFor="loginTelegram" className={styles.label}>
            Telegram Login
          </label>
          <input
              type="text"
              id="loginTelegram"
              value={formData.loginTelegram}
              onChange={(e) =>
                  setFormData({...formData, loginTelegram: e.target.value})
              }
              className={styles.inputGroup}
              required
          />
        </div>

        <div>
          <label htmlFor="chatId" className={styles.label}>
            Chat ID
          </label>
          <input
              type="text"
              id="chatId"
              value={formData.chatId}
              onChange={(e) =>
                  setFormData({...formData, chatId: e.target.value})
              }
              className={styles.inputGroup}
              required
          />
        </div>

        <div>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                  setFormData({...formData, password: e.target.value})
              }
              className={styles.inputGroup}
              required
          />
        </div>

        <div>
          <label htmlFor="role" className={styles.label}>
            Роль
          </label>
          <select
              id="role"
              value={formData.role || ""}
              onChange={(e) =>
                  setFormData({...formData, role: e.target.value as Role})
              }
              className={styles.inputGroup}
              required
          >
            <option value="" disabled>
              -- Выберите роль --
            </option>
            {Object.entries(ROLES).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
            ))}
          </select>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>

        <span>У вас уже есть аккаунт?{" "}
          <Link to={routes.login}>Войдите</Link> в систему
        </span>
      </form>
  );
};