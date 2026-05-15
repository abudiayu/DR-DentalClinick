import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { dailyIncomeData, monthlyProfitData, serviceRevenueData } from '../mockData'

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">{title}</h3>
      {children}
    </div>
  )
}

export function DailyIncomeChart() {
  return (
    <ChartCard title="Daily Income">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={dailyIncomeData}>
          <defs>
            <linearGradient id="gEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="earnings" stroke="#6366f1" fill="url(#gEarnings)" strokeWidth={2} name="Total" />
          <Area type="monotone" dataKey="card"     stroke="#8b5cf6" fill="none"            strokeWidth={1.5} strokeDasharray="4 2" name="Card" />
          <Area type="monotone" dataKey="treatment"stroke="#a78bfa" fill="none"            strokeWidth={1.5} strokeDasharray="4 2" name="Treatment" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function MonthlyProfitChart() {
  return (
    <ChartCard title="Monthly Profit">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={monthlyProfitData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="income"   fill="#6366f1" radius={[4,4,0,0]} name="Income"   />
          <Bar dataKey="expenses" fill="#e2e8f0" radius={[4,4,0,0]} name="Expenses" />
          <Bar dataKey="profit"   fill="#10b981" radius={[4,4,0,0]} name="Profit"   />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function ServiceRevenuePie() {
  return (
    <ChartCard title="Service Revenue">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={serviceRevenueData}
            cx="50%" cy="50%"
            innerRadius={55} outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {serviceRevenueData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            formatter={(v: number) => [`${v.toLocaleString()} Birr`, '']}
          />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) => <span className="text-slate-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
