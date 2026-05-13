import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './api'
import { colors } from './theme'

const FONT = '-apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'
const BLUE = '#0071e3'
const NEAR_BLACK = '#1d1d1f'
const LIGHT = '#f5f5f7'

const NAV: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 22px',
  backgroundColor: 'rgba(0,0,0,0.8)',
  backdropFilter: 'saturate(180%) blur(20px)',
  WebkitBackdropFilter: 'saturate(180%) blur(20px)',
}

// ── Section wrappers ──────────────────────────────────────────────
const lightSection: React.CSSProperties = {
  backgroundColor: LIGHT,
  padding: '100px 24px',
}

const darkSection: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '100px 24px',
}

const container: React.CSSProperties = {
  maxWidth: '980px',
  margin: '0 auto',
}

// ── Typography ────────────────────────────────────────────────────
function SectionHeading({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2
      style={{
        fontSize: '40px',
        fontWeight: 600,
        lineHeight: 1.10,
        letterSpacing: '-0.28px',
        color: dark ? '#ffffff' : NEAR_BLACK,
        marginBottom: '12px',
        textAlign: 'center',
      }}
    >
      {children}
    </h2>
  )
}

function SectionSub({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      style={{
        fontSize: '17px',
        fontWeight: 400,
        lineHeight: 1.47,
        letterSpacing: '-0.374px',
        color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        marginBottom: '64px',
        textAlign: 'center',
      }}
    >
      {children}
    </p>
  )
}

// ── ArgoCD types & helpers ────────────────────────────────────────
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

function AppCell({ app }: { app: ArgoApp }) {
  const healthy = app.healthStatus === 'Healthy'
  const synced = app.syncStatus === 'Synced'
  return (
    <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', backgroundColor: LIGHT }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '980px',
            backgroundColor: healthy ? 'rgba(52,199,89,0.12)' : 'rgba(255,159,10,0.12)',
            color: healthy ? '#1a7f37' : '#9a6700',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: healthy ? '#34c759' : '#ff9f0a' }} />
          {app.healthStatus}
        </span>
      </div>
      <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#ffffff' }}>
        <div>
          <p style={{ fontSize: '11px', color: BLUE, marginBottom: '4px', fontWeight: 500 }}>Sync</p>
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '11px', fontWeight: 500, padding: '2px 10px', borderRadius: '980px',
              backgroundColor: synced ? 'rgba(0,113,227,0.10)' : 'rgba(255,159,10,0.12)',
              color: synced ? BLUE : '#9a6700',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: synced ? BLUE : '#ff9f0a' }} />
            {app.syncStatus}
          </span>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: BLUE, marginBottom: '4px', fontWeight: 500 }}>Deployed</p>
          <p style={{ fontSize: '11px', fontWeight: 600, color: NEAR_BLACK }}>{timeAgo(app.lastSyncTime)}</p>
        </div>
      </div>
    </div>
  )
}

// ── Service card (dark context) ───────────────────────────────────
function ServiceCard({ svc }: { svc: { icon: string; label: string; sub: string; bg: string; offline: boolean } }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        borderRadius: '8px', padding: '10px',
        backgroundColor: svc.offline ? '#1c1c1e' : '#272729',
      }}
    >
      <div
        style={{
          width: '30px', height: '30px', borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 900, flexShrink: 0, color: '#ffffff',
          backgroundColor: svc.bg, opacity: svc.offline ? 0.35 : 1,
        }}
      >
        {svc.icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: svc.offline ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.9)' }}>
          {svc.label}
        </p>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{svc.sub}</p>
      </div>
      {svc.offline && (
        <span style={{ fontSize: '10px', padding: '1px 8px', borderRadius: '980px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.2)' }}>
          offline
        </span>
      )}
    </div>
  )
}

// ── Connector (dark version) ──────────────────────────────────────
function Connector({ label, dot }: { label: string; dot: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
      <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 14px', borderRadius: '980px', fontSize: '11px',
          color: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: dot }} />
        {label}
      </div>
      <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
    </div>
  )
}

// ── TSLA Report types ─────────────────────────────────────────────
interface TslaReport {
  reportId: number
  symbol: string
  reportTimestamp: string
  trendSentiment: string
  summaryConclusion: string
  supportLevelPrimary: number
  supportLevelSecondary: number
  resistanceLevelPrimary: number
  resistanceLevelSecondary: number
  detailedAnalysis: string
  volumeObservation: string
  priceActionObservation: string
  riskLevel: string
}

// ── TSLA Report Modal ─────────────────────────────────────────────
function TslaReportModal({ onClose, report, loading, error, generating, onGenerate, version }: {
  onClose: () => void
  report: TslaReport | null
  loading: boolean
  error: string | null
  generating: boolean
  onGenerate: () => void
  version: string | null
}) {
  const bullish = report?.trendSentiment?.toLowerCase().includes('bullish')
  const sentimentColor = bullish ? '#34c759' : '#ff453a'
  const busy = loading || generating

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '680px', maxHeight: '85vh',
          overflowY: 'auto', borderRadius: '16px',
          backgroundColor: '#1c1c1e', fontFamily: FONT,
          boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', backgroundColor: '#1c1c1e', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: colors.tesla, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', color: '#fff' }}>T</div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>TSLA Latest Report</p>
              {version && <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}>{version}</span>}
              {generating && <p style={{ fontSize: '11px', color: 'rgba(255,165,0,0.7)', fontFamily: 'monospace' }}>Generating new report…</p>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onGenerate}
              disabled={busy}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', padding: '5px 14px',
                borderRadius: '980px', border: '1px solid rgba(255,255,255,0.2)',
                color: busy ? 'rgba(255,255,255,0.3)' : '#ffffff',
                backgroundColor: busy ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                cursor: busy ? 'not-allowed' : 'pointer', fontFamily: FONT,
                transition: 'opacity .15s',
              }}
            >
              <svg className={generating ? 'animate-spin' : ''} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {generating ? 'Generating…' : 'Refresh'}
            </button>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', color: '#ffffff', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>×</button>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {(loading || generating) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.4)', fontSize: '14px', padding: '40px 0', justifyContent: 'center' }}>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {generating ? 'Generating new report, this may take a moment…' : 'Loading report…'}
            </div>
          )}

          {error && <p style={{ color: '#ff453a', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>Failed to load: {error}</p>}

          {report && !loading && !generating && (
            <>
              {/* Report Created */}
              <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>Report Created: {new Date(report.reportTimestamp).toLocaleString()}</p>

              {/* Sentiment + Risk */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <div style={{ borderRadius: '10px', padding: '14px 16px', backgroundColor: '#272729' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', fontWeight: 500 }}>Sentiment</p>
                  {report.trendSentiment.split('|').map(s => s.trim()).filter(Boolean).map((s, i) => (
                    <p key={i} style={{ fontSize: i === 0 ? '13px' : '12px', fontWeight: 700, color: i === 0 ? sentimentColor : 'rgba(255,255,255,0.45)', marginTop: i === 0 ? 0 : '3px' }}>{s}</p>
                  ))}
                </div>
                <div style={{ borderRadius: '10px', padding: '14px 16px', backgroundColor: '#272729' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', fontWeight: 500 }}>Risk Level</p>
                  {report.riskLevel.split('|').map(s => s.trim()).filter(Boolean).map((s, i) => (
                    <p key={i} style={{ fontSize: i === 0 ? '13px' : '12px', fontWeight: 700, color: i === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)', marginTop: i === 0 ? 0 : '3px' }}>{s}</p>
                  ))}
                </div>
              </div>

              {/* Price Levels */}
              <div style={{ borderRadius: '10px', padding: '16px', backgroundColor: '#272729', marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>Price Levels</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
                  {[
                    { label: 'Support 1', value: report.supportLevelPrimary, color: '#34c759' },
                    { label: 'Support 2', value: report.supportLevelSecondary, color: '#30d158' },
                    { label: 'Resistance 1', value: report.resistanceLevelPrimary, color: '#ff453a' },
                    { label: 'Resistance 2', value: report.resistanceLevelSecondary, color: '#ff6961' },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>{label}</p>
                      <p style={{ fontSize: '15px', fontWeight: 700, color, fontFamily: 'monospace' }}>${value.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div style={{ borderRadius: '10px', padding: '16px', backgroundColor: '#272729', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Summary</p>
                {report.summaryConclusion.split('|').map(s => s.trim()).filter(Boolean).map((s, i) => (
                  <p key={i} style={{ fontSize: '13px', lineHeight: 1.6, color: i === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)', marginTop: i === 0 ? 0 : '8px' }}>{s}</p>
                ))}
              </div>

              {/* Volume & Price Action */}
              {[
                { title: 'Volume Observation', text: report.volumeObservation },
                { title: 'Price Action', text: report.priceActionObservation },
              ].map(({ title, text }) => (
                <div key={title} style={{ borderRadius: '10px', padding: '16px', backgroundColor: '#272729', marginBottom: '12px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>{title}</p>
                  {text.split('|').map(s => s.trim()).filter(Boolean).map((s, i) => (
                    <p key={i} style={{ fontSize: '13px', lineHeight: 1.6, color: i === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)', marginTop: i === 0 ? 0 : '8px' }}>{s}</p>
                  ))}
                </div>
              ))}

              {/* Detailed Analysis */}
              <div style={{ borderRadius: '10px', padding: '16px', backgroundColor: '#272729', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Detailed Analysis</p>
                {report.detailedAnalysis.split('\n\n').map(s => s.trim()).filter(Boolean).map((s, i) => (
                  <p key={i} style={{ fontSize: '13px', lineHeight: 1.7, color: i % 2 === 0 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)', marginTop: i === 0 ? 0 : '12px', whiteSpace: 'pre-line' }}>{s}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()
  const [argoApps, setArgoApps] = useState<ArgoApp[]>([])
  const [argoLoading, setArgoLoading] = useState(true)
  const [argoError, setArgoError] = useState<string | null>(null)
  const [tslaModalOpen, setTslaModalOpen] = useState(false)
  const [tslaReport, setTslaReport] = useState<TslaReport | null>(null)
  const [tslaLoading, setTslaLoading] = useState(false)
  const [tslaError, setTslaError] = useState<string | null>(null)
  const [tslaGenerating, setTslaGenerating] = useState(false)
  const [tslaVersion, setTslaVersion] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api-dev.xuyang.dev/xg-tsla-svc/version')
      .then((res) => res.text())
      .then((data) => setTslaVersion(data.trim()))
      .catch(() => {})
  }, [])

  const fetchLatestTslaReport = () => {
    setTslaLoading(true)
    setTslaError(null)
    fetch('https://api-dev.xuyang.dev/xg-tsla-svc/report/getLatest')
      .then((res) => res.json())
      .then((data) => { setTslaReport(data); setTslaLoading(false) })
      .catch((err) => { setTslaError(err.message); setTslaLoading(false) })
  }

  const openTslaReport = () => {
    setTslaModalOpen(true)
    if (tslaReport) return
    fetchLatestTslaReport()
  }

  const generateTslaReport = () => {
    setTslaGenerating(true)
    setTslaReport(null)
    fetch('https://api-dev.xuyang.dev/xg-tsla-svc/report/generateNew', { method: 'POST' })
      .then(() => fetchLatestTslaReport())
      .catch((err) => { setTslaError(err.message); setTslaLoading(false) })
      .finally(() => setTslaGenerating(false))
  }

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
    { icon: 'X', label: 'xuyang-app',  sub: 'dev.xuyang.dev',       bg: BLUE,          offline: false },
    { icon: 'A', label: 'xuyang-api',  sub: 'api-dev.xuyang.dev',   bg: colors.success, offline: false },
    { icon: 'M', label: 'MySQL',        sub: 'Database',              bg: colors.mysql,  offline: false },
    { icon: 'K', label: 'Kafka',        sub: 'Message System',        bg: colors.kafka,  offline: false },
    { icon: 'T', label: 'xg-tsla-svc', sub: 'Tesla Stock Analysis',  bg: colors.tesla,  offline: true  },
  ]
  const prodServices = [
    { icon: 'X', label: 'xuyang-app',  sub: 'www.xuyang.dev',       bg: BLUE,           offline: false },
    { icon: 'A', label: 'xuyang-api',  sub: 'api.xuyang.dev',       bg: colors.prod,    offline: false },
    { icon: 'M', label: 'MySQL',        sub: 'Database',              bg: colors.mysql,  offline: false },
    { icon: 'K', label: 'Kafka',        sub: 'Message System',        bg: colors.kafka,  offline: false },
    { icon: 'T', label: 'xg-tsla-svc', sub: 'Tesla Stock Analysis',  bg: colors.tesla,  offline: true  },
  ]

  return (
    <div style={{ fontFamily: FONT }}>
      {tslaModalOpen && (
        <TslaReportModal
          onClose={() => setTslaModalOpen(false)}
          report={tslaReport}
          loading={tslaLoading}
          error={tslaError}
          generating={tslaGenerating}
          onGenerate={generateTslaReport}
          version={tslaVersion}
        />
      )}

      {/* ── Sticky Glass Nav ── */}
      <header style={NAV}>
        <span style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.374px', color: '#ffffff' }}>
          xuyang.dev
        </span>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: BLUE }}>Dashboard</span>
          <a href="#" style={{ fontSize: '12px', color: '#ffffff', opacity: 0.7, textDecoration: 'none' }}>Settings</a>
          <button
            onClick={() => navigate('/')}
            style={{
              fontSize: '12px', color: '#ffffff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: '8px',
              padding: '5px 14px', cursor: 'pointer', fontFamily: FONT,
            }}
          >
            ← Back
          </button>
        </nav>
      </header>

      {/* ══ SECTION 1 — Light: Title + App Status ══ */}
      <section style={lightSection}>
        <div style={container}>
          {/* Title */}
          <SectionHeading>Dashboard</SectionHeading>
          <SectionSub>Welcome back — here's what's happening across your infrastructure.</SectionSub>

          {/* Refresh button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button
              onClick={fetchArgoApps}
              disabled={argoLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', padding: '5px 14px',
                borderRadius: '980px', border: `1px solid ${BLUE}`,
                color: BLUE, backgroundColor: 'transparent',
                cursor: argoLoading ? 'wait' : 'pointer',
                opacity: argoLoading ? 0.5 : 1, fontFamily: FONT,
              }}
            >
              <svg className={argoLoading ? 'animate-spin' : ''} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh
            </button>
          </div>

          {/* Loading state */}
          {argoLoading && (
            <div style={{ borderRadius: '12px', padding: '28px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(0,0,0,0.35)', boxShadow: 'rgba(0,0,0,0.08) 0px 2px 12px' }}>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading apps…
            </div>
          )}

          {/* Error state */}
          {argoError && (
            <div style={{ borderRadius: '12px', padding: '20px', backgroundColor: '#ffffff', fontSize: '14px', color: '#dc2626', boxShadow: 'rgba(0,0,0,0.08) 0px 2px 12px' }}>
              Failed to load: {argoError}
            </div>
          )}

          {/* App cards grid */}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '16px' }}>
                {Object.entries(grouped).map(([name, apps]) => (
                  <div key={name} style={{ borderRadius: '12px', backgroundColor: '#ffffff', overflow: 'hidden', boxShadow: 'rgba(0,0,0,0.10) 0px 2px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#ffffff', backgroundColor: BLUE, flexShrink: 0 }}>
                        {name[0].toUpperCase()}
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: NEAR_BLACK, letterSpacing: '-0.224px' }}>{name}</p>
                    </div>
                    <div style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                      {apps.map(app => <AppCell key={app.namespace} app={app} />)}
                    </div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* ══ SECTION 2 — Dark: Infrastructure ══ */}
      <section style={darkSection}>
        <div style={container}>
          <SectionHeading dark>Infrastructure</SectionHeading>
          <SectionSub dark>k3s cluster, GitOps pipeline, and AI services running on xgao-env.</SectionSub>

          {/* GitHub Repos */}
          <div
            style={{
              borderRadius: '12px',
              backgroundColor: '#1c1c1e',
              padding: '24px',
              marginBottom: '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: colors.github, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff' }}>G</div>
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>GitHub Repositories</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { tag: 'DEV', branch: 'development', tagBg: BLUE },
                { tag: 'PROD', branch: 'master', tagBg: colors.prod },
              ].map(({ tag, branch, tagBg }) => (
                <div key={tag} style={{ borderRadius: '8px', padding: '16px', backgroundColor: '#272729' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '980px', backgroundColor: tagBg, color: '#ffffff' }}>{tag}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>branch: {branch}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>GitHub Actions → build &amp; push image → GHCR</p>
                </div>
              ))}
            </div>
          </div>

          <Connector label="ArgoCD GitOps sync" dot={colors.argocd} />

          {/* k3s Cluster */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1c1c1e', marginBottom: '0' }}>
            <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111111' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34c759' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>k3s Cluster</span>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>VM: xgao-env</span>
            </div>
            <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>

              {/* infra namespace */}
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: colors.infra }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>namespace: infra</span>
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#272729' }}>
                  {[
                    { icon: 'T', label: 'Traefik', sub: 'Ingress Controller', bg: colors.traefik },
                    { icon: 'A', label: 'ArgoCD',  sub: 'GitOps Operator',    bg: colors.argocd },
                  ].map(svc => (
                    <ServiceCard key={svc.label} svc={{ ...svc, offline: false }} />
                  ))}
                </div>
              </div>

              {/* xgao-dev */}
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: BLUE }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>namespace: xgao-dev</span>
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#272729' }}>
                  {devServices.map(svc => <ServiceCard key={svc.label + 'd'} svc={svc} />)}
                </div>
              </div>

              {/* xgao-prod */}
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: colors.prod }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>namespace: xgao-prod</span>
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#272729' }}>
                  {prodServices.map(svc => <ServiceCard key={svc.label + 'p'} svc={svc} />)}
                </div>
              </div>

            </div>
          </div>

          {/* AI VMs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            {[
              { title: 'Agent Services', vm: 'VM: xgao-Agent', headerBg: colors.openClaw, icon: 'OC', iconBg: colors.openClaw, label: 'OpenClaw', sub: 'AI Agent — orchestrates all modules' },
              { title: 'AI Engine',       vm: 'VM: xgao-AI',    headerBg: colors.ollama,   icon: 'O',  iconBg: colors.ollama,   label: 'Ollama',   sub: 'Local LLM inference engine' },
            ].map(({ title, vm, headerBg, icon, iconBg, label, sub }) => (
              <div key={title} style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1c1c1e' }}>
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: headerBg }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{title}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{vm}</span>
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#272729', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, backgroundColor: iconBg, color: '#ffffff', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{label}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{sub}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Connector label="DNS / CDN" dot={colors.cloudflare} />

          {/* Cloudflare */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1c1c1e' }}>
            <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: colors.cloudflare }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cloudflare</span>
            </div>
            <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
              {[
                { domain: 'dev.xuyang.dev',     desc: 'UI · Dev',  tag: 'DEV',  tagBg: BLUE },
                { domain: 'api-dev.xuyang.dev', desc: 'API · Dev', tag: 'DEV',  tagBg: BLUE },
                { domain: 'www.xuyang.dev',     desc: 'UI · Prod', tag: 'PROD', tagBg: colors.prod },
                { domain: 'api.xuyang.dev',     desc: 'API · Prod',tag: 'PROD', tagBg: colors.prod },
              ].map((entry) => (
                <div key={entry.domain} style={{ backgroundColor: '#272729', borderRadius: '8px', padding: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 8px', borderRadius: '980px', backgroundColor: entry.tagBg, color: '#ffffff', display: 'inline-block', marginBottom: '6px' }}>
                    {entry.tag}
                  </span>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '2px' }}>{entry.domain}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{entry.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══ SECTION 3 — Light: Projects ══ */}
      <section style={lightSection}>
        <div style={container}>
          <SectionHeading>Projects</SectionHeading>
          <SectionSub>Active research and development efforts.</SectionSub>

          {/* Tesla Stock Analysis */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: 'rgba(0,0,0,0.10) 0px 2px 16px', marginBottom: '16px' }}>
            <div style={{ height: '3px', backgroundColor: BLUE }} />
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px', color: '#ffffff', backgroundColor: colors.tesla, flexShrink: 0 }}>T</div>
                  <div>
                    <button
                      onClick={openTslaReport}
                      style={{ fontSize: '17px', fontWeight: 700, color: NEAR_BLACK, letterSpacing: '-0.374px', marginBottom: '3px', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >Tesla Stock Analysis ↗</button>
                    {tslaVersion && (
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(0,0,0,0.35)', display: 'block', marginBottom: '5px' }}>{tslaVersion}</span>
                    )}
                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', letterSpacing: '-0.224px' }}>
                      AI-powered TSLA analysis — trend detection, sentiment analysis, and price prediction.
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '980px', backgroundColor: 'rgba(0,113,227,0.10)', color: BLUE, fontWeight: 500, flexShrink: 0 }}>Active</span>
              </div>

              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: '10px' }}>Modules</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '20px' }}>
                {[
                  { icon: '📡', label: 'Real-Time Data' },
                  { icon: '📊', label: 'Technical Analysis' },
                  { icon: '📋', label: 'Fundamental Analysis' },
                  { icon: '🗞️', label: 'Market Information' },
                  { icon: '🔍', label: 'Screener' },
                  { icon: '🧪', label: 'Mock System' },
                  { icon: '💸', label: 'Money Flow Analysis' },
                ].map((mod) => (
                  <div key={mod.label} style={{ display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '8px', padding: '9px 10px', backgroundColor: LIGHT }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{mod.icon}</span>
                    <p style={{ fontSize: '11px', fontWeight: 500, color: NEAR_BLACK }}>{mod.label}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['OpenClaw', 'Ollama', 'xuyang-api', 'Kafka', 'MySQL'].map((tag) => (
                  <span key={tag} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '980px', backgroundColor: LIGHT, color: 'rgba(0,0,0,0.6)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Placeholder cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  border: '1px dashed rgba(0,0,0,0.15)',
                  backgroundColor: '#ffffff',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '52px 24px', textAlign: 'center',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: '22px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.25)' }}>Coming Soon</p>
                <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.18)', marginTop: '4px' }}>New project</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Dark Footer ══ */}
      <footer
        style={{
          backgroundColor: '#000000',
          textAlign: 'center',
          padding: '32px 24px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '-0.12px',
        }}
      >
        © {new Date().getFullYear()} xuyang.dev — Built with React &amp; Vite
        <span style={{ marginLeft: '8px', opacity: 0.5 }}>v{__APP_VERSION__}</span>
      </footer>

    </div>
  )
}
