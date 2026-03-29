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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F4F4', color: '#061122' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#FFD100', color: '#061122' }}>X</div>
          <span className="font-semibold text-lg tracking-tight" style={{ color: '#061122' }}>xuyang.dev</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="font-semibold" style={{ color: '#054ADA' }}>Dashboard</a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: '#061122' }}>Settings</a>
          <button
            onClick={() => navigate('/')}
            className="border rounded-sm px-4 py-1.5 text-sm transition-all hover:bg-gray-100"
            style={{ borderColor: '#E0E0E0', color: '#061122' }}
          >
            ← Back
          </button>
        </nav>
      </header>

      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Page title */}
        <div className="mb-8 border-l-4 pl-4" style={{ borderColor: '#FFD100' }}>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#061122' }}>Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: '#054ADA' }}>Welcome back — here's what's happening.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="border rounded-sm p-5 bg-white" style={{ borderColor: '#E0E0E0' }}>
              <p className="text-xs mb-2" style={{ color: '#054ADA' }}>{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight" style={{ color: '#061122' }}>{stat.value}</p>
              <p className={`text-xs mt-1 font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Activity feed */}
          <div className="lg:col-span-2 border rounded-sm p-6 bg-white" style={{ borderColor: '#E0E0E0' }}>
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: '#054ADA' }}>Recent Activity</h2>
            <ul className="space-y-4">
              {activity.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: '#054ADA' }}>
                    {item.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: '#061122' }}>{item.user}</p>
                    <p className="text-xs truncate" style={{ color: '#054ADA' }}>{item.action}</p>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: '#054ADA' }}>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* System status */}
          <div className="border rounded-sm p-6 bg-white" style={{ borderColor: '#E0E0E0' }}>
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: '#054ADA' }}>System Status</h2>
            <ul className="space-y-3">
              {[
                { name: 'API', status: 'Operational' },
                { name: 'Database', status: 'Operational' },
                { name: 'CDN', status: 'Operational' },
                { name: 'Auth', status: 'Degraded' },
              ].map((svc) => (
                <li key={svc.name} className="flex items-center justify-between text-sm">
                  <span style={{ color: '#061122' }}>{svc.name}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${svc.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${svc.status === 'Operational' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {svc.status}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs mb-2" style={{ color: '#054ADA' }}>API Uptime</p>
              <div className="w-full rounded-sm h-2 bg-gray-200">
                <div className="h-2 rounded-sm" style={{ width: '99.8%', backgroundColor: '#054ADA' }}></div>
              </div>
              <p className="text-xs mt-1" style={{ color: '#054ADA' }}>99.8% last 30 days</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs py-6 border-t border-gray-200" style={{ color: '#054ADA' }}>
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
      </footer>
    </div>
  )
}
