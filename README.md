---
## 🛠 پنل ادمین

- مدیریت کامل محصولات (CRUD)
- آپلود و مدیریت تصاویر با Cloudinary
- مدیریت بنرهای صفحه اصلی
- مشاهده و مدیریت سفارش‌ها
- مدیریت وضعیت پرداخت‌ها
---

## 🧱 تکنولوژی‌های استفاده شده

- Next.js (Full-stack framework)
- React 18
- React Query (@tanstack/react-query)
- Material UI
- TailwindCSS
- Framer Motion
- MongoDB + Mongoose
- Cloudinary
- Zarinpal SDK

---

## 📦 وابستگی‌ها (Dependencies)

### Production Dependencies

```json
{
    "@chabokan.net/cli": "^0.8.15",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^9.0.1",
    "@mui/material": "^9.0.1",
    "@tanstack/react-query": "^5.101.0",
    "axios": "^1.16.1",
    "bcryptjs": "^3.0.3",
    "cloudinary": "^2.10.0",
    "formidable": "^3.5.4",
    "framer-motion": "^12.40.0",
    "html2pdf.js": "^0.14.0",
    "jsonwebtoken": "^9.0.3",
    "lucide-react": "^1.18.0",
    "mongoose": "^9.6.2",
    "next": "16.2.6",
    "next-cloudinary": "^6.17.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^5.6.0",
    "zarinpal-checkout": "^1.1.0",
    "zarinpal-node-sdk": "^2.2.0"
}
```

### 💳 سیستم پرداخت

- اتصال به درگاه پرداخت **زرین‌پال**
- استفاده از **Zarinpal Gateway** برای پردازش تراکنش‌ها

## ☁️ هاست و استقرار

- پروژه روی پلتفرم **چابکان (Chabokan)** دیپلوی شده است
- استفاده از CLI چابکان برای استقرار و مدیریت نسخه‌ها

---

## ☁️ استقرار (Deployment)

پروژه بر روی **Chabokan Cloud** مستقر شده است.

### نصب CLI

```bash
npm install -g @chabokan.net/cli
```

### ورود به حساب کاربری

```bash
chabok login
```

### مشاهده سرویس‌ها

```bash
chabok service list
```

### استقرار نسخه جدید

```bash
npx chabok deploy
```

### راه‌اندازی مجدد سرویس

```bash
chabok service restart -s shoose-market
```

### مشاهده لاگ‌ها

```bash
chabok service logs -s shoose-market
```

---

## 🔧 تنظیمات Build

```bash
npm run build
```

## 🚀 اجرای برنامه

```bash
npm run start
```
