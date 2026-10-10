import { useNavigate } from 'react-router-dom'

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

export default function Owner() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', backgroundColor: LIGHT }}>
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

      {/* ── Hero ── */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <img
          src="/owner-avatar.jpg"
          alt="Xuyang Gao"
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 auto 24px',
            display: 'block',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        />
        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 52px)',
            fontWeight: 600,
            letterSpacing: '-0.5px',
            color: NEAR_BLACK,
            marginBottom: '12px',
          }}
        >
          Xuyang Gao
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(0,0,0,0.55)', marginBottom: '6px' }}>
          Software Engineer
        </p>
        <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.35)', marginBottom: '28px' }}>
          San Diego, California
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://www.linkedin.com/in/xuyang-gao-74b17152/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: BLUE,
              color: '#ffffff',
              padding: '10px 28px',
              borderRadius: '980px',
              fontSize: '16px',
              textDecoration: 'none',
            }}
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/lookmail88"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: BLUE,
              padding: '10px 28px',
              borderRadius: '980px',
              fontSize: '16px',
              textDecoration: 'none',
              border: `1px solid ${BLUE}`,
            }}
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '48px 24px', backgroundColor: LIGHT }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            textAlign: 'center',
          }}
        >
          {[
            { num: '20+', label: 'Years in Java' },
            { num: '754', label: 'LinkedIn Followers' },
            { num: '3', label: 'Active Projects' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '28px 16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 700, color: NEAR_BLACK, marginBottom: '6px' }}>
                {s.num}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cards ── */}
      <section style={{ padding: '0 24px 80px', backgroundColor: LIGHT }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              title: 'About',
              body: 'With over 20 years of experience in Java development, I bring deep expertise in enterprise software, the Spring ecosystem, and large-scale data processing. Currently at MedImpact Healthcare Systems in San Diego, working on mission-critical healthcare technology.',
            },
            {
              title: 'What I Do',
              body: 'Enterprise Java & Spring Boot backends, Spring Batch data pipelines, legacy system modernization, and homelab infrastructure with Kubernetes, ArgoCD, and local AI/ML workloads.',
            },
            {
              title: 'Education',
              body: 'East China University of Science and Technology (1992 – 1997), Shanghai, China.',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: NEAR_BLACK, marginBottom: '12px' }}>
                {card.title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(0,0,0,0.65)' }}>{card.body}</p>
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
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        © {new Date().getFullYear()} xuyang.dev
      </footer>
    </div>
  )
}
