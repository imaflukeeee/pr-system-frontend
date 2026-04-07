'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation' // import navigation next.js
import { useEffect, useState } from 'react' // import sate react.js

export default function PurchasingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() // เช็คหน้า url ปัจจุบัน (ทำ hover menu)
  const router = useRouter() // เอาไว้สั่งเปลี่ยนหน้า

  const [userProfile, setUserProfile] = useState({ // เก็บข้อมูลผู้ใช้ค่าเริ่มต้นคือ Guest
    name: 'Guest...',
    role: '...'
  })

  useEffect(() => { // สั่งให้โหลดฟังก์ชันเมื่อโหลดเว็บเสร็จ 1 ครั้ง
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token') // ดึงข้อมูลจาก localStorage เพื่อเอา access_token

      if (!token) { // เช็ค token ถ้าหากไม่พบให้เด้งกลับไปหน้า login
        router.push('/login')
        return
      }

      try {
        const response = await fetch('http://localhost:3000/auth/profile', { // api backend เพื่อแสดง user ผ่าน header
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // ยืนยันตัวตนผ่าน bearer token
          }
        })

        if (response.ok) { // ถ้า user ถูกต้อง (response.ok) = status 200
          const data = await response.json()
          setUserProfile({
            name: data.name || data.email || 'Authorized User', // รับข้อมูล backend update to state จาก guest เป็น user จริง
            role: data.role || 'Purchasing Admin'
          })
        } else {
          localStorage.removeItem('access_token') // ถ้า user ผิดให้กลับไป login ใหม่
          router.push('/login')
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูลโปรไฟล์ได้', error)
      }
    }

    fetchProfile() // สั่ง function profile ให้ทำงาน
  }, [router])

  return (
    <div className="flex h-screen bg-slate-50 font-sans"> { /* flexbox แบ่งพื้นที่ซ้ายขวา */ }
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col"> { /* sidebar ความกว้างไว้ที่ 64 (256px) พื้นสีขาว มีเส้นขอบขวาคั่น จัดเรียงเนื้อหาจากบนลงล่าง (flex-col) */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100"> {/* โลโก้ความสูง 80px (h-20) จัดของข้างในให้อยู่กึ่งกลางแนวตั้ง มีเส้นขอบล่าง */}
          <Image src="/assets/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight">ASSIGNMENT</span>
            <span className="text-[10px] text-slate-500 -mt-1">Energy Assignment</span>
          </div>
        </div>
        { /* เมนูที่ 1 Dashboard */}
        <nav className="flex-1 py-4 flex flex-col gap-1"> {/* พื้นที่เมนู ให้ขยายเต็มพื้นที่ที่เหลือด้านล่าง (flex-1) */}
          <Link href="/purchasing" // เช็ค url ถ้าเป็น purchasing ให้ใช้ #98d12e ถ้าไม่ใช่ให้เป็นสีเทา (hover)
            className={`flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${
              pathname === '/purchasing' ? 'border-[#98d12e] bg-[#98d12e]/10 text-[#7ba925] font-bold' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'
            }`}
          >
            <span className="text-xl">⊞</span> Dashboard
          </Link>
          { /* เมนูที่ 2 Purchase Request */ }
          <Link href="/purchasing/requests" // เช็ค url ถ้าเป็น purchasing ให้ใช้ #98d12e ถ้าไม่ใช่ให้เป็นสีเทา (hover)
            className={`flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${
              pathname.includes('/requests') ? 'border-[#98d12e] bg-[#98d12e]/10 text-[#7ba925] font-bold' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'
            }`}
          >
            <span className="text-xl">🛒</span> Purchase Requests
          </Link>
        </nav>
      </aside>
      { /* ฝั่งขวา : ขยายกินพื้นที่จอที่เหลือทั้งหมด (flex-1) และถ้าเนื้อหายาวเกินจอห้ามล้นออก (overflow-hidden)*/ }
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-slate-800">
            {pathname === '/purchasing' ? 'Dashboard' : 'Purchase Requests'} { /* แสดงชื่อหน้าเว็บตาม URL โดยอัตโนมัติ */ }
          </h1>
          {/* ข้อมูลโปรไฟล์ผู้ใช้มุมขวาบน */}
          <div className="flex items-center gap-6">
            <span className="text-2xl cursor-pointer text-slate-400 hover:text-slate-600">🔔</span>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
              { /* ดึงตัวแปร userProfile.name และ role จาก backend มาแสดง */ }
                <p className="text-sm font-bold text-slate-700">{userProfile.name}</p>
                <p className="text-xs text-slate-500">{userProfile.role}</p>
              </div>
              
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Profile" width={40} height={40} className="object-cover" />
              </div>
            </div>
          </div>
        </header>
        {/* กำหนด scroll ได้พื้นที่เดียว overflow-y-auto */}
        <div className="flex-1 overflow-y-auto p-8">
          {children} { /* ดึงกราฟมาแสดงจาก page.tsx */ }
        </div>

      </main>
    </div>
  )
}