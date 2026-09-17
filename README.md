<div align="center">

  # ⚡ Todo Receipt RESTful API Server
  
  **Robust, Scalable Backend Service for The Daily Run · To Do Receipt Application**  
  ระบบหลังบ้านให้บริการ RESTful API พัฒนาด้วยสถาปัตยกรรม MVC บน **AdonisJS 5 (TypeScript)**  
  จัดเก็บข้อมูลด้วย **PostgreSQL** ผ่าน **Lucid ORM** พร้อมชุดทดสอบอัตโนมัติ **Postman Test Suite**

  <br />

  <!-- Badges -->
  [![AdonisJS 5](https://img.shields.io/badge/AdonisJS%205-5A45FF?style=for-the-badge&logo=adonisjs&logoColor=white)](https://adonisjs.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

  <br />
  <br />

  [🖥️ คลังโค้ดฝั่งหน้าบ้าน (Frontend Repo)](https://github.com/SterduckPedNoi/Somsri-Todo-Frontend/tree/main) • [🧪 เอกสารชุดทดสอบ (Postman Suite)](#-การทดสอบอัตโนมัติ-automated-testing)

</div>

---

## 🌟 จุดเด่นของระบบ (Architecture Highlights)

* **Enterprise MVC Architecture:** จัดการโครงสร้างโปรเจกต์อย่างเป็นระบบ แยก Controllers, Models, Validators และ Routes ชัดเจน
* **Type-Safe Database Operations:** ใช้งาน **Lucid ORM** ร่วมกับ PostgreSQL ควบคุม Schema ผ่าน Database Migration อย่างแม่นยำ
* **Atomic State Toggle:** รองรับ Endpoint เฉพาะทาง `PATCH /api/todos/:id/toggle` สำหรับสลับสถานะงานอย่างรวดเร็ว ลด Payload ที่ไม่จำเป็น
* **CORS & Middleware Protection:** คอนฟิก Cross-Origin Resource Sharing เพื่อรองรับการเรียกใช้งานจาก Frontend Client (Vue.js 3)
* **Automated Contract Testing:** มีชุดทดสอบ Postman Collection v2.1 พร้อมเขียน JavaScript Assertion Scripts ตรวจสอบสถานะและ Schema อัตโนมัติทุก Endpoint

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

ตารางหลัก: `todos`

| คอลัมน์ (Field) | ชนิดข้อมูล (Type) | ข้อจำกัด (Constraints) | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `id` | `BIGSERIAL` / `INT` | Primary Key, Auto-increment | รหัสประจำรายการงาน |
| `title` | `VARCHAR(255)` | Not Null | ชื่อหรือรายละเอียดของงาน |
| `is_completed` | `BOOLEAN` | Not Null, Default: `false` | สถานะการทำงาน (เสร็จ / ยังไม่เสร็จ) |
| `created_at` | `TIMESTAMPTZ` | Not Null | วันเวลาที่สร้างข้อมูล |
| `updated_at` | `TIMESTAMPTZ` | Not Null | วันเวลาที่มีการแก้ไขล่าสุด |

---

## 📋 ข้อมูลจำเพาะ API (API Specifications)

**Base URL:** `http://127.0.0.1:3333`

| Method | Endpoint | Description | Request Body | Response Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health Check สถานะของเซิร์ฟเวอร์ | _None_ | `200 OK` |
| `GET` | `/api/todos` | ดึงรายการงานทั้งหมด (`?status=all\|active\|completed`) | _None_ | `200 OK` |
| `POST` | `/api/todos` | สร้างรายการงานใหม่ | `{"title": "string"}` | `201 Created` |
| `GET` | `/api/todos/:id` | ดึงข้อมูลงานตาม ID | _None_ | `200 OK` / `404 Not Found` |
| `PUT` | `/api/todos/:id` | อัปเดตข้อมูลงานทั้งหมด | `{"title": "string", "is_completed": boolean}` | `200 OK` / `404 Not Found` |
| `PATCH` | `/api/todos/:id/toggle` | สลับสถานะงาน (`is_completed`) | _None_ | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/todos/:id` | ลบรายการงานตาม ID | _None_ | `200 OK` / `404 Not Found` |

<details>
<summary><b>🔍 คลิกเพื่อดูตัวอย่าง Request / Response Payload</b></summary>

<br />

#### สร้างงานสำเร็จ (`POST /api/todos`)
```json
// Headers: Content-Type: application/json
// Body:
{
  "title": "Deploying API to cloud"
}

// Response: 201 Created
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 1,
    "title": "Deploying API to cloud",
    "is_completed": false,
    "created_at": "2026-09-05T16:22:18.391+07:00",
    "updated_at": "2026-09-05T16:22:18.391+07:00"
  }
}
```

#### ดึงรายการงานทั้งหมด (`GET /api/todos`)
```json
// Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Deploying API to cloud",
      "is_completed": true,
      "created_at": "2026-09-05T16:22:18.391+07:00",
      "updated_at": "2026-09-05T16:22:18.487+07:00"
    }
  ]
}
```
</details>

---

## 🧪 การทดสอบอัตโนมัติ (Automated Testing)

ภายในโฟลเดอร์ `postman/` ได้จัดเตรียมชุดทดสอบ API แบบอัตโนมัติเพื่อตรวจสอบความถูกต้องของระบบ:

* 📦 `postman/Todo_API_Collection.json` — รวม Request ทั้งหมดและ JavaScript Tests
* 🌐 `postman/Todo_API_Environment.json` — คอนฟิกตัวแปร Localhost และ Dynamic ID

```
Todo Receipt API - Automated Test Suite
├── 01. Health Check [Status 200]
├── 02. Get All Todos [Status 200, Array Check]
├── 03. Create Todo [Status 201, Auto-store ID]
├── 04. Get Todo By ID [Status 200, Schema Validation]
├── 05. Update Todo [Status 200, Verify Mutation]
├── 06. Toggle Todo Status [Status 200, Invert Boolean Check]
├── 07. Filter Todos (?status=active) [Status 200]
├── 08. Delete Todo [Status 200]
└── 09. Get Non-Existing Todo [Status 404 Not Found]
```

### ขั้นตอนการรันการทดสอบใน Postman
1. เปิดโปรแกรม **Postman** แล้วคลิกปุ่ม **Import**
2. ลากไฟล์ทั้ง 2 ไฟล์จากโฟลเดอร์ `postman/` เข้าสู่โปรแกรม
3. เลือก Environment ด้านมุมขวาบนเป็น **Localhost Environment (AdonisJS 5)**
4. คลิกขวาที่ Collection **Todo Receipt API - Automated Test Suite** แล้วเลือก **Run Collection**
5. ตรวจสอบสถานะการทดสอบ ทุกขั้นตอนต้องผ่าน Assertion สีเขียว 100%

---

## ⚙️ ขั้นตอนการติดตั้งและรันในเครื่อง (Local Setup)

### สิ่งที่จำเป็นต้องมี (Prerequisites)
* Node.js (v18.x ขึ้นไป)
* PostgreSQL 14+ (กำลังรันอยู่ที่พอร์ต `5432`)

### 1. ติดตั้ง Dependencies
```bash
cd backend
npm install
```

### 2. ตั้งค่าไฟล์ Environment Variables (`.env`)
คัดลอกไฟล์ `.env.example` มาสร้างเป็น `.env`:
```bash
cp .env.example .env
```
กำหนดค่าการเชื่อมต่อฐานข้อมูลใน `.env`:
```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=generate_with_node_ace_generate_key
DRIVE_DISK=local

DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DB_NAME=todos_db
```

> 💡 *สร้าง `APP_KEY` ใหม่ได้ด้วยคำสั่ง: `node ace generate:key`*

### 3. รัน Database Migrations
ดำเนินการสร้างตารางใน PostgreSQL:
```bash
node ace migration:run
```

### 4. รัน Development Server
```bash
node ace serve --watch
```
เซิร์ฟเวอร์จะเริ่มทำงานที่ `http://127.0.0.1:3333`

---

## 👤 จัดทำโดย (Author)

* **Developer:** Yuttapat Na Nakornpanom
* **Frontend Web App:** [https://somsri-todo-frontend.vercel.app/](https://somsri-todo-frontend.vercel.app/)
* **GitHub Profile:** [@SterduckPedNoi](https://github.com/SterduckPedNoi)
