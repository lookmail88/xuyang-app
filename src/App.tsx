import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(30)

  const checkApi = () => {
    fetch('https://api-dev.xuyang.dev/xuyang-api/health')
      .then((res) => res.text())
      .then((data) => {
        setResponse(data)
        setError(null)
        setLoading(false)
        setCountdown(30)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
        setCountdown(30)
      })
  }

  useEffect(() => {
    checkApi()
    const interval = setInterval(checkApi, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (loading) return
    const tick = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0))
    }, 1000)
    return () => clearInterval(tick)
  }, [loading, response, error])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F4F4', color: '#061122' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm text-black" style={{ backgroundColor: '#FFD100' }}>X</div>
          <span className="font-semibold text-lg tracking-tight" style={{ color: '#061122' }}>xuyang.dev</span>
        </div>
        <nav className="flex gap-6 text-sm" style={{ color: '#061122' }}>
          <a href="#" className="hover:opacity-70 transition-opacity">Docs</a>
          <a href="#" className="hover:opacity-70 transition-opacity">GitHub</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-start gap-2 rounded-sm px-4 py-2 text-sm mb-8 border" style={{ backgroundColor: 'rgba(255,209,0,0.15)', borderColor: '#FFD100', color: '#061122' }}>
          <span className={`w-2 h-2 rounded-full animate-pulse mt-1 shrink-0 ${loading ? 'bg-yellow-400' : error ? 'bg-red-500' : 'bg-green-500'}`}></span>
          <div className="flex flex-col">
            <span>{loading ? 'Checking API…' : error ? 'API Unreachable' : 'API Connected'}</span>
            {!loading && <span className="text-xs opacity-60">Next check in {countdown}s</span>}
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6" style={{ color: '#061122' }}>
          Welcome to<br />Xuyang App
        </h1>


        <div className="flex gap-4 flex-wrap justify-center mb-20">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 rounded-sm px-8 py-3 text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: '#FFD100', color: '#061122' }}
          >
            Dashboard
          </button>
        </div>

        {/* API Response */}
        <div className="w-full max-w-2xl">
          <div className="border rounded-sm overflow-hidden" style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: '#E0E0E0', backgroundColor: '#F4F4F4' }}>
              <span className="text-xs font-mono" style={{ color: '#054ADA' }}>GET</span>
              <span className="text-xs font-mono flex-1 truncate" style={{ color: '#061122' }}>https://api-dev.xuyang.dev/xuyang-api/health</span>
              <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
                loading ? 'bg-yellow-100 text-yellow-700' :
                error ? 'bg-red-100 text-red-600' :
                'bg-green-100 text-green-700'
              }`}>
                {loading ? 'loading…' : error ? 'error' : '200 OK'}
              </span>
            </div>
            <div className="px-5 py-6 font-mono text-sm text-left min-h-[80px] flex items-center">
              {loading && (
                <div className="flex items-center gap-3" style={{ color: '#054ADA' }}>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Fetching response…
                </div>
              )}
              {error && <span className="text-red-500">{error}</span>}
              {!loading && !error && <span style={{ color: '#061122' }}>{response}</span>}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs py-6 border-t border-gray-200" style={{ color: '#054ADA' }}>
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
      </footer>
    </div>
  )
}

export default App
