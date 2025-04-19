import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { UiButton } from "@/shared/ui";

export const CreateProductPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        quantity: 0,
        price: 0,
        sellingPrice: 0,
    });

    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "title" ? value : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/supplier/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Ошибка при создании товара");
            }

            navigate("/products/my");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Произошла ошибка");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Создание товара</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Название</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Кол-во на складе</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Закупочная цена</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Цена продажи</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={form.sellingPrice}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.buttonWrapper}>
                    <UiButton type="submit" style={{ width: "100%" }}>
                        Создать
                    </UiButton>
                </div>
            </form>
        </div>
    );
};