import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './api'
import { useVersion } from './useVersion'
import './App.css'

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

  const containerRef = useRef<HTMLDivElement>(null)
  const statusSectionRef = useRef<HTMLElement>(null)

  const scrollToStatus = () => {
    const container = containerRef.current
    const el = statusSectionRef.current
    if (!container || !el) return
    container.scrollTo({ top: el.offsetTop - 48, behavior: 'smooth' })
  }

  const statusColor = loading ? '#f59e0b' : error ? '#dc2626' : '#16a34a'
  const statusLabel = loading
    ? 'Checking API…'
    : error
    ? 'API Unreachable'
    : `API Connected${version ? ` — ${version}` : ''}`

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: FONT,
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollPaddingTop: '48px',
      }}
    >

      {/* ── Sticky Glass Nav ── */}
      <header style={NAV}>
        <span style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.374px', color: '#ffffff' }}>
          xuyang.dev
        </span>
        <nav style={{ display: 'flex', gap: '32px' }}>
          {[
            { label: 'Xigi', href: '#' },
            { label: 'GitHub', href: 'https://github.com/lookmail88/xuyang-app', external: true },
            { label: 'Contact', href: '#' },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              style={{ fontSize: '12px', color: '#ffffff', textDecoration: 'none', opacity: 0.8, transition: 'opacity .15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ══ SECTION 1 — Light Hero ══ */}
      <section
        style={{
          position: 'relative',
          scrollSnapAlign: 'start',
          backgroundColor: LIGHT,
          minHeight: 'calc(100vh - 48px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '100px 24px',
        }}
      >
        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '980px',
            padding: '6px 18px',
            marginBottom: '48px',
            backgroundColor: 'rgba(0,0,0,0.06)',
          }}
        >
          <span
            className={loading ? 'animate-pulse' : ''}
            style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, backgroundColor: statusColor }}
          />
          <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.7)', letterSpacing: '-0.224px' }}>
            {statusLabel}
          </span>
          {!loading && (
            <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)' }}>· {countdown}s</span>
          )}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 64px)',
            fontWeight: 600,
            lineHeight: 1.07,
            letterSpacing: '-0.28px',
            color: NEAR_BLACK,
            marginBottom: '18px',
          }}
        >
          Xuyang's Space
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: '21px',
            fontWeight: 400,
            lineHeight: 1.19,
            letterSpacing: '0.231px',
            color: 'rgba(0,0,0,0.5)',
            marginBottom: '52px',
          }}
        >
          Personal cloud infrastructure &amp; AI platform.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: BLUE,
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '17px',
              fontWeight: 400,
              letterSpacing: '-0.374px',
              border: '1px solid transparent',
              cursor: 'pointer',
              fontFamily: FONT,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0077ed')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BLUE)}
          >
            Dashboard
          </button>
          <a
            href="https://github.com/lookmail88/xuyang-app"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#0066cc',
              padding: '9px 24px',
              borderRadius: '980px',
              fontSize: '17px',
              fontWeight: 400,
              letterSpacing: '-0.374px',
              border: '1px solid #0066cc',
              textDecoration: 'none',
              transition: 'opacity .15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Learn more
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToStatus}
          aria-label="Scroll to System Status"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: 0.4,
            transition: 'opacity .2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: NEAR_BLACK, fontFamily: FONT }}>
            System Status
          </span>
          <svg
            className="animate-bounce"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={NEAR_BLACK}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </section>

      {/* ══ SECTION 2 — Dark: System Status ══ */}
      <section
        ref={statusSectionRef}
        style={{
          scrollSnapAlign: 'start',
          backgroundColor: '#000000',
          minHeight: '100vh',
          padding: '100px 24px',
          textAlign: 'center',
        }}
      >

        <h2
          style={{
            fontSize: '40px',
            fontWeight: 600,
            lineHeight: 1.10,
            letterSpacing: '-0.28px',
            color: '#ffffff',
            marginBottom: '12px',
          }}
        >
          System Status
        </h2>
        <p
          style={{
            fontSize: '17px',
            fontWeight: 400,
            lineHeight: 1.47,
            letterSpacing: '-0.374px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '60px',
          }}
        >
          Live health check against the xuyang-api backend.
        </p>

        {/* API Card — dark surface */}
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ backgroundColor: '#1c1c1e', borderRadius: '12px', overflow: 'hidden', boxShadow: 'rgba(0,0,0,0.4) 0px 4px 24px' }}>

            {/* Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                backgroundColor: '#111111',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#2997ff', fontFamily: 'monospace' }}>GET</span>
              <span
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'monospace',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {API.health}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 10px',
                  borderRadius: '980px',
                  fontWeight: 500,
                  backgroundColor: loading
                    ? 'rgba(245,158,11,0.15)'
                    : error
                    ? 'rgba(239,68,68,0.15)'
                    : 'rgba(52,199,89,0.15)',
                  color: loading ? '#fbbf24' : error ? '#f87171' : '#34d399',
                }}
              >
                {loading ? 'loading…' : error ? 'error' : '200 OK'}
              </span>
              {!loading && (
                <button
                  onClick={() => checkApi(false)}
                  disabled={refreshing}
                  style={{
                    fontSize: '12px',
                    padding: '3px 12px',
                    borderRadius: '980px',
                    border: '1px solid #2997ff',
                    color: '#2997ff',
                    backgroundColor: 'transparent',
                    cursor: refreshing ? 'wait' : 'pointer',
                    opacity: refreshing ? 0.4 : 1,
                    fontFamily: FONT,
                  }}
                >
                  Check
                </button>
              )}
            </div>

            {/* Response body */}
            <div
              style={{
                padding: '24px',
                fontFamily: 'monospace',
                fontSize: '14px',
                minHeight: '90px',
                display: 'flex',
                alignItems: 'center',
                color: '#ffffff',
              }}
            >
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.3)' }}>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Fetching response…
                </div>
              )}
              {!loading && error && <span style={{ color: '#f87171' }}>{error}</span>}
              {!loading && !error && (
                <span>
                  <span style={{ fontSize: '11px', color: '#2997ff', marginRight: '8px', fontWeight: 600 }}>RESPONSE:</span>
                  {refreshing
                    ? <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>refreshing…</span>
                    : <span>{response}</span>
                  }
                </span>
              )}
            </div>

            {/* Footer row */}
            {!loading && lastRefresh && (
              <div
                style={{
                  padding: '10px 24px',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '-0.12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Last check: {lastRefresh}</span>
                <span>Next in {countdown}s</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ Footer (continues dark) ══ */}
      <footer
        style={{
          backgroundColor: '#000000',
          textAlign: 'center',
          padding: '32px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
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

export default App
