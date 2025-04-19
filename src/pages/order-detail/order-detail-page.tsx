import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import { UiButton } from "@/shared/ui";
import { ProductsHeader } from "@/features/products/ui";

interface OrderItem {
    id: number;
    productTitle: string;
    quantity: number;
    price: number;
}

interface OrderData {
    status: string;
    items: OrderItem[];
}

export const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderData | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:8080/supplier/my/orders/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при получении заказа");
                return res.json();
            })
            .then(setOrder)
            .catch((err) => setError(err.message));
    }, [id]);

    const updateStatus = async (newStatus: string) => {
        try {
            const res = await fetch(`http://localhost:8080/order/${newStatus.toLowerCase()}/${id}`, {
                method: "POST",
            });
            if (!res.ok) throw new Error("Не удалось обновить статус");
            location.reload();
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (error) return <div className={styles.error}>{error}</div>;
    if (!order) return <div className={styles.loading}>Загрузка...</div>;

    return (
        <div className={styles.container}>
            <ProductsHeader className={styles.title}>Детали заказа #{id}</ProductsHeader>

            <div className={styles.orderInfo}>
                {order.items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div>{item.productTitle}</div>
                        <div>{item.quantity} шт.</div>
                        <div>{item.price} ₽</div>
                    </div>
                ))}

                <div className={styles.status}>Статус: <strong>{order.status}</strong></div>

                <div className={styles.actions}>
                    {order.status === "WAITING_CONFIRMATION" && (
                        <UiButton onClick={() => updateStatus("confirmed")}>Подтвердить</UiButton>
                    )}
                    {order.status === "CONFIRMED" && (
                        <UiButton onClick={() => updateStatus("shipped")}>Отправить</UiButton>
                    )}
                    {order.status === "SHIPPED" && (
                        <UiButton onClick={() => updateStatus("delivered")}>Доставлен</UiButton>
                    )}
                </div>
            </div>
        </div>
    );
};