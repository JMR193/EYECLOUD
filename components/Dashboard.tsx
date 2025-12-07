import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Users, Calendar, Activity, TrendingUp } from 'lucide-react';

const dataVisits = [
  { name: 'Mon', visits: 24 },
  { name: 'Tue', visits: 32 },
  { name: 'Wed', visits: 28 },
  { name: 'Thu', visits: 35 },
  { name: 'Fri', visits: 21 },
  { name: 'Sat', visits: 15 },
];

const dataDiagnosis = [
  { name: 'Cataract', value: 400 },
  { name: 'Glaucoma', value: 300 },
  { name: 'Myopia', value: 300 },
  { name: 'Dry Eye', value: 200 },
];

const COLORS = ['#0ea5e9', '#0284c7', '#38bdf8', '#bae6fd'];

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
      <p className={`text-xs mt-2 font-medium ${colorClass}`}>{subtext}</p>
    </div>
    <div className={`p-3 rounded-xl ${colorClass.replace('text-', 'bg-').replace('600', '50')} ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Clinic Overview</h2>
        <p className="text-slate-500">Welcome back, Dr. Sharma. Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Patients" 
          value="1,284" 
          subtext="+12% from last month" 
          icon={Users} 
          colorClass="text-blue-600"
        />
        <StatCard 
          title="Appointments Today" 
          value="24" 
          subtext="4 slots remaining" 
          icon={Calendar} 
          colorClass="text-emerald-600"
        />
        <StatCard 
          title="Pending Reports" 
          value="7" 
          subtext="Requires review" 
          icon={Activity} 
          colorClass="text-amber-600"
        />
        <StatCard 
          title="Revenue (Nov)" 
          value="$12.4k" 
          subtext="+8.2% growth" 
          icon={TrendingUp} 
          colorClass="text-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Patient Visits</h3>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary-500">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataVisits}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="visits" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Diagnosis Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataDiagnosis}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataDiagnosis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {dataDiagnosis.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{Math.round((item.value / 1200) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
