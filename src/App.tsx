import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StarField from './StarField'
import { API } from './api'
import { useVersion } from './useVersion'
import { colors } from './theme'
import './App.css'

function App() {
  const navigate = useNavigate()
  const version = useVersion()
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(30)
  const [lastRefresh, setLastRefresh] = useState<string | null>(null)

  const checkApi = (isInitial = false) => {
    if (isInitial) setLoading(true)
    else setRefreshing(true)
    fetch(API.health)
      .then((res) => res.text())
      .then((data) => {
        setResponse(data)
        setError(null)
        setLoading(false)
        setRefreshing(false)
        setCountdown(30)
        setLastRefresh(new Date().toLocaleTimeString())
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
        setRefreshing(false)
        setCountdown(30)
        setLastRefresh(new Date().toLocaleTimeString())
      })
  }

  useEffect(() => {
    checkApi(true)
    const interval = setInterval(() => checkApi(false), 30000)
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
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: colors.bgDark, color: colors.bgWhite }}>
      <StarField />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/10" style={{ backgroundColor: 'rgba(5,6,15,0.7)', backdropFilter: 'blur(8px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm text-black" style={{ backgroundColor: colors.accent }}>X</div>
          <span className="font-semibold text-lg tracking-tight text-white">xuyang.dev</span>
        </div>
        <nav className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Xigi</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-start gap-2 rounded-sm px-4 py-2 text-sm mb-8 border" style={{ backgroundColor: 'rgba(255,209,0,0.1)', borderColor: 'rgba(255,209,0,0.4)', color: colors.accent }}>
          <span className={`w-2 h-2 rounded-full animate-pulse mt-1 shrink-0 ${loading ? 'bg-yellow-400' : error ? 'bg-red-500' : 'bg-green-500'}`}></span>
          <div className="flex flex-col text-left">
            <span>{loading ? 'Checking API…' : error ? 'API Unreachable' : `API Connected${version ? ` — ${version}` : ''}`}</span>
            {!loading && lastRefresh && <span className="text-xs opacity-60">Last Check: {lastRefresh}</span>}
            {!loading && <span className="text-xs opacity-60">Next check in {countdown}s</span>}
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-white text-center">
          Welcome to<br />Xuyang's Space
        </h1>

        <div className="flex gap-4 flex-wrap justify-center mb-20">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 rounded-sm px-8 py-3 text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: colors.primaryDark }}
          >
            Dashboard
          </button>
        </div>

        {/* API Response */}
        <div className="w-full max-w-2xl">
          <div className="border rounded-sm overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
              <span className="text-xs font-mono" style={{ color: colors.accent }}>GET</span>
              <span className="text-xs font-mono flex-1 truncate text-slate-400">{API.health}</span>
              <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
                loading ? 'bg-yellow-500/20 text-yellow-300' :
                error ? 'bg-red-500/20 text-red-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {loading ? 'loading…' : error ? 'error' : '200 OK'}
              </span>
              {!loading && (
                <button
                  onClick={() => checkApi(false)}
                  disabled={refreshing}
                  className="text-xs px-2 py-0.5 rounded-sm font-medium border border-white/20 text-slate-300 hover:bg-white/10 transition-all disabled:opacity-40" style={{ cursor: refreshing ? 'wait' : 'pointer' }}
                >
                  Check
                </button>
              )}
            </div>
            <div className="px-5 py-6 font-mono text-sm text-left min-h-[80px] flex items-center">
              {loading && (
                <div className="flex items-center gap-3 text-slate-400">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Fetching response…
                </div>
              )}
              {!loading && error && <span className="text-red-400">{error}</span>}
              {!loading && !error && (
                <span>
                  <span className="text-xs mr-2" style={{ color: colors.accent }}>RESPONSE:</span>
                  {refreshing
                    ? <span className="text-slate-400 text-xs">refreshing…</span>
                    : <span className="text-white">{response}</span>
                  }
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs py-6 border-t border-white/5 text-slate-600">
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
        <span className="ml-2 opacity-60">v{__APP_VERSION__}</span>
      </footer>
    </div>
  )
}

export default App
