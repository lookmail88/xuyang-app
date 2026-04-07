import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './api'
import { colors } from './theme'

interface ArgoApp {
  name: string
  namespace: string
  syncStatus: string
  healthStatus: string
  lastSyncTime: string
}

function AppCell({ app }: { app: ArgoApp }) {
  const healthy = app.healthStatus === 'Healthy'
  const synced = app.syncStatus === 'Synced'
  return (
    <div className="flex-1 border rounded-sm overflow-hidden" style={{ borderColor: colors.borderLight }}>
      <div className="flex items-center px-4 py-2 border-b"
        style={{ borderColor: colors.borderLight, backgroundColor: colors.bgPage }}>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-sm ${healthy ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${healthy ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          {app.healthStatus}
        </span>
      </div>
      <div className="px-4 py-3 grid grid-cols-2 gap-3 bg-white">
        <div>
          <p className="text-xs mb-1" style={{ color: colors.primary }}>Sync</p>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-sm ${synced ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${synced ? 'bg-blue-500' : 'bg-orange-400'}`}></span>
            {app.syncStatus}
          </span>
        </div>
        <div>
          <p className="text-xs mb-1" style={{ color: colors.primary }}>Last Deployed</p>
          <p className="text-xs font-medium" style={{ color: colors.textPrimary }}>{timeAgo(app.lastSyncTime)}</p>
        </div>
      </div>
    </div>
  )
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

  const fetchArgoApps = () => {
    setArgoLoading(true)
    setArgoError(null)
    fetch(API.argoApps)
      .then((res) => res.json())
      .then((data) => { setArgoApps(data); setArgoLoading(false) })
      .catch((err) => { setArgoError(err.message); setArgoLoading(false) })
  }

  useEffect(() => { fetchArgoApps() }, [])

  const devServices = [
    { icon: 'X', label: 'xuyang-app', sub: 'dev.xuyang.dev', bg: colors.dev, offline: false },
    { icon: 'A', label: 'xuyang-api', sub: 'api-dev.xuyang.dev', bg: colors.success, offline: false },
    { icon: 'M', label: 'MySQL', sub: 'Database', bg: colors.mysql, offline: false },
    { icon: 'K', label: 'Kafka', sub: 'Message System', bg: colors.kafka, offline: false },
    { icon: 'T', label: 'xg-tsla-svc', sub: 'Tesla Stock Analysis', bg: colors.tesla, offline: true },
  ]

  const prodServices = [
    { icon: 'X', label: 'xuyang-app', sub: 'www.xuyang.dev', bg: colors.dev, offline: false },
    { icon: 'A', label: 'xuyang-api', sub: 'api.xuyang.dev', bg: colors.prod, offline: false },
    { icon: 'M', label: 'MySQL', sub: 'Database', bg: colors.mysql, offline: false },
    { icon: 'K', label: 'Kafka', sub: 'Message System', bg: colors.kafka, offline: false },
    { icon: 'T', label: 'xg-tsla-svc', sub: 'Tesla Stock Analysis', bg: colors.tesla, offline: true },
  ]

  const ServiceCard = ({ svc }: { svc: typeof devServices[0] }) => (
    <div className={`flex items-center gap-3 rounded-sm p-2.5 border ${svc.offline ? 'border-dashed' : ''}`}
      style={{ borderColor: svc.offline ? colors.borderMedium : colors.borderLight, backgroundColor: svc.offline ? colors.bgOffline : colors.bgWhite }}>
      <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white"
        style={{ backgroundColor: svc.bg, opacity: svc.offline ? 0.45 : 1 }}>{svc.icon}</div>
      <div className="flex-1">
        <p className="text-xs font-semibold" style={{ color: svc.offline ? colors.textMuted : colors.textPrimary }}>{svc.label}</p>
        <p className="text-xs text-gray-400">{svc.sub}</p>
      </div>
      {svc.offline && <span className="text-xs px-1.5 py-0.5 rounded-sm border border-dashed text-gray-400"
        style={{ borderColor: colors.borderMedium, fontSize: '9px' }}>offline</span>}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bgPage, color: colors.textPrimary }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: colors.accent, color: colors.textPrimary }}>X</div>
          <span className="font-semibold text-lg tracking-tight" style={{ color: colors.textPrimary }}>xuyang.dev</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="font-semibold" style={{ color: colors.primary }}>Dashboard</a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: colors.textPrimary }}>Settings</a>
          <button onClick={() => navigate('/')}
            className="border rounded-sm px-4 py-1.5 text-sm transition-all hover:bg-gray-100"
            style={{ borderColor: colors.borderLight, color: colors.textPrimary }}>← Back</button>
        </nav>
      </header>

      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Page title */}
        <div className="mb-8 border-l-4 pl-4" style={{ borderColor: colors.accent }}>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: colors.textPrimary }}>Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: colors.primary }}>Welcome back — here's what's happening.</p>
        </div>

        {/* APP List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.primary }}>APP List</h2>
            <button onClick={fetchArgoApps} disabled={argoLoading}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-sm border transition-all hover:bg-gray-50 disabled:opacity-50"
              style={{ borderColor: colors.borderLight, color: colors.primary }}>
              <svg className={`w-3 h-3 ${argoLoading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>
          </div>
          {argoLoading && (
            <div className="border rounded-sm p-6 bg-white flex items-center gap-3 text-sm text-gray-400" style={{ borderColor: colors.borderLight }}>
              <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading apps…
            </div>
          )}
          {argoError && (
            <div className="border rounded-sm p-4 bg-white text-sm text-red-500" style={{ borderColor: colors.borderLight }}>
              Failed to load: {argoError}
            </div>
          )}
          {!argoLoading && !argoError && (() => {
            const sortOrder = (name: string) => name.startsWith('xg-') ? 1 : 0

            const grouped = argoApps
              .filter(app => !app.name.includes('infra'))
              .slice()
              .sort((a, b) => sortOrder(a.name) - sortOrder(b.name) || a.name.localeCompare(b.name))
              .reduce<Record<string, ArgoApp[]>>((acc, app) => {
                if (!acc[app.name]) acc[app.name] = []
                acc[app.name].push(app)
                return acc
              }, {})

            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(grouped).map(([name, apps]) => (
                  <div key={name} className="border rounded-sm bg-white overflow-hidden" style={{ borderColor: colors.borderLight }}>
                    <div className="flex items-center gap-3 px-5 py-3 border-b" style={{ borderColor: colors.borderLight }}>
                      <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: colors.primary }}>{name[0].toUpperCase()}</div>
                      <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{name}</p>
                    </div>
                    <div className="p-3 flex gap-3">
                      {apps.map(app => <AppCell key={app.namespace} app={app} />)}
                    </div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>

        {/* System Architecture */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: colors.primary }}>System Architecture</h2>
          <div className="rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)', border: '1px solid #dde6ff' }}>

            {/* GitHub Repos */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: colors.github }}>G</div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">GitHub Repositories</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-sm p-4" style={{ backgroundColor: 'rgba(5,74,218,0.06)', border: `1px solid rgba(5,74,218,0.2)`, borderLeft: `4px solid ${colors.dev}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm text-white" style={{ backgroundColor: colors.dev }}>DEV</span>
                    <span className="text-xs font-semibold" style={{ color: colors.textPrimary }}>branch: development</span>
                  </div>
                  <p className="text-xs text-gray-500">GitHub Actions → build & push image → GHCR</p>
                </div>
                <div className="rounded-sm p-4" style={{ backgroundColor: 'rgba(22,163,74,0.06)', border: `1px solid rgba(22,163,74,0.2)`, borderLeft: `4px solid ${colors.prod}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm text-white" style={{ backgroundColor: colors.prod }}>PROD</span>
                    <span className="text-xs font-semibold" style={{ color: colors.textPrimary }}>branch: master</span>
                  </div>
                  <p className="text-xs text-gray-500">GitHub Actions → build & push image → GHCR</p>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200 bg-white shadow-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.argocd }} />
                ArgoCD GitOps sync
              </div>
              <div className="w-px h-4 bg-gray-300" />
            </div>

            {/* k3s Cluster */}
            <div className="px-6 pb-4">
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: colors.borderCluster, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: colors.primaryDark }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">k3s Cluster</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">VM: xgao-env</span>
                </div>
                <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-3">

                  {/* infra */}
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: colors.borderMedium }}>
                    <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: colors.infra }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span className="text-xs font-semibold text-white">namespace: infra</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: 'rgba(107,114,128,0.04)' }}>
                      <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border" style={{ borderColor: colors.borderLight }}>
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0"
                          style={{ backgroundColor: colors.traefik, color: colors.textPrimary }}>T</div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: colors.textPrimary }}>Traefik</p>
                          <p className="text-xs text-gray-400">Ingress Controller</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border" style={{ borderColor: colors.borderLight }}>
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white"
                          style={{ backgroundColor: colors.argocd }}>A</div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: colors.textPrimary }}>ArgoCD</p>
                          <p className="text-xs text-gray-400">GitOps Operator</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* xgao-dev */}
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: colors.borderDev }}>
                    <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: colors.dev }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                      <span className="text-xs font-semibold text-white">namespace: xgao-dev</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: 'rgba(5,74,218,0.03)' }}>
                      {devServices.map((svc) => <ServiceCard key={svc.label} svc={svc} />)}
                    </div>
                  </div>

                  {/* xgao-prod */}
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: colors.borderProd }}>
                    <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: colors.prod }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                      <span className="text-xs font-semibold text-white">namespace: xgao-prod</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: 'rgba(22,163,74,0.03)' }}>
                      {prodServices.map((svc) => <ServiceCard key={svc.label} svc={svc} />)}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* AI VMs */}
            <div className="px-6 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-3">

              {/* xgao-Agent VM */}
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: colors.openClawBorder }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: colors.openClaw }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-300" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">Agent Services</span>
                  </div>
                  <span className="text-xs text-indigo-300 font-mono">VM: xgao-Agent</span>
                </div>
                <div className="p-4" style={{ backgroundColor: 'rgba(79,70,229,0.03)' }}>
                  <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border mb-3" style={{ borderColor: '#c7d2fe' }}>
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white"
                      style={{ backgroundColor: colors.openClaw }}>OC</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: colors.textPrimary }}>OpenClaw</p>
                      <p className="text-xs text-gray-400">AI Agent — orchestrates all modules</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* xgao-AI VM */}
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: colors.ollamaBorder }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: colors.ollama }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-300" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">AI Engine</span>
                  </div>
                  <span className="text-xs text-purple-300 font-mono">VM: xgao-AI</span>
                </div>
                <div className="p-4" style={{ backgroundColor: 'rgba(124,58,237,0.03)' }}>
                  <div className="flex items-center gap-3 bg-white rounded-sm p-2.5 border flex-1" style={{ borderColor: colors.borderLight }}>
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black shrink-0 text-white"
                      style={{ backgroundColor: colors.ollama }}>O</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: colors.textPrimary }}>Ollama</p>
                      <p className="text-xs text-gray-400">Local LLM inference engine</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Connector */}
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200 bg-white shadow-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.cloudflare }} />
                DNS / CDN
              </div>
              <div className="w-px h-4 bg-gray-300" />
            </div>

            {/* Cloudflare */}
            <div className="px-6 pb-6">
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: '#fed7aa' }}>
                <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: colors.cloudflare }}>
                  <div className="w-2 h-2 rounded-full bg-orange-200" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase">Cloudflare</span>
                </div>
                <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ backgroundColor: 'rgba(246,130,31,0.03)' }}>
                  {[
                    { domain: 'dev.xuyang.dev', desc: 'UI · Dev', tag: 'DEV', tagColor: colors.dev },
                    { domain: 'api-dev.xuyang.dev', desc: 'API · Dev', tag: 'DEV', tagColor: colors.dev },
                    { domain: 'www.xuyang.dev', desc: 'UI · Prod', tag: 'PROD', tagColor: colors.prod },
                    { domain: 'api.xuyang.dev', desc: 'API · Prod', tag: 'PROD', tagColor: colors.prod },
                  ].map((entry) => (
                    <div key={entry.domain} className="bg-white rounded-sm border p-3" style={{ borderColor: colors.borderLight }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-sm text-white"
                          style={{ backgroundColor: entry.tagColor, fontSize: '9px' }}>{entry.tag}</span>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: colors.textPrimary }}>{entry.domain}</p>
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
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: colors.primary }}>Projects</h2>
          <div className="flex flex-col gap-4">

            {/* Tesla Stock Analysis */}
            <div className="rounded-sm border overflow-hidden bg-white" style={{ borderColor: colors.borderLight }}>
              <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${colors.tesla}, ${colors.teslaLight})` }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center text-white font-black text-sm shrink-0"
                      style={{ background: `linear-gradient(135deg, ${colors.tesla}, ${colors.teslaLight})` }}>T</div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: colors.textPrimary }}>Tesla Stock Analysis</p>
                      <p className="text-xs font-mono mb-0.5" style={{ color: colors.primary }}>xg-tsla-svc</p>
                      <p className="text-xs text-gray-500">AI-powered TSLA analysis — trend detection, sentiment analysis, and price prediction.</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 shrink-0">Active</span>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: colors.primary }}>Modules</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      { icon: '📡', label: 'Real-Time Data' },
                      { icon: '📊', label: 'Technical Analysis' },
                      { icon: '📋', label: 'Fundamental Analysis' },
                      { icon: '🗞️', label: 'Market Information' },
                      { icon: '🔍', label: 'Screener' },
                      { icon: '🧪', label: 'Mock System' },
                      { icon: '💸', label: 'Money Flow Analysis' },
                    ].map((mod) => (
                      <div key={mod.label} className="flex items-center gap-2 rounded-sm px-2.5 py-2 border"
                        style={{ borderColor: colors.openClawBorder, backgroundColor: 'rgba(79,70,229,0.03)' }}>
                        <span className="text-sm shrink-0">{mod.icon}</span>
                        <p className="text-xs font-medium" style={{ color: colors.textPrimary }}>{mod.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['OpenClaw', 'Ollama', 'xuyang-api', 'Kafka', 'MySQL'].map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600 border border-gray-200">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-sm border border-dashed bg-white flex flex-col items-center justify-center p-8 text-center"
                  style={{ borderColor: colors.borderMedium }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-3" style={{ backgroundColor: '#f3f4f6' }}>
                    <span className="text-gray-400 text-lg font-light">+</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-400">Coming Soon</p>
                  <p className="text-xs text-gray-300 mt-1">New project</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </main>

      <footer className="text-center text-xs py-6 border-t border-gray-200" style={{ color: colors.primary }}>
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
        <span className="ml-2 opacity-60">v{__APP_VERSION__}</span>
      </footer>
    </div>
  )
}
