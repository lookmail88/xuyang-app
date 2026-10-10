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
    <div
      style={{
        fontFamily: FONT,
        minHeight: '100vh',
        backgroundColor: LIGHT,
      }}
    >
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
      <section
        style={{
          padding: '100px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: BLUE,
            color: '#ffffff',
            fontSize: '48px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          XG
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 600,
            letterSpacing: '-0.28px',
            color: NEAR_BLACK,
            marginBottom: '12px',
          }}
        >
          Xuyang Gao
        </h1>
        <p
          style={{
            fontSize: '21px',
            color: 'rgba(0,0,0,0.5)',
            marginBottom: '8px',
          }}
        >
          Software Engineer · San Diego, CA
        </p>
        <a
          href="https://www.linkedin.com/in/xuyang-gao-74b17152/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '17px',
            color: BLUE,
            textDecoration: 'none',
          }}
        >
          LinkedIn Profile ↗
        </a>
      </section>

      {/* ── About ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: NEAR_BLACK,
                marginBottom: '16px',
              }}
            >
              About
            </h2>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(0,0,0,0.7)' }}>
              With over 20 years of experience in Java development, Xuyang brings
              deep expertise in enterprise software, Spring ecosystem, and
              large-scale data processing. Currently at MedImpact Healthcare
              Systems in San Diego, he works on mission-critical healthcare
              technology serving millions.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: NEAR_BLACK,
                marginBottom: '16px',
              }}
            >
              Experience Highlights
            </h2>
            <ul style={{ fontSize: '16px', lineHeight: 2, color: 'rgba(0,0,0,0.7)', paddingLeft: '20px' }}>
              <li>Enterprise Java & Spring — 20+ years</li>
              <li>Healthcare systems at MedImpact</li>
              <li>Spring Batch data pipelines (ICAP project)</li>
              <li>Legacy modernization (JDK 1.6 → 1.8, Maven migration)</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: NEAR_BLACK,
                marginBottom: '16px',
              }}
            >
              Education
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(0,0,0,0.7)' }}>
              East China University of Science and Technology
              <br />
              <span style={{ color: 'rgba(0,0,0,0.4)' }}>1992 – 1997</span>
            </p>
          </div>
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
