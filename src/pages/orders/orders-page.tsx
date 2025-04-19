import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { UiButton } from "@/shared/ui";
import { ProductsHeader } from "@/features/products/ui";

interface Order {
    orderId: number;
    address: string;
    status: string;
    totalPrice: number;
}

export const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/supplier/my/orders")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при загрузке заказов");
                return res.json();
            })
            .then(setOrders)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.loading}>Загрузка заказов...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <ProductsHeader className={styles.title}>Мои заказы</ProductsHeader>

            {orders.length === 0 ? (
                <div className={styles.empty}>У вас пока нет заказов.</div>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Адрес</th>
                        <th>Статус</th>
                        <th>Итого</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.address}</td>
                            <td>{order.status}</td>
                            <td>{order.totalPrice} ₽</td>
                            <td>
                                <Link to={`/orders/${order.orderId}`}>
                                    <UiButton>Подробнее</UiButton>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
