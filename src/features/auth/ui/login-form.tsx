import { useState, FormEvent } from "react";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/shared/config/routes.ts";
import { authApi } from "../model/api";
import { useUserStore } from "@/features/user/model/user-store";
import { UiButton } from "@/shared/ui";


interface LoginFormData {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const setUser = useUserStore((s) => s.setUser);

  const [formData, setFormData] = useState<LoginFormData>({
    login: "supplier_one",
    password: "Password123!",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await authApi.login(formData);
      setUser(user);
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label htmlFor="login" className={styles.label}>
          Login
        </label>
        <input
          type="text"
          id="login"
          autoComplete="current-password"
          value={formData.login}
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
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
            setFormData({ ...formData, password: e.target.value })
          }
          className={styles.inputGroup}
          required
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <UiButton type="submit">Войти</UiButton>

      <span>У вас нет аккаунта? <Link to={routes.register}>Зарегистрируйтесь</Link> в системе</span>
    </form>
  );
};
