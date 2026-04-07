'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('') // ข้อความแจ้งเตือนเมื่อ email ผิด
  const [password, setPassword] = useState('') // ข้อความแจ้งเตือนเมื่อ password ผิด
  const [errorMsg, setErrorMsg] = useState('')  // ข้อความ error msg เมื่อรหัสผ่านผิด
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => { // function นี้ทำงานเมื่อกดปุ่ม login
    e.preventDefault() // ป้องกัน refresh เวลากด submit
    setErrorMsg('') // clear error msg เก่า
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', { // ยิง api user ไปที่ backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }), // แปลงข้อมูลเป็น json
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('access_token', data.access_token) // เช็ค access_token และเก็บใน localStorage
        console.log('เข้าสู่ระบบสำเร็จ')
        router.push('/purchasing') // พาเข้าสู่หน้า Dashbaord
      } else {
        setErrorMsg(data.message || "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง") // ข้อความแจ้งเตือนเมื่อ username หรือ password ผิด
      }
    } catch (error) {
      setErrorMsg('ไม่สามารถเชื่อมต่อกับ Server ได้') 
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#F8F9FB]"> { /* container กึ่งกลางทั้งแนวตั้งและแนวนอน */ }
      <header className="w-full bg-white py-3 px-6 border-b border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image 
            src="/assets/logo.png" 
            alt="Assignment Logo" 
            width={30} 
            height={30} 
            className="object-contain" 
          />
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-slate-950 tracking-tight">ASSIGNMENT</span>
            <span className="text-xs text-slate-500 -mt-1">Energy Assignment</span>
          </div>
        </div>
      </header>
      
      <main className="grid flex-grow grid-cols-2 h-0">
        <div className="relative bg-[#E4E8EF] border-r border-slate-100 overflow-hidden">
          <Image 
            src="/assets/powerplant.png" 
            alt="Power Plant Image" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-[#E4E8EF]/30"></div>
        </div>

        <div className="flex items-center justify-center p-8 overflow-y-auto">
          <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100"> { /* form submit เมื่อกดจะเรียก handleLogin */ }
            <h1 className="text-4xl font-extrabold mb-3 text-slate-900 tracking-tight">Internal Access</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Authorized personnel Only. Please sign in to continue.
            </p>
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
                {errorMsg}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-slate-800 mb-2.5 font-medium">E-mail</label>
              <input 
                type="email" 
                className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] bg-[#F1F3F6]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // เมื่อกรอก Pasword ให้ไปเก็บใน state setEmail
                required
              />
            </div>
            {/* Input Password */ }
            <div className="mb-10">
              <label className="block text-slate-800 mb-2.5 font-medium">Password</label>
              <input 
                type="password" 
                className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] bg-[#F1F3F6]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // เมื่อกรอก Pasword ให้ไปเก็บใน state setPassword
                required
              />
            </div>
            { /* ปุ่ม Submit Login */ }
            <button 
              type="submit" 
              className="w-full p-4 bg-[#98d12e] text-white text-lg font-bold rounded-xl hover:bg-[#8eb831] transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}