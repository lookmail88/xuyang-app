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
            { num: '1M+', label: 'Lines of Code' },
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
          {/* About */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '0',
              marginBottom: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '6px',
                background: 'linear-gradient(90deg, #0071e3, #42a5f5)',
              }}
            />
            <div style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>👨‍💻</span>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: NEAR_BLACK, margin: 0 }}>
                  About
                </h2>
              </div>
              <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(0,0,0,0.7)', margin: 0 }}>
                With over <strong>20 years</strong> of experience in Java development, I bring
                deep expertise in enterprise software, the Spring ecosystem, and large-scale
                data processing. Currently at{' '}
                <strong>MedImpact Healthcare Systems</strong> in San Diego, working on
                mission-critical healthcare technology serving millions.
              </p>
            </div>
          </div>

          {/* What I Do */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '0',
              marginBottom: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '6px',
                background: 'linear-gradient(90deg, #16a34a, #4ade80)',
              }}
            />
            <div style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px' }}>🚀</span>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: NEAR_BLACK, margin: 0 }}>
                  What I Do
                </h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  'Enterprise Java',
                  'Spring Boot',
                  'Spring Batch',
                  'Microservices',
                  'Kubernetes',
                  'ArgoCD',
                  'PostgreSQL',
                  'Ollama / AI',
                  'Legacy Modernization',
                  'Homelab Infra',
                ].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '8px 16px',
                      borderRadius: '980px',
                      backgroundColor: LIGHT,
                      color: NEAR_BLACK,
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '0',
              marginBottom: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '6px',
                background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
              }}
            />
            <div style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px' }}>🎓</span>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: NEAR_BLACK, margin: 0 }}>
                  Education
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { period: '1999 – 2002', school: 'East China University of Science and Technology', loc: 'Shanghai, China' },
                  { period: '1995 – 1997', school: 'East China University of Science and Technology', loc: 'Shanghai, China' },
                ].map((edu) => (
                  <div
                    key={edu.period}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      backgroundColor: LIGHT,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#ffffff',
                        backgroundColor: '#7c3aed',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {edu.period}
                    </span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: NEAR_BLACK }}>
                        {edu.school}
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>{edu.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
