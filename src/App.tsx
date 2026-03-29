import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api-dev.xuyang.dev/xuyang-api/sayhello')
      .then((res) => res.text())
      .then((data) => {
        setResponse(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center font-bold text-sm">X</div>
          <span className="font-semibold text-lg tracking-tight">xuyang.dev</span>
        </div>
        <nav className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-purple-300 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          API Connected
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Welcome to<br />Xuyang App
        </h1>

        <p className="text-slate-400 text-lg max-w-md mb-12">
          A modern, fast web application powered by React 19 and Vite 8.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-20">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 rounded-xl px-8 py-3 text-sm font-medium transition-all"
          >
            Dashboard
          </button>
        </div>

        {/* API Response */}
        <div className="w-full max-w-2xl">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/3">
              <span className="text-xs text-slate-400 font-mono">GET</span>
              <span className="text-xs text-slate-500 font-mono flex-1 truncate">https://api-dev.xuyang.dev/xuyang-api/sayhello</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                loading ? 'bg-yellow-500/20 text-yellow-300' :
                error ? 'bg-red-500/20 text-red-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {loading ? 'loading…' : error ? 'error' : '200 OK'}
              </span>
            </div>
            <div className="px-5 py-6 font-mono text-sm text-left min-h-[80px] flex items-center">
              {loading && (
                <div className="flex items-center gap-3 text-slate-500">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Fetching response…
                </div>
              )}
              {error && (
                <span className="text-red-400">{error}</span>
              )}
              {!loading && !error && (
                <span className="text-green-300">{response}</span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-600 py-6 border-t border-white/5">
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
      </footer>
    </div>
  )
}

export default App
