import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { IUserProduct } from "@/features/auth/model/types";
import {UiButton} from "@/shared/ui";
import {ProductsHeader} from "@/features/products/ui";


export const MyProductsPage = () => {
    const [products, setProducts] = useState<IUserProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/supplier/my/products")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при загрузке товаров");
                return res.json();
            })
            .then(setProducts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ProductsHeader>Мои товары</ProductsHeader>
                <Link to="/products/create" className={styles.createButton}>
                    <UiButton style={{ width: '150px', marginBottom: '2rem' }}>
                        + Добавить товар
                    </UiButton>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Закупочная цена</th>
                    <th>Цена продажи</th>
                    <th>Остаток</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id}>
                        <td>{p.title}</td>
                        <td>{p.price} ₽</td>
                        <td>{p.sellingPrice} ₽</td>
                        <td>{p.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};