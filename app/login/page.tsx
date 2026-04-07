'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('access_token', data.access_token)
        console.log('เข้าสู่ระบบสำเร็จ')
        router.push('/purchasing')
      } else {
        setErrorMsg(data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
      }
    } catch (error) {
      setErrorMsg('ไม่สามารถเชื่อมต่อกับ Server ได้')
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#F8F9FB]">
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
          <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-10">
              <label className="block text-slate-800 mb-2.5 font-medium">Password</label>
              <input 
                type="password" 
                className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] bg-[#F1F3F6]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

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