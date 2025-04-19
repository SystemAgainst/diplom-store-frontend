import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UiButton } from "@/shared/ui";
import { getAuthHeader } from "@/features/auth/model/api";
import styles from "./style.module.css";
import { ProductsHeader } from "@/features/products/ui";


export const CreateProductPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        quantity: 0,
        price: 0,
        sellingPrice: 0,
        images: [] as File[],
    });

    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "images" && files) {
            setForm(prev => ({ ...prev, images: Array.from(files) }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: name === "title" ? value : Number(value),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();

            data.append("title", form.title);
            data.append("quantity", String(form.quantity));
            data.append("price", String(form.price));
            data.append("sellingPrice", String(form.sellingPrice));

            if (form.images.length === 0) {
                // Добавляем заглушку, если пользователь не загрузил изображение
                const res = await fetch("/vite.svg");
                const blob = await res.blob();
                const placeholderFile = new File([blob], "vite.svg", { type: blob.type });
                data.append("images", placeholderFile);
            } else {
                // Добавляем все изображения из формы
                form.images.forEach((file) => {
                    data.append("images", file);
                });
            }

            const response = await fetch("http://localhost:8080/product/create", {
                method: "POST",
                body: data,
                headers: {
                    Authorization: getAuthHeader(),
                }
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Ошибка при создании товара");
            }

            navigate("/products/my");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Произошла ошибка");
        }
    };

    return (
        <div className={styles.container}>
            <ProductsHeader className={styles.title}>Создание товара</ProductsHeader>

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

                <div className={styles.fileInputWrapper}>
                    <label className={styles.fileLabel}>Фото</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                        className={styles.fileInput}
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