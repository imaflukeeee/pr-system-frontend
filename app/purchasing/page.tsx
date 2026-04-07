'use client'

import { Zap, TreePine, Layers, TrendingUp, TrendingDown, CheckCircle, Sparkles } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts'

export default function DashboardPage() {
// สร้างข้อมูลจำลอง Mock Data สำหรับให้กราฟวาดรูป
  const turbineData = [
    { time: '14:00', load: 45 },
    { time: '15:00', load: 48 },
    { time: '16:00', load: 42 },
    { time: '17:00', load: 50 },
    { time: '18:00', load: 55 },
    { time: 'NOW', load: 70 },
  ]

  const generatorData = [
    { time: '1', power: 20 },
    { time: '2', power: 25 },
    { time: '3', power: 22 },
    { time: '4', power: 35 },
    { time: '5', power: 42.51 },
    { time: '6', power: 28 },
    { time: '7', power: 40 },
    { time: '8', power: 25 },
  ]

  return (
    <div className="space-y-6 pb-10">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest">TOTAL POWER TODAY</h3>
            <Zap className="text-slate-800 w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-800">1,240</span>
              <span className="text-sm font-bold text-slate-500">MWh</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+2.4% vs Yesterday</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest">FUEL CONSUMED</h3>
            <TreePine className="text-slate-800 w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-800">450.2</span>
              <span className="text-sm font-bold text-slate-500">Tons</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>-1.2% Efficiency Loss</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest">CURRENT LOAD</h3>
            <Layers className="text-slate-800 w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-800">42.5</span>
              <span className="text-sm font-bold text-slate-500">MW</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Optimal Range</span>
            </div>
          </div>
        </div>

        <div className="bg-[#8cc63f] p-6 rounded-2xl shadow-md shadow-[#8cc63f]/30 flex flex-col justify-between text-white relative overflow-hidden">
          <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10" />
          
          <div className="relative z-10 flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-white/90 tracking-widest">COMBUSTION EFFICIENCY</h3>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">99.2%</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-white text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded-md">
              <Sparkles className="w-3 h-3" />
              <span>High Performance Tier</span>
            </div>
          </div>
        </div>

      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide">BOILER MONITORING PANEL</h3>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">STABLE</span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>MAIN STEAM PRESSURE</span>
                  <span className="text-slate-800">102.5 bar</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-[#8cc63f] h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>SUPERHEATER TEMP</span>
                  <span className="text-slate-800">540.2 °C</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-orange-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>STEAM FLOW</span>
                  <span className="text-slate-800">145.8 t/h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-[#8cc63f] h-3 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <div className="border border-slate-200 rounded-xl p-3 flex-1">
                <p className="text-[10px] font-bold text-slate-400 mb-1">FEEDWATER TEMP</p>
                <p className="text-lg font-extrabold text-slate-800">248°C</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-3 flex-1">
                <p className="text-[10px] font-bold text-slate-400 mb-1">FLUE GAS O2</p>
                <p className="text-lg font-extrabold text-slate-800">3.2%</p>
              </div>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[380px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide">STEAM TURBINE PERFORMANCE</h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#8cc63f]"></div> Load (MW)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Speed (RPM)</span>
              </div>
            </div>
            
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={turbineData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                    {
                      turbineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === turbineData.length - 1 ? '#8cc63f' : '#d9f0b5'} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[320px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <h3 className="text-sm font-bold text-slate-800 tracking-wide">GENERATOR REAL-TIME OUTPUT</h3>
            <span className="text-xs font-bold text-slate-400">Peak: 48.2 MW</span>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-slate-100 z-10 text-center">
            <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1">ACTIVE POWER</p>
            <p className="text-3xl font-extrabold text-slate-800">42.51 MW</p>
          </div>

          <div className="absolute inset-0 pt-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generatorData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8cc63f" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8cc63f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="power" stroke="#8cc63f" strokeWidth={4} fillOpacity={1} fill="url(#colorPower)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[320px] flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 tracking-wide mb-8">EFFICIENCY COMPARISON</h3>
          
          <div className="flex justify-around items-center flex-1">
            
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                  <circle cx="72" cy="72" r="60" stroke="#1e293b" strokeWidth="12" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * 70.2) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold text-slate-800">70.2%</span>
                  <p className="text-[10px] font-bold text-slate-400">GROSS</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 text-center w-32 leading-tight">BOILER/TURBINE THERMAL EFFICIENCY</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                  <circle cx="72" cy="72" r="60" stroke="#8cc63f" strokeWidth="12" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * 64.8) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold text-slate-800">64.8%</span>
                  <p className="text-[10px] font-bold text-slate-400">NET PLANT</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 text-center w-32 leading-tight">PARASITIC LOAD DEDUCTED (8.2MW)</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}