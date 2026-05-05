'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MoreHorizontal, FileText, X, CheckCircle, XCircle, Trash2 } from 'lucide-react'

export default function PurchaseRequestsPage() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [department, setDepartment] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [requests, setRequests] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [userRole, setUserRole] = useState<string>('User') // ตัวแปรรับค่า Role ให้ค่าเริ่มต้นเป็น User
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // ดึง URL จาก vercel
  

  // State สำหรับควบคุมการเปิด/ปิด เมนู Dropdown
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  const fetchRequests = async (roleToFetch?: string) => {
    setIsLoadingData(true)
    try {
      const token = localStorage.getItem('access_token')
      const activeRole = roleToFetch || userRole;
      const apiUrl = activeRole === 'Admin' 
        ? `${baseUrl}/pr/all` 
        : `${baseUrl}/pr`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      } else {
        console.error('ไม่สามารถดึงข้อมูลได้')
      }
    } catch (error) {
      console.error('เซิร์ฟเวอร์มีปัญหา', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    let currentRole = 'User'
    if (token) {
      try {
        const payload = token.split('.')[1]
        const decodePayload = JSON.parse(atob(payload)) // atob decode Base64 เป็นข้อความปกติแล้วเก็บเป็น JSON
        console.log("Token :", decodePayload)
        currentRole = decodePayload.role || 'User'
        setUserRole(currentRole) // อัปเดต State
      } catch (error) {
        console.error('ถอดรหัส Token ไม่สำเร็จ', error)
      }
    }
    fetchRequests(currentRole)
  }, [])

  // ฟังก์ชันเปลี่ยนสถานะ PR
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`http://localhost:3000/pr/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        alert(`เปลี่ยนสถานะเป็น ${newStatus} สำเร็จ!`)
        fetchRequests(userRole)
      } else {
        const data = await response.json()
        alert(`ผิดพลาด: ${data.message || 'ไม่สามารถเปลี่ยนสถานะได้'}`)
      }
    } catch (error) {
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้')
    } finally {
      setOpenDropdownId(null) // ปิดเมนู
    }
  }

  // ==========================================
  // 🗑️ ฟังก์ชันใหม่: ลบ PR (DELETE)
  // ==========================================
  const handleDelete = async (id: number) => {
    // ถามย้ำเพื่อความชัวร์ก่อนลบ
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) return

    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`http://localhost:3000/pr/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        alert('🗑️ ลบรายการสำเร็จ!')
        fetchRequests(userRole)
      } else {
        const data = await response.json()
        alert(`ผิดพลาด: ${data.message || 'ไม่สามารถลบรายการได้'}`)
      }
    } catch (error) {
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้')
    } finally {
      setOpenDropdownId(null)
    }
  }

  const getStatusBadge = (status: string) => { 
    switch (status) {
      case 'Approved': return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Approved</span>
      case 'Rejected': return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Rejected</span>
      case 'Pending':
      default: return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending</span>
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 
    setErrorMsg('') 
    setIsLoading(true) 

    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:3000/pr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          title: description, 
          department,
          amount: Number(amount), 
          reason
        })
      })

      if (response.ok) {
        setIsModalOpen(false) 
        setDescription('')
        setDepartment('')
        setAmount('')
        setReason('')
        fetchRequests(userRole) 
      } else {
        const data = await response.json()
        setErrorMsg(data.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
      }
    } catch (err) {
      setErrorMsg('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หลังบ้านได้')
    } finally {
      setIsLoading(false) 
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#98d12e]/10 text-[#7ba925] rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">All Purchase Requests</h2>
              <p className="text-xs text-slate-500 font-medium">Manage and track all material requests</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input type="text" placeholder="Search PR number..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] w-64"/>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#98d12e] text-white rounded-lg text-sm font-bold hover:bg-[#8eb831] transition-colors shadow-sm">
              + New Request
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto pb-32">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4 font-bold">Item Description</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Department</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoadingData ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">กำลังโหลดข้อมูล...</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">ยังไม่มีรายการขออนุมัติสั่งซื้อ</td></tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{request.title}</td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(request.createdAt)}</td>
                    <td className="px-6 py-4 text-slate-500">{request.department || '-'}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{Number(request.amount).toLocaleString()} THB</td>
                    <td className="px-6 py-4">{getStatusBadge(request.status)}</td>
                    <td className="px-6 py-4 text-right relative">

                      <button 
                        onClick={() => setOpenDropdownId(openDropdownId === request.id ? null : request.id)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      {/* เมนู Dropdown  */}
                      {openDropdownId === request.id && (
                        <div className="absolute right-6 top-10 w-40 bg-white rounded-xl shadow-lg border border-slate-100 z-10 overflow-hidden text-left animate-in fade-in slide-in-from-top-2">
                          
                          {/* ปุ่ม Approve เห็นเมื่อสถานะเป็น Pending */}
                          {userRole === 'Admin' && request.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(request.id, 'Approved')}
                                className="w-full px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-medium transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" /> Approve
                              </button>
                              
                              {/* ปุ่ม Reject */}
                              <button 
                                onClick={() => handleStatusChange(request.id, 'Rejected')}
                                className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition-colors border-b border-slate-50"
                              >
                                <XCircle className="w-4 h-4" /> Reject
                              </button>
                            </>
                          )}

                          {/* ปุ่ม Delete เห็นเฉพาะสถานะเป็น Pending และเห็นเฉพาะตาม Role ที่กำหนด */}
                          <button 
                            disabled={request.status !== 'Pending'}
                            onClick={() => handleDelete(request.id)}
                            className="w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:hover:bg-white"
                          >
                            <Trash2 className="w-4 h-4" /> Delete PR
                          </button>
                        </div>
                      )}

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500 bg-slate-50/50">
          <p>Showing {requests.length} entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-[#98d12e] bg-[#98d12e] text-white rounded font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* ===================== โซนหน้าต่าง Modal ===================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Create New Purchase Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {errorMsg && <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">{errorMsg}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Item Description <span className="text-red-500">*</span></label>
                  <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Turbine Valve Replacement" className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Department <span className="text-red-500">*</span></label>
                    <select required value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] text-sm bg-white">
                      <option value="">Select Dept.</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Operations">Operations</option>
                      <option value="IT Support">IT Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Estimated Amount (THB) <span className="text-red-500">*</span></label>
                    <input type="number" required min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Business Reason</label>
                  <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Please explain why this purchase is necessary..." className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#98d12e] focus:ring-1 focus:ring-[#98d12e] text-sm resize-none"></textarea>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">Cancel</button>
                  <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#98d12e] text-white rounded-lg text-sm font-bold hover:bg-[#8eb831] transition-colors shadow-sm disabled:opacity-50">
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}