import { useEffect, useRef } from 'react'

// Bright star catalog: [RA (decimal hours), Dec (degrees), magnitude, B-V color index, name]
const CATALOG: [number, number, number, number, string][] = [
  [6.7525,  -16.7161, -1.46,  0.00, 'Sirius'],
  [6.3992,  -52.6957, -0.72,  0.15, 'Canopus'],
  [14.2612,  19.1822, -0.04,  1.23, 'Arcturus'],
  [14.6600, -60.8353, -0.27,  0.71, 'Rigil Kentaurus'],
  [18.6157,  38.7836,  0.03,  0.00, 'Vega'],
  [5.2782,   45.9981,  0.08,  0.80, 'Capella'],
  [5.2423,   -8.2017,  0.12, -0.03, 'Rigel'],
  [7.6553,    5.2250,  0.34,  0.42, 'Procyon'],
  [1.6286,  -57.2367,  0.46, -0.15, 'Achernar'],
  [5.9195,    7.4069,  0.50,  1.85, 'Betelgeuse'],
  [14.0637, -60.3730,  0.61, -0.23, 'Hadar'],
  [19.8463,   8.8683,  0.77,  0.22, 'Altair'],
  [12.4433, -63.0992,  0.77, -0.24, 'Acrux'],
  [4.5987,   16.5092,  0.85,  1.54, 'Aldebaran'],
  [16.4901, -26.4320,  0.96,  1.83, 'Antares'],
  [13.4199, -11.1614,  0.97, -0.23, 'Spica'],
  [7.7553,   28.0261,  1.14,  1.00, 'Pollux'],
  [22.9608, -29.6224,  1.16,  0.09, 'Fomalhaut'],
  [20.6905,  45.2803,  1.25,  0.09, 'Deneb'],
  [12.7953, -59.6886,  1.25, -0.23, 'Mimosa'],
  [10.1395,  11.9672,  1.35, -0.11, 'Regulus'],
  [6.9771,  -28.9722,  1.50, -0.21, 'Adhara'],
  [7.5768,   31.8883,  1.57,  0.03, 'Castor'],
  [12.5194, -57.1132,  1.64,  1.59, 'Gacrux'],
  [5.4188,    6.3497,  1.64, -0.22, 'Bellatrix'],
  [5.4382,   28.6078,  1.65, -0.13, 'Elnath'],
  [9.2200,  -69.7172,  1.67,  0.07, 'Miaplacidus'],
  [5.6036,   -1.2019,  1.69, -0.18, 'Alnilam'],
  [22.1375, -46.9606,  1.73, -0.09, 'Alnair'],
  [5.6795,   -1.9425,  1.74, -0.20, 'Alnitak'],
  [12.9004,  55.9598,  1.76,  0.02, 'Alioth'],
  [18.4028, -34.3847,  1.79, -0.03, 'Kaus Australis'],
  [3.4053,   49.8612,  1.79,  0.48, 'Mirfak'],
  [11.0621,  61.7511,  1.81,  1.06, 'Dubhe'],
  [13.7924,  49.3133,  1.85, -0.19, 'Alkaid'],
  [8.3748,  -59.5092,  1.86,  1.28, 'Avior'],
  [17.6219, -42.9980,  1.86,  0.41, 'Sargas'],
  [5.9922,   44.9475,  1.90,  0.08, 'Menkalinan'],
  [16.8113, -69.0278,  1.91,  1.44, 'Atria'],
  [6.6283,   16.3994,  1.93,  0.00, 'Alhena'],
  [20.4275, -56.7350,  1.94, -0.20, 'Peacock'],
  [6.3783,  -17.9556,  1.98, -0.24, 'Murzim'],
  [9.4597,   -8.6586,  1.99,  1.44, 'Alphard'],
  [2.5303,   89.2641,  1.97,  0.60, 'Polaris'],
  [2.1196,   23.4625,  2.00,  1.15, 'Hamal'],
  [0.7265,  -17.9869,  2.02,  1.02, 'Diphda'],
  [18.9211, -26.2967,  2.05, -0.20, 'Nunki'],
  [14.8450,  74.1553,  2.07,  1.47, 'Kochab'],
  [5.7958,   -9.6697,  2.07, -0.17, 'Saiph'],
  [11.8176,  14.5720,  2.14,  0.09, 'Denebola'],
  [0.1398,   29.0905,  2.06, -0.04, 'Alpheratz'],
  [15.5781,  26.7147,  2.22,  0.03, 'Alphecca'],
  [13.3988,  54.9254,  2.23,  0.02, 'Mizar'],
  [5.5336,   -0.2994,  2.23, -0.22, 'Mintaka'],
  [0.6751,   56.5372,  2.24,  1.17, 'Schedar'],
  [8.0597,  -40.0031,  2.25, -0.27, 'Naos'],
  [0.1529,   59.1498,  2.28,  0.34, 'Caph'],
  [17.5602, -37.1038,  1.62, -0.20, 'Shaula'],
  [8.7447,  -54.7086,  1.95,  0.04, 'Alsephina'],
  [10.3330,  19.8414,  2.01,  1.13, 'Algieba'],
  [3.7914,   24.1053,  2.87,  0.80, 'Alcyone'],
  [6.0372,   -9.5506,  2.58,  1.28, 'Cursa'],
  [17.1733, -15.7249,  2.43, -0.19, 'Sabik'],
  [16.0055,  -22.6217, 2.29,  1.70, 'Graffias'],
  [4.9130,   33.1661,  2.65,  0.18, 'Almach'],  // actually 2.10 gamma and
  [23.0797,  15.2046,  2.38, -0.03, 'Markab'],
  [22.6914,  10.8314,  2.44,  1.03, 'Sadalsuud'],
  [20.3905,  40.2567,  2.49,  1.03, 'Sadr'],
  [7.4020,   -8.1581,  2.98, -0.24, 'Adhil'],
  [11.2367,  20.5236,  2.56, -0.07, 'Zosma'],
  [9.8840,  -65.0719,  2.24,  1.28, 'Tureis'],
  [15.7374,  26.7147,  2.89, -0.02, 'Nusakan'],
  [22.0914, -32.5456,  2.39,  1.56, 'Fomalhaut2'], // Skat
  [4.0133,   50.3544,  1.80,  0.48, 'Mirphak'],
  [18.6241,  38.7836,  2.81, -0.20, 'Sheliak'],
  [5.1185,  -8.2017,   3.20, -0.10, 'Saiph2'],
  [22.7208, -46.8847,  2.37,  1.28, 'Sheat'],
  [17.7301, -39.0200,  2.70,  1.87, 'Lesath'],
  [2.0697,   23.4625,  3.62,  1.15, 'Sheratan'],
  [6.0000,   -30.0600, 2.90,  1.72, 'Mirzam2'],
  [10.3995, -16.8363,  3.30,  1.24, 'Alphard2'],
]

// ─── Astronomy helpers ─────────────────────────────────────────────────────

function julianDate(d: Date): number {
  return d.getTime() / 86400000 + 2440587.5
}

function gmstDeg(d: Date): number {
  const jd = julianDate(d)
  const T = (jd - 2451545.0) / 36525.0
  let θ = 280.46061837 + 360.98564736629 * (jd - 2451545.0)
    + 0.000387933 * T * T - (T * T * T) / 38710000.0
  return ((θ % 360) + 360) % 360
}

function lstDeg(d: Date, lonDeg: number): number {
  return (gmstDeg(d) + lonDeg + 360) % 360
}

function raDecToAltAz(
  raH: number, decDeg: number,
  latDeg: number, lstD: number
): { alt: number; az: number } {
  const H    = ((lstD - raH * 15) + 360) % 360
  const Hrad = H    * Math.PI / 180
  const dec  = decDeg * Math.PI / 180
  const lat  = latDeg  * Math.PI / 180

  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(Hrad)
  const alt    = Math.asin(Math.max(-1, Math.min(1, sinAlt))) * 180 / Math.PI

  const cosAz  = (Math.sin(dec) - Math.sin(lat) * sinAlt) /
                 (Math.cos(lat) * Math.cos(alt * Math.PI / 180))
  let az = Math.acos(Math.max(-1, Math.min(1, cosAz))) * 180 / Math.PI
  if (Math.sin(Hrad) > 0) az = 360 - az

  return { alt, az }
}

function bvToRgb(bv: number): [number, number, number] {
  if (bv < -0.3) return [155, 176, 255]
  if (bv < -0.1) return [170, 191, 255]
  if (bv <  0.1) return [202, 215, 255]
  if (bv <  0.3) return [255, 255, 255]
  if (bv <  0.6) return [255, 255, 224]
  if (bv <  1.0) return [255, 244, 180]
  if (bv <  1.5) return [255, 210, 161]
  return [255, 180, 130]
}

function magToRadius(mag: number): number {
  return Math.max(0.4, 3.2 - mag * 0.55)
}

// ─── Component ────────────────────────────────────────────────────────────

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lat = 40.0   // default: New York
    let lon = -74.0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Ask for location — fall back to default if denied
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { lat = pos.coords.latitude; lon = pos.coords.longitude },
        () => {}
      )
    }

    // Twinkle state per catalog star
    const twinkle = CATALOG.map(() => ({
      alpha: 0.5 + Math.random() * 0.5,
      speed: 0.003 + Math.random() * 0.008,
      dir:   Math.random() > 0.5 ? 1 : -1,
    }))

    // Procedural faint background stars (stable random positions)
    const rng = (seed: number) => {
      let s = seed
      return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
    }
    const r = rng(42)
    const bgStars = Array.from({ length: 2500 }, (_, i) => ({
      // Use sidereal-style RA/Dec so they stay fixed on the sky
      ra:  r() * 24,
      dec: (r() - 0.5) * 180,
      mag: 3.5 + r() * 2.5,
      bv:  (r() - 0.2) * 1.2,
      tw: { alpha: 0.1 + r() * 0.35, speed: 0.001 + r() * 0.004, dir: i % 2 ? 1 : -1 }
    }))

    let animId: number
    let lastPositionUpdate = 0

    // Cached projected positions
    type Projected = { x: number; y: number; r: number; rgb: [number,number,number]; visible: boolean }
    let catalogProjected: Projected[] = []
    let bgProjected:      Projected[] = []

    const updatePositions = () => {
      const now  = new Date()
      const lst  = lstDeg(now, lon)
      const cx   = canvas.width  / 2
      const cy   = canvas.height / 2
      const maxR = Math.min(canvas.width, canvas.height) * 0.52

      catalogProjected = CATALOG.map(([ra, dec, mag, bv]) => {
        const { alt, az } = raDecToAltAz(ra, dec, lat, lst)
        if (alt < -5) return { x: 0, y: 0, r: 0, rgb: [0,0,0] as [number,number,number], visible: false }
        const extinction = Math.max(0, Math.min(1, (alt + 5) / 20))
        const rPx  = (90 - alt) / 90 * maxR
        const azRad = az * Math.PI / 180
        return {
          x:    cx + rPx * Math.sin(azRad),
          y:    cy - rPx * Math.cos(azRad),
          r:    magToRadius(mag) * extinction,
          rgb:  bvToRgb(bv),
          visible: alt > -5,
        }
      })

      bgProjected = bgStars.map(({ ra, dec, mag, bv }) => {
        const { alt, az } = raDecToAltAz(ra, dec, lat, lst)
        if (alt < 0) return { x: 0, y: 0, r: 0, rgb: [0,0,0] as [number,number,number], visible: false }
        const rPx   = (90 - alt) / 90 * maxR
        const azRad = az * Math.PI / 180
        return {
          x:    cx + rPx * Math.sin(azRad),
          y:    cy - rPx * Math.cos(azRad),
          r:    magToRadius(mag),
          rgb:  bvToRgb(bv),
          visible: true,
        }
      })
    }

    const drawMilkyWay = () => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const now = new Date()
      const lst  = lstDeg(now, lon)

      // Milky Way center: RA ~17.76h, Dec ~-28.9° (Galactic center Sgr A*)
      const gcRA = 17.7611, gcDec = -28.9365
      const { alt: gcAlt, az: gcAz } = raDecToAltAz(gcRA, gcDec, lat, lst)
      const maxR = Math.min(canvas.width, canvas.height) * 0.52
      const rPx  = gcAlt > -20 ? (90 - gcAlt) / 90 * maxR : maxR * 1.4
      const gcAzRad = gcAz * Math.PI / 180
      const gcX = cx + rPx * Math.sin(gcAzRad)
      const gcY = cy - rPx * Math.cos(gcAzRad)

      // Band perpendicular direction (rough)
      const bandAngle = gcAz * Math.PI / 180 + Math.PI / 2

      const glow = (ox: number, oy: number, rad: number, col: string, a: number) => {
        const g = ctx.createRadialGradient(gcX + ox, gcY + oy, 0, gcX + ox, gcY + oy, rad)
        g.addColorStop(0, `rgba(${col},${a})`)
        g.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.ellipse(gcX + ox, gcY + oy, rad, rad * 0.28, bandAngle, 0, Math.PI * 2)
        ctx.fill()
      }

      glow(0, 0, maxR * 1.4, '120,100,200', 0.07)
      glow(0, 0, maxR * 0.9, '100,120,220', 0.08)
      glow(0, 0, maxR * 0.5, '160,140,220', 0.10)
      glow(0, 0, maxR * 0.25,'220,180,120', 0.14)
      glow(0, 0, maxR * 0.10,'255,230,160', 0.22)
    }

    const draw = () => {
      const now = Date.now()
      if (now - lastPositionUpdate > 60000 || lastPositionUpdate === 0) {
        updatePositions()
        lastPositionUpdate = now
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Horizon circle clipping
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const maxR = Math.min(canvas.width, canvas.height) * 0.52
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, maxR * 1.01, 0, Math.PI * 2)
      ctx.clip()

      drawMilkyWay()

      // Draw background faint stars
      bgStars.forEach((s, i) => {
        const p = bgProjected[i]
        if (!p?.visible) return
        s.tw.alpha += s.tw.speed * s.tw.dir
        if (s.tw.alpha >= 0.5)  { s.tw.alpha = 0.5;  s.tw.dir = -1 }
        if (s.tw.alpha <= 0.03) { s.tw.alpha = 0.03; s.tw.dir =  1 }
        const [r, g, b] = p.rgb
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${s.tw.alpha})`
        ctx.fill()
      })

      // Draw bright catalog stars
      CATALOG.forEach((_, i) => {
        const p = catalogProjected[i]
        if (!p?.visible) return
        const tw = twinkle[i]
        tw.alpha += tw.speed * tw.dir
        if (tw.alpha >= 1)    { tw.alpha = 1;    tw.dir = -1 }
        if (tw.alpha <= 0.25) { tw.alpha = 0.25; tw.dir =  1 }
        const [r, g, b] = p.rgb

        // Glow halo
        if (p.r > 1.5) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
          glow.addColorStop(0, `rgba(${r},${g},${b},${tw.alpha * 0.4})`)
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${tw.alpha})`
        ctx.fill()
      })

      ctx.restore()

      // Horizon fade ring
      const horizonGrad = ctx.createRadialGradient(cx, cy, maxR * 0.82, cx, cy, maxR * 1.05)
      horizonGrad.addColorStop(0, 'rgba(0,0,0,0)')
      horizonGrad.addColorStop(1, 'rgba(0,0,0,0.85)')
      ctx.fillStyle = horizonGrad
      ctx.beginPath()
      ctx.arc(cx, cy, maxR * 1.05, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => { resize(); updatePositions() }
    window.removeEventListener('resize', resize)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
