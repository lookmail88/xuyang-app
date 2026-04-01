import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './api'

interface ArgoApp {
  name: string
  namespace: string
  syncStatus: string
  healthStatus: string
  lastSyncTime: string
}


function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [argoApps, setArgoApps] = useState<ArgoApp[]>([])
  const [argoLoading, setArgoLoading] = useState(true)
  const [argoError, setArgoError] = useState<string | null>(null)
  useEffect(() => {
    fetch(API.argoApps)
      .then((res) => res.json())
      .then((data) => {
        setArgoApps(data)
        setArgoLoading(false)
      })
      .catch((err) => {
        setArgoError(err.message)
        setArgoLoading(false)
      })
  }, [])

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

        {/* APP List */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: '#054ADA' }}>APP List</h2>
          {argoLoading && (
            <div className="border rounded-sm p-6 bg-white flex items-center gap-3 text-sm text-gray-400" style={{ borderColor: '#E0E0E0' }}>
              <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading apps…
            </div>
          )}
          {argoError && (
            <div className="border rounded-sm p-4 bg-white text-sm text-red-500" style={{ borderColor: '#E0E0E0' }}>
              Failed to load: {argoError}
            </div>
          )}
          {!argoLoading && !argoError && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {argoApps.map((app) => {
                const healthy = app.healthStatus === 'Healthy'
                const synced = app.syncStatus === 'Synced'
                return (
                  <div key={app.name} className="border rounded-sm bg-white overflow-hidden" style={{ borderColor: '#E0E0E0' }}>
                    {/* App header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: '#054ADA' }}>
                          {app.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#061122' }}>{app.name}</p>
                          <p className="text-xs" style={{ color: '#054ADA' }}>ns: {app.namespace}</p>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-sm ${healthy ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${healthy ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        {app.healthStatus}
                      </span>
                    </div>
                    {/* App details */}
                    <div className="px-5 py-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs mb-1" style={{ color: '#054ADA' }}>Sync Status</p>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-sm ${synced ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${synced ? 'bg-blue-500' : 'bg-orange-400'}`}></span>
                          {app.syncStatus}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs mb-1" style={{ color: '#054ADA' }}>Last Deployed</p>
                        <p className="text-xs font-medium" style={{ color: '#061122' }}>{timeAgo(app.lastSyncTime)}</p>
                        <p className="text-xs text-gray-400">{new Date(app.lastSyncTime).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* System Architecture */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: '#054ADA' }}>System Architecture</h2>
          <div className="rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)', border: '1px solid #dde6ff' }}>

            {/* GitHub Repos */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#24292e' }}>G</div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">GitHub Repositories</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-sm p-4 border-l-4" style={{ backgroundColor: 'rgba(5,74,218,0.06)', borderLeftColor: '#054ADA', border: '1px solid rgba(5,74,218,0.2)', borderLeft: '4px solid #054ADA' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#054ADA' }}>DEV</span>
                    <span className="text-xs font-semibold" style={{ color: '#061122' }}>branch: development</span>
                  </div>
                  <p className="text-xs text-gray-500">GitHub Actions → build & push image → GHCR</p>
                </div>
                <div className="rounded-sm p-4" style={{ backgroundColor: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)', borderLeft: '4px solid #16a34a' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#16a34a' }}>PROD</span>
                    <span className="text-xs font-semibold" style={{ color: '#061122' }}>branch: master</span>
                  </div>
                  <p className="text-xs text-gray-500">GitHub Actions → build & push image → GHCR</p>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200 bg-white shadow-sm">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                ArgoCD GitOps sync
              </div>
              <div className="w-px h-4 bg-gray-300" />
            </div>

            {/* k3s Cluster */}
            <div className="px-6 pb-4">
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#c7d7ff', backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: '#061122' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">k3s Cluster</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">VM: xgao-env</span>
                </div>
                <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-3">

                  {/* infra */}
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#d1d5db' }}>
                    <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: '#374151' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span className="text-xs font-semibold text-white">namespace: infra</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: 'rgba(107,114,128,0.04)' }}>
                      <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border" style={{ borderColor: '#e5e7eb' }}>
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0" style={{ backgroundColor: '#FFD100', color: '#061122' }}>T</div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: '#061122' }}>Traefik</p>
                          <p className="text-xs text-gray-400">Ingress Controller</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border" style={{ borderColor: '#e5e7eb' }}>
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white" style={{ backgroundColor: '#ef4444' }}>A</div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: '#061122' }}>ArgoCD</p>
                          <p className="text-xs text-gray-400">GitOps Operator</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* xgao-dev */}
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#bfdbfe' }}>
                    <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: '#054ADA' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                      <span className="text-xs font-semibold text-white">namespace: xgao-dev</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: 'rgba(5,74,218,0.03)' }}>
                      {[
                        { icon: 'X', label: 'xuyang-app', sub: 'dev.xuyang.dev', bg: '#054ADA' },
                        { icon: 'A', label: 'xuyang-api', sub: 'api-dev.xuyang.dev', bg: '#16a34a' },
                        { icon: 'M', label: 'MySQL', sub: 'Database', bg: '#00758f' },
                        { icon: 'K', label: 'Kafka', sub: 'Message System', bg: '#231f20' },
                      ].map((svc) => (
                        <div key={svc.label} className="flex items-center gap-3 bg-white rounded-sm p-2.5 border" style={{ borderColor: '#e5e7eb' }}>
                          <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white" style={{ backgroundColor: svc.bg }}>{svc.icon}</div>
                          <div>
                            <p className="text-xs font-semibold" style={{ color: '#061122' }}>{svc.label}</p>
                            <p className="text-xs text-gray-400">{svc.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* xgao-prod */}
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#bbf7d0' }}>
                    <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: '#16a34a' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                      <span className="text-xs font-semibold text-white">namespace: xgao-prod</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: 'rgba(22,163,74,0.03)' }}>
                      {[
                        { icon: 'X', label: 'xuyang-app', sub: 'www.xuyang.dev', bg: '#054ADA' },
                        { icon: 'A', label: 'xuyang-api', sub: 'api.xuyang.dev', bg: '#16a34a' },
                        { icon: 'M', label: 'MySQL', sub: 'Database', bg: '#00758f' },
                        { icon: 'K', label: 'Kafka', sub: 'Message System', bg: '#231f20' },
                      ].map((svc) => (
                        <div key={svc.label} className="flex items-center gap-3 bg-white rounded-sm p-2.5 border" style={{ borderColor: '#e5e7eb' }}>
                          <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white" style={{ backgroundColor: svc.bg }}>{svc.icon}</div>
                          <div>
                            <p className="text-xs font-semibold" style={{ color: '#061122' }}>{svc.label}</p>
                            <p className="text-xs text-gray-400">{svc.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* xgao-AI VM */}
            <div className="px-6 pb-4">
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#e9d5ff' }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: '#7c3aed' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-300" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">AI Services</span>
                  </div>
                  <span className="text-xs text-purple-300 font-mono">VM: xgao-AI</span>
                </div>
                <div className="p-4 flex items-center gap-4" style={{ backgroundColor: 'rgba(124,58,237,0.03)' }}>
                  <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border flex-1" style={{ borderColor: '#e5e7eb' }}>
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white" style={{ backgroundColor: '#7c3aed' }}>O</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#061122' }}>Ollama</p>
                      <p className="text-xs text-gray-400">Local LLM inference engine</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-12 h-px bg-purple-300" />
                      <span style={{ color: '#7c3aed', fontSize: '9px' }}>AI features</span>
                    </div>
                    <span style={{ color: '#7c3aed' }}>→</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-white rounded-sm px-3 py-1.5 border" style={{ borderColor: '#bfdbfe' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                      <span className="text-xs font-medium" style={{ color: '#061122' }}>xuyang-api <span className="text-gray-400 font-normal">(xgao-dev)</span></span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-sm px-3 py-1.5 border" style={{ borderColor: '#bbf7d0' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                      <span className="text-xs font-medium" style={{ color: '#061122' }}>xuyang-api <span className="text-gray-400 font-normal">(xgao-prod)</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200 bg-white shadow-sm">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                DNS / CDN
              </div>
              <div className="w-px h-4 bg-gray-300" />
            </div>

            {/* Cloudflare */}
            <div className="px-6 pb-6">
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#fed7aa' }}>
                <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: '#f6821f' }}>
                  <div className="w-2 h-2 rounded-full bg-orange-200" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase">Cloudflare</span>
                </div>
                <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ backgroundColor: 'rgba(246,130,31,0.03)' }}>
                  {[
                    { domain: 'dev.xuyang.dev', desc: 'UI · Dev', tag: 'DEV', tagColor: '#054ADA' },
                    { domain: 'api-dev.xuyang.dev', desc: 'API · Dev', tag: 'DEV', tagColor: '#16a34a' },
                    { domain: 'www.xuyang.dev', desc: 'UI · Prod', tag: 'PROD', tagColor: '#054ADA' },
                    { domain: 'api.xuyang.dev', desc: 'API · Prod', tag: 'PROD', tagColor: '#16a34a' },
                  ].map((entry) => (
                    <div key={entry.domain} className="bg-white rounded-sm border p-3" style={{ borderColor: '#e5e7eb' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: entry.tagColor, fontSize: '9px' }}>{entry.tag}</span>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: '#061122' }}>{entry.domain}</p>
                      <p className="text-xs text-gray-400">{entry.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: '#054ADA' }}>Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Tesla Stock Analysis */}
            <div className="rounded-sm border overflow-hidden bg-white group hover:shadow-md transition-shadow" style={{ borderColor: '#E0E0E0' }}>
              <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #cc0000, #ff4444)' }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center text-white font-black text-sm shrink-0" style={{ background: 'linear-gradient(135deg, #cc0000, #ff4444)' }}>T</div>
                  <span className="text-xs px-2 py-0.5 rounded-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">Active</span>
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: '#061122' }}>Tesla Stock Analysis</p>
                <p className="text-xs text-gray-500 mb-4">AI-powered stock analysis using Ollama LLM — trend detection, sentiment analysis, and price prediction for TSLA.</p>
                <div className="flex flex-wrap gap-2">
                  {['Ollama', 'xuyang-api', 'Kafka', 'MySQL'].map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600 border border-gray-200">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder cards */}
            {[1, 2].map((i) => (
              <div key={i} className="rounded-sm border border-dashed bg-white flex flex-col items-center justify-center p-8 text-center" style={{ borderColor: '#d1d5db' }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-3" style={{ backgroundColor: '#f3f4f6' }}>
                  <span className="text-gray-400 text-lg font-light">+</span>
                </div>
                <p className="text-xs font-semibold text-gray-400">Coming Soon</p>
                <p className="text-xs text-gray-300 mt-1">New project</p>
              </div>
            ))}

          </div>
        </div>

      </main>

      <footer className="text-center text-xs py-6 border-t border-gray-200" style={{ color: '#054ADA' }}>
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
        <span className="ml-2 opacity-60">v{__APP_VERSION__}</span>
      </footer>
    </div>
  )
}
