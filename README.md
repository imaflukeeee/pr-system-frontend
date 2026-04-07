# 🏭 PR System - Frontend (Next.js + Tailwind CSS)

ระบบหน้าบ้านสำหรับจัดการใบขออนุมัติสั่งซื้อ (Purchase Request) และตรวจสอบประสิทธิภาพพลังงาน พัฒนาด้วย Next.js 14+ และ Tailwind CSS

## 🚀 ฟีเจอร์หลัก (Features)
- **Authentication**: หน้า Login สำหรับเข้าสู่ระบบ เชื่อมต่อกับ NestJS ผ่าน JWT
- **Real-time Dashboard**: 
  - กราฟแท่ง (Bar Chart) และกราฟพื้นที่ (Area Chart) แสดงข้อมูลจาก Recharts
  - กราฟโดนัท (Donut Chart) วาดด้วย SVG สำหรับเปรียบเทียบประสิทธิภาพ (Efficiency)
- **PR Management Table**: ตารางแสดงรายการใบขอซื้อทั้งหมด พร้อมระบบ Status Badge แยกสีตามสถานะ
- **Responsive Design**: รองรับการใช้งานทั้งบนหน้าจอ Desktop และ Tablet

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Utility-first CSS)
- **Charts**: Recharts (Library) & Custom SVG (Manual Drawing)
- **Icons**: Lucide React
- **Data Fetching**: Native Fetch API (Async/Await)

## 📁 โครงสร้างหน้าเว็บ (Routes & Pages)

### 🔐 Public Route
- **`/login`**: หน้าจอสำหรับป้อน Email และ Password เพื่อขอรับ Token

### 🛡️ Protected Routes (ต้องมี Token เท่านั้น)
- **`/purchasing`**: หน้า Dashboard หลัก แสดงภาพรวมประสิทธิภาพ (Boiler/Turbine/Generator)
- **`/purchasing/requests`**: หน้าตารางแสดงรายการใบขออนุมัติสั่งซื้อ (Purchase Requests)
- **`Layout System`**: ระบบกรอบรูปที่คง Sidebar และ Header ไว้ตลอดการเปลี่ยนหน้า

## 🔐 ระบบความปลอดภัยและการจัดการข้อมูล (Frontend Logic)

### 🎟️ Token Management
- เมื่อ Login สำเร็จ ระบบจะเก็บ `access_token` ไว้ใน **localStorage**
- มีระบบลบ Token ทิ้งทันทีเมื่อกด Logout หรือเมื่อ Token หมดอายุ

### 👮‍♂️ Route Guard (Layout Protection)
- ใช้ **`useEffect`** ใน `layout.tsx` ตรวจสอบ Token ทุกครั้งที่หน้าเว็บโหลด
- หากไม่มี Token หรือ Token ปลอม ระบบจะทำการ **Redirect (เตะออก)** กลับไปที่หน้า Login อัตโนมัติ

### 📡 API Authorization
- ทุกการดึงข้อมูลจากหลังบ้าน จะมีการแนบ **Bearer Token** ไปใน Header:
  `'Authorization': 'Bearer <token>'`
- ระบบรองรับการดึงชื่อและตำแหน่งผู้ใช้งานจริงมาแสดงผลบน Header