# REST API Документация

Здесь описаны все доступные endpoints с примерами запросов и ответов. Разделено по ролям: `CLIENT`, `SUPPLIER`, `ADMIN`.

---

## ⚖️ Auth (Login & Register)

### POST `/login`
**Авторизация**

#### Запрос:
```json
{
  "login": "supplier_one",
  "password": "Password123!"
}
```

#### Ответ:
```json
{
  "id": 2,
  "login": "supplier_one",
  "role": "SUPPLIER"
}
```

---

### POST `/register`
**Регистрация**

#### Запрос:
```json
{
  "login": "client123",
  "password": "Password123!",
  "chatId": "123456",
  "loginTelegram": "@client123",
  "role": "CLIENT"
}
```

---

## 👤 User

### GET `/user/{id}`
**Профиль юзера**

#### Ответ:
```json
{
  "id": 2,
  "login": "supplier_one",
  "chatId": "100001",
  "loginTelegram": "@supplier1",
  "role": "SUPPLIER"
}
```

---

## 👨‍🌾 Supplier (role: SUPPLIER)

### GET `/supplier/me`
**Профиль поставщика**

```json
{
  "id": 2,
  "login": "supplier_one",
  "productsCount": 5,
  "ordersCount": 12
}
```

---

### GET `/supplier/my/products`
**Список товаров**

```json
[
  {
    "id": 1,
    "title": "Powerbank Baseus 10000mAh",
    "price": 1850,
    "sellingPrice": 2490,
    "quantity": 45
  }
]
```

---

### POST `/product/create`
**Создание товара**

#### FormData:
```
title: Powerbank
quantity: 10
price: 1200
sellingPrice: 1500
images: [File]
```

#### Ответ:
```Объявление создано!
```

---

### GET `/supplier/my/orders`
```json
[
  {
    "id": 10,
    "clientLogin": "client123",
    "total": 3200,
    "status": "CONFIRMED"
  }
]
```

---

## 📅 Order (Supplier & Client)

### GET `/order/info/{id}`
```json
{
  "order": {
    "id": 10,
    "status": "CONFIRMED",
    "items": [
      { "title": "Powerbank", "quantity": 2, "price": 1500 }
    ]
  }
}
```

---

## 🚗 Order Actions

- POST `/order/confirmed/{id}`
- POST `/order/cancelled/{id}`
- POST `/order/shipped/{id}`
- POST `/order/delivered/{id}`

```json
{
  "message": "Заказ отправлен"
}
```

---

## 🪚 Cart (Client only)

### POST `/cart/add`
```json
{
  "productId": 1,
  "quantity": 3
}
```

---

### GET `/cart/remove/{itemId}`
---

### POST `/cart/decrease`
```json
{
  "productId": 1,
  "quantity": 1
}
```

---

## 📄 Checkout / Payment

### GET `/order/checkout`
```json
"Cart ready for checkout"
```

---

### POST `/order/create`
```json
{
  "address": "г. Москва, ул. Ленина 1"
}
```

---

## 🔐 Admin only

### GET `/admin/clients`
```json
[
  { "id": 1, "login": "client1" }
]
```

### POST `/admin/ban/{login}`
```json
"client1 banned"
```

### POST `/admin/anBan/{login}`
```json
"client1 unbanned"
```

### POST `/admin/products/delete/{id}`
```json
"Product deleted"
```

---

## 🤖 Telegram Webhook

### POST `/telegram/webhook`
**Incoming Telegram message processing**

Payload:
```json
{
  "message": {
    "text": "/accept_123",
    "chat": { "id": 123456789 }
  }
}
```

---

## 📋 QR Confirm (Telegram Check)

### GET `/qr-confirm?orderId=1`
**Отправка чека в Telegram**
```json
"Чек отправлен в Telegram"
```