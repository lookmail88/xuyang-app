import { useNavigate } from 'react-router-dom'

const FONT = '-apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'
const BLUE = '#0071e3'
const NEAR_BLACK = '#1d1d1f'

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

export default function Owner() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', backgroundColor: '#000000' }}>
      {/* ── Nav ── */}
      <header style={NAV}>
        <span
          onClick={() => navigate('/')}
          style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
        >
          Xuyang's Space
        </span>
        <span
          onClick={() => navigate('/')}
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}
        >
          ← Back
        </span>
      </header>

      {/* ── Hero with gradient ── */}
      <section
        style={{
          padding: '120px 24px 80px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <img
          src="/owner-avatar.jpg"
          alt="Xuyang Gao"
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 auto 32px',
            display: 'block',
            border: '3px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 60px rgba(0,113,227,0.3)',
            position: 'relative',
          }}
        />
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-1px',
            color: '#ffffff',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
          }}
        >
          Xuyang Gao
        </h1>
        <p
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '8px',
            letterSpacing: '0.5px',
          }}
        >
          Software Engineer
        </p>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '32px',
          }}
        >
          San Diego, California
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', position: 'relative' }}>
          <a
            href="https://www.linkedin.com/in/xuyang-gao-74b17152/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: BLUE,
              color: '#ffffff',
              padding: '12px 32px',
              borderRadius: '980px',
              fontSize: '16px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/lookmail88"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '12px 32px',
              borderRadius: '980px',
              fontSize: '16px',
              fontWeight: 500,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        style={{
          padding: '40px 24px',
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {[
            { num: '20+', label: 'Years in Java' },
            { num: '754', label: 'LinkedIn Followers' },
            { num: '∞', label: 'Lines of Code' },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Content cards ── */}
      <section style={{ padding: '80px 24px', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {[
            {
              icon: '💡',
              title: 'About',
              body: 'With over 20 years of experience in Java development, I bring deep expertise in enterprise software, the Spring ecosystem, and large-scale data processing. Currently at MedImpact Healthcare Systems in San Diego, working on mission-critical healthcare technology.',
            },
            {
              icon: '🚀',
              title: 'What I Do',
              body: 'Enterprise Java & Spring Boot backends, Spring Batch data pipelines processing millions of records, legacy system modernization (JDK upgrades, Maven migrations), and homelab infrastructure with Kubernetes, ArgoCD, and AI/ML workloads on local GPUs.',
            },
            {
              icon: '🎓',
              title: 'Education',
              body: 'East China University of Science and Technology (1992 – 1997), Shanghai, China.',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '40px',
                marginBottom: '20px',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(0,113,227,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{card.icon}</div>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                {card.title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: '#000000',
          textAlign: 'center',
          padding: '32px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        © {new Date().getFullYear()} xuyang.dev
      </footer>
    </div>
  )
}
