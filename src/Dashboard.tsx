import { useNavigate } from 'react-router-dom'

const stats = [
  { label: 'Total Users', value: '12,430', change: '+12%', up: true },
  { label: 'Active Sessions', value: '1,893', change: '+5%', up: true },
  { label: 'Revenue', value: '$48,200', change: '+8%', up: true },
  { label: 'Error Rate', value: '0.4%', change: '-2%', up: false },
]

const activity = [
  { user: 'Alice Chen', action: 'Deployed v1.0.1 to production', time: '2m ago' },
  { user: 'Bob Smith', action: 'Updated API configuration', time: '15m ago' },
  { user: 'Carol Wang', action: 'Created new service endpoint', time: '1h ago' },
  { user: 'David Lee', action: 'Resolved incident #204', time: '3h ago' },
  { user: 'Eva Park', action: 'Merged pull request #87', time: '5h ago' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center font-bold text-sm">X</div>
          <span className="font-semibold text-lg tracking-tight">xuyang.dev</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-slate-400">
          <a href="#" className="text-white font-medium">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors">Settings</a>
          <button
            onClick={() => navigate('/')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-1.5 text-sm transition-all"
          >
            ← Back
          </button>
        </nav>
      </header>

      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Welcome back — here's what's happening.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-slate-400 text-xs mb-2">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className={`text-xs mt-1 font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Activity feed */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              {activity.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0">
                    {item.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.user}</p>
                    <p className="text-xs text-slate-400 truncate">{item.action}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick status */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold mb-4">System Status</h2>
            <ul className="space-y-3">
              {[
                { name: 'API', status: 'Operational' },
                { name: 'Database', status: 'Operational' },
                { name: 'CDN', status: 'Operational' },
                { name: 'Auth', status: 'Degraded' },
              ].map((svc) => (
                <li key={svc.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{svc.name}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${svc.status === 'Operational' ? 'text-green-400' : 'text-yellow-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${svc.status === 'Operational' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                    {svc.status}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-2">API Uptime</p>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '99.8%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">99.8% last 30 days</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-600 py-6 border-t border-white/5">
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
      </footer>
    </div>
  )
}
