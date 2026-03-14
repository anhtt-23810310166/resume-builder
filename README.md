# 📄 AI Resume Builder - Professional CV Generation Platform

[![NestJS](https://img.shields.io/badge/backend-NestJS%2011-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/frontend-Next.js%2016-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeORM](https://img.shields.io/badge/orm-TypeORM%200.3-2b3b4b?style=flat-square&logo=typeorm)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL%2016-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/language-TypeScript%205-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/deployment-Docker-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

AI Resume Builder là một ứng dụng trực tuyến hiện đại giúp người dùng tạo sơ yếu lý lịch (CV) chuyên nghiệp một cách nhanh chóng. Với giao diện trực quan và các mẫu template đa dạng, người dùng có thể tùy chỉnh nội dung và xuất file PDF chất lượng cao ngay lập tức.

---

## 🌟 Tính Năng Nổi Bật

### 🎨 Trải Nghiệm Người Dùng (Frontend)
- **Thiết kế trực quan**: Giao diện chỉnh sửa CV thời gian thực, dễ dàng nhập liệu thông tin cá nhân, học vấn, kinh nghiệm.
- **Đa dạng Template**: Hỗ trợ nhiều phong cách thiết kế chuyên nghiệp:
  - `ModernTemplate`: Phong cách hiện đại, tinh tế.
  - `ProfessionalTemplate`: Phù hợp cho các vị trí quản lý, senior.
  - `ClassicTemplate`: Thiết kế truyền thống, trang trọng.
  - `MinimalTemplate`: Tối giản, tập trung vào nội dung.
- **Xuất PDF chất lượng cao**: Tích hợp `html2pdf.js` giúp chuyển đổi giao diện web thành file PDF chuẩn in ấn.
- **Responsive Design**: Hoạt động mượt mà trên cả máy tính và thiết bị di động.

### 🛡️ Hệ Thống Backend
- **Kiến trúc Modular**: Xây dựng với NestJS giúp hệ thống dễ dàng mở rộng và bảo trì.
- **Quản lý dữ liệu**: Sử dụng TypeORM kết hợp PostgreSQL để lưu trữ thông tin CV an toàn và hiệu quả.
- **Swagger Documentation**: Tài liệu API tự động, giúp việc phát triển và tích hợp trở nên dễ dàng.
- **Validation**: Kiểm soát dữ liệu đầu vào nghiêm ngặt với `class-validator` và `class-transformer`.

---

## 🛠 Tech Stack

| Thành phần | Công nghệ sử dụng |
| :--- | :--- |
| **Backend Framework** | NestJS 11 |
| **Frontend Framework** | Next.js 16 (App Router) |
| **ORM** | TypeORM |
| **Database** | PostgreSQL |
| **PDF Export** | html2pdf.js |
| **Icons** | react-icons |
| **Deployment** | Docker, Docker Compose |
| **Documentation** | Swagger UI |

---

## 🏗️ Cấu Trúc Dự Án

```
resume-builder/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── templates/      # CV Templates (Modern, Professional...)
│   │   ├── constants/      # App constants
│   │   └── utils/          # Utility functions (PDF export...)
├── server/                 # NestJS Backend
│   ├── src/
│   │   ├── resume/         # Module quản lý Resume (Controller, Service, Entity)
│   │   ├── app.module.ts   # Main module
│   │   └── main.ts         # Entry point & Swagger config
└── docker-compose.yml      # Docker configuration for Database
```

---

## 🚀 Hướng Dẫn Cài Đặt

### 1. Yêu Cầu Hệ Thống
- Node.js >= 20.x
- Docker & Docker Compose

### 2. Cấu Hình Biến Môi Trường

Tại thư mục `server/`:
```bash
cp .env.example .env
```
Cập nhật thông tin kết nối Database (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`).

### 3. Triển Khai Cơ Sở Dữ Liệu (Docker)
```bash
# Tại thư mục gốc
docker compose up -d
```

### 4. Thiết Lập Backend
```bash
cd server
npm install
npm run start:dev
```
*API sẽ chạy tại: `http://localhost:3001/api`*

### 5. Thiết Lập Frontend
```bash
cd client
npm install
npm run dev
```
*Giao diện sẽ chạy tại: `http://localhost:3000`*

---

## 📁 Lệnh CLI Hữu Ích

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run build` | Build dự án cho production |
| `npm run lint` | Kiểm tra và sửa lỗi coding style |
| `npm run test` | Chạy unit tests (Backend) |
| `npm run start:prod` | Chạy ứng dụng trong môi trường production |

---

## 🔗 Liên Hệ & Hỗ Trợ

- **API Documentation**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
- **Demo Platform**: [https://resume-builder-z696.vercel.app](https://resume-builder-z696.vercel.app)

---
**Developed with ❤️ by Resume Builder Team**
