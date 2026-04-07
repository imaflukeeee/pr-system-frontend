'use client'

import { Search, Filter, MoreHorizontal, FileText } from 'lucide-react' // import tools create graph from recharts
export default function PurchaseRequestsPage() {

  const mockRequests = [ // สร้างข้อมูลจำลอง mockup เป็น array เก็บรายชื่อใบขอซื้อ 4 รายการ
    { id: 'PR-2026-001', date: '07 Apr 2026', requester: 'John Doe', department: 'Maintenance', amount: '45,000 THB', status: 'Pending' },
    { id: 'PR-2026-002', date: '06 Apr 2026', requester: 'Sarah Smith', department: 'Operations', amount: '12,500 THB', status: 'Approved' },
    { id: 'PR-2026-003', date: '05 Apr 2026', requester: 'Michael Lee', department: 'IT Support', amount: '89,900 THB', status: 'Rejected' },
    { id: 'PR-2026-004', date: '05 Apr 2026', requester: 'Emma Wong', department: 'Maintenance', amount: '5,400 THB', status: 'Approved' },
  ]

  const getStatusBadge = (status: string) => { // function ช่วยรับข้อความ status แปลงเป็น badge สี
    switch (status) {
      case 'Approved': // ถ้า approved คืนค่าเป็น <span> สีเขียว (emerald)
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Approved</span>
      case 'Rejected': // ถ้า rejected คืนค่าเป็น <span> สีแดง (red)
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Rejected</span>
      case 'Pending':
      default: // ถ้า pending หรืออื่น ๆ คืนค่าเป็น <span> สีส้ม (amber)
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending</span>
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden"> { /* container bg white */}

      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-3"> { /* ด้านซ้าย logo และหัวข้อ */}
          <div className="p-2 bg-[#98d12e]/10 text-[#7ba925] rounded-lg"> { /* box icon paper */}
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">All Purchase Requests</h2>
            <p className="text-xs text-slate-500 font-medium">Manage and track all material requests</p>
          </div>
        </div>

        <div className="flex gap-3"> { /* เครื่องมือด้านขวา search , filter , create */ }
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search PR number..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-4 py-2 bg-[#98d12e] text-white rounded-lg text-sm font-bold hover:bg-[#8eb831] transition-colors shadow-sm">
            + New Request
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto"> { /* body ข้อมูล */ }
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="px-6 py-4 font-bold">PR Number</th>
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold">Requester</th>
              <th className="px-6 py-4 font-bold">Department</th>
              <th className="px-6 py-4 font-bold">Amount</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockRequests.map((request, index) => ( // วนลูป (map) เอาข้อมูล mockRequest มาสร้าง <tr> เรียงทีละรายการ
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">  { /* ดึงข้อมูลจากตัวแปร request แต่ละตัวมาแสดง */ }
                <td className="px-6 py-4 font-bold text-slate-800">{request.id}</td>
                <td className="px-6 py-4 text-slate-500">{request.date}</td>
                <td className="px-6 py-4 font-medium text-slate-700">{request.requester}</td>
                <td className="px-6 py-4 text-slate-500">{request.department}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{request.amount}</td>
                <td className="px-6 py-4">
                  {getStatusBadge(request.status)} { /* ดึงข้อมูลสถานะมาให้ getStatusBadge แปลงเป็นสีก่อน */ }
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500 bg-slate-50/50">
        <p>Showing 1 to 4 of 4 entries</p>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 border border-[#98d12e] bg-[#98d12e] text-white rounded font-medium">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50">Next</button>
        </div>
      </div>

    </div>
  )
}