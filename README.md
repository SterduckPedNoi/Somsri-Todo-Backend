# Todo Receipt RESTful API Server (AdonisJS 5 + PostgreSQL)

RESTful API Server สำหรับระบบจัดการ Todo List สไตล์ **To Do Receipt** พัฒนาด้วย **AdonisJS 5 (TypeScript)** และจัดเก็บข้อมูลใน **PostgreSQL** ผ่าน **Lucid ORM** พร้อมชุดทดสอบ **Postman Collection** ครบวงจร

---

## 🚀 คุณสมบัติเด่น (Features)
- พัฒนาด้วย **AdonisJS 5 (TypeScript)** รองรับ Architecture ที่เป็นมาตรฐานและ Clean Code
- จัดเก็บข้อมูลจริงลงในฐานข้อมูล **PostgreSQL** ด้วย **Lucid ORM** และ Database Migrations
- มี RESTful API ครบทุกฟังก์ชัน **CRUD (Create, Read, Update, Delete)**
- รองรับการสลับสถานะ (Toggle completion) แบบรวดเร็วด้วย `PATCH /api/todos/:id/toggle`
- เปิดใช้งาน **CORS** เพื่อรองรับการทำงานร่วมกับ Frontend (Vue.js 3)
- มีชุดทดสอบอัตโนมัติด้วย **Postman Collection (v2.1)** พร้อม Assertion Scripts

---

## 🛠 Tech Stack
- **Framework:** AdonisJS 5.9.0
- **Language:** TypeScript 4.x
- **ORM:** Lucid ORM (@adonisjs/lucid 18.x)
- **Database:** PostgreSQL 16
- **Testing:** Postman Collection v2.1

---

## 📋 API Endpoints

Base URL: `http://127.0.0.1:3333`

| Method | Endpoint | Description | Request Body | Response Status |
|--------|----------|-------------|--------------|-----------------|
| `GET` | `/api/health` | Health check สถานะเซิร์ฟเวอร์ | None | `200 OK` |
| `GET` | `/api/todos` | ดึงรายการ Todo ทั้งหมด (query: `?status=all\|active\|completed`) | None | `200 OK` |
| `POST` | `/api/todos` | สร้าง Todo ใหม่ | `{"title": "string"}` | `201 Created` |
| `GET` | `/api/todos/:id` | ดึงข้อมูล Todo ตาม ID | None | `200 OK` / `404 Not Found` |
| `PUT` | `/api/todos/:id` | อัปเดตข้อมูล Todo (title หรือ is_completed) | `{"title": "...", "is_completed": true}` | `200 OK` / `404 Not Found` |
| `PATCH` | `/api/todos/:id/toggle` | สลับสถานะเสร็จสิ้น (Toggle completed) | None | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/todos/:id` | ลบรายการ Todo ตาม ID | None | `200 OK` / `404 Not Found` |

### ตัวอย่าง Response

#### 1. สร้าง Todo สำเร็จ (`POST /api/todos`)
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 1,
    "title": "To moon",
    "is_completed": false,
    "created_at": "2026-09-05T16:22:18.391+07:00",
    "updated_at": "2026-09-05T16:22:18.391+07:00"
  }
}
```

#### 2. ดึงรายการ Todo ทั้งหมด (`GET /api/todos`)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "To moon",
      "is_completed": true,
      "created_at": "2026-09-05T16:22:18.391+07:00",
      "updated_at": "2026-09-05T16:22:18.487+07:00"
    }
  ]
}
```

---

## ⚙️ การติดตั้งและรันเซิร์ฟเวอร์ (Local Setup)

### 1. ติดตั้ง Dependencies
```bash
cd backend
npm install
```

### 2. ตั้งค่า Environment Variables (`.env`)
คัดลอกไฟล์ตัวอย่าง `.env.example` เป็น `.env` และตั้งค่าการเชื่อมต่อ PostgreSQL:
```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=dnAK9Zdz5XCdyaAqg7oUeqy6fEwwNeEF
DRIVE_DISK=local

DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DB_NAME=todos_db
```

### 3. รัน Database Migration
```bash
node ace migration:run
```

### 4. รัน Dev Server
```bash
node ace serve --watch
```
เซิร์ฟเวอร์จะพร้อมทำงานที่ `http://127.0.0.1:3333`

---

## 🧪 การทดสอบด้วย Postman (Postman Testing)
ในโฟลเดอร์ `postman/` มีไฟล์ทดสอบเตรียมไว้ให้แล้ว:
1. `postman/Todo_API_Collection.json`
2. `postman/Todo_API_Environment.json`

### วิธีนำเข้าและรันใน Postman:
1. เปิดโปรแกรม **Postman**
2. คลิกปุ่ม **Import** (มุมบนซ้าย)
3. ลากไฟล์ทั้ง 2 ไฟล์ลงใน Postman
4. เลือก Environment เป็น **Localhost Environment (AdonisJS 5)**
5. คลิกที่ Collection **Todo Receipt API - Automated Test Suite** และกด **Run Collection**
6. Postman จะรันการทดสอบ 9 ข้อโดยอัตโนมัติ พร้อมตรวจ Assertions สีเขียวผ่านทุกข้อ
