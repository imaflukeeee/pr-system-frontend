'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PurchasingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
          <Image src="/assets/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight">ASSIGNMENT</span>
            <span className="text-[10px] text-slate-500 -mt-1">Energy Assignment</span>
          </div>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1">
          <Link href="/purchasing" 
            className={`flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${
              pathname === '/purchasing' 
                ? 'border-[#98d12e] bg-[#98d12e]/10 text-[#7ba925] font-bold' 
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'
            }`}
          >
            <span className="text-xl">⊞</span>
            Dashboard
          </Link>
          <Link href="/purchasing/requests" 
            className={`flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${
              pathname.includes('/requests')
                ? 'border-[#98d12e] bg-[#98d12e]/10 text-[#7ba925] font-bold' 
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'
            }`}
          >
            <span className="text-xl">🛒</span>
            Purchase Requests
          </Link>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-slate-800">
            {pathname === '/purchasing' ? 'Dashboard' : 'Purchase Requests'}
          </h1>
          <div className="flex items-center gap-6">
            <span className="text-2xl cursor-pointer text-slate-400 hover:text-slate-600">🔔</span>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">James Boonmee</p>
                <p className="text-xs text-slate-500">Supervisor</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Profile" width={40} height={40} className="object-cover" />
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children} 
        </div>
      </main>
    </div>
  )
}