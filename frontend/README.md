# AgroVet Manufacturing & Distribution ERP

This project is a unified full-stack application built with **Next.js 14**, **Prisma**, and **PostgreSQL**.

## 🚀 Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Ensure you have a `.env` file with:
    - `DATABASE_URL`: Neon/PostgreSQL connection string
    - `JWT_SECRET`: Secret for auth
    - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: For image uploads
4.  **Database Setup**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🏗️ Architecture

- **Frontend & Backend**: Unified in Next.js.
- **API Routes**: Located in `src/app/api/`.
- **Database**: Prisma ORM with PostgreSQL.
- **Styling**: Tailwind CSS.
- **State Management**: Redux Toolkit.
- **Animations**: Framer Motion & GSAP.

## 📦 Modules

1. **Purchase**: Vendor & Requisition management.
2. **Sales**: Invoices, Customers & MPO tracking.
3. **Inventory**: Stock, Warehouses & Products.
4. **Accounting**: Chart of Accounts & Journals.
5. **HR**: Employees & Leave management.
6. **Production**: BOM & Production Orders (Kanban).
7. **Assets**: Asset register & Depreciation.
8. **CRM**: Doctor/Chemist contacts & Visits.
