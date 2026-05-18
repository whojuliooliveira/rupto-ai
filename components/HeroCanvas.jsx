import { useEffect, useRef } from 'react'

const GRID = 48
const C = '47,128,237'
const LINE_DIST = GRID * 2.2
const WAVE_SPEED = 2.2
const WAVE_WIDTH = 160

// textZone: { x, y, w, h } in canvas-local coordinates (relative to section top-left)
export default function HeroCanvas({ gridOffsetY = 0, textZone = null }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, W, H, dots, pulses
    let waveX = -WAVE_WIDTH
    let t = 0

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      init()
    }

    function init() {
      dots = []
      pulses = []
      const cols = Math.ceil(W / GRID) + 1
      const rows = Math.ceil(H / GRID) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.40) continue
          const ox = c * GRID
          const oy = r * GRID + gridOffsetY
          dots.push({ x: ox, y: oy, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, ox, oy })
        }
      }
      spawnPulse()
    }

    function spawnPulse() {
      const side = Math.floor(Math.random() * 4)
      let x, y
      if (side === 0)      { x = Math.random() * W * 0.35;        y = Math.random() * H * 0.4 }
      else if (side === 1) { x = W - Math.random() * W * 0.35;    y = Math.random() * H * 0.4 }
      else if (side === 2) { x = Math.random() * W * 0.35;        y = H - Math.random() * H * 0.4 }
      else                 { x = W - Math.random() * W * 0.35;    y = H - Math.random() * H * 0.4 }
      pulses.push({ x, y, r: 0, alpha: 0.156, speed: 1.2 + Math.random() * 0.8 })
    }

    function inTextZone(mx, my) {
      if (!textZone) return false
      const pad = 32
      return (
        mx > textZone.x - pad &&
        mx < textZone.x + textZone.w + pad &&
        my > textZone.y - pad &&
        my < textZone.y + textZone.h + pad
      )
    }

    function draw() {
      t++
      ctx.clearRect(0, 0, W, H)

      waveX += WAVE_SPEED
      if (waveX > W + WAVE_WIDTH) waveX = -WAVE_WIDTH
      if (t % 180 === 0) spawnPulse()

      pulses = pulses.filter(p => p.alpha > 0.005)
      pulses.forEach(p => { p.r += p.speed; p.alpha *= 0.985 })

      pulses.forEach(p => {
        if (inTextZone(p.x, p.y)) return
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${C},${p.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        d.vx += (d.ox - d.x) * 0.003; d.vy += (d.oy - d.y) * 0.003
        d.vx *= 0.98; d.vy *= 0.98
      })

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > LINE_DIST) continue

          const midX = (dots[i].x + dots[j].x) / 2
          const midY = (dots[i].y + dots[j].y) / 2

          if (inTextZone(midX, midY)) continue

          const waveDist = Math.abs(midX - waveX)
          const waveBoost = Math.max(0, 1 - waveDist / WAVE_WIDTH) * 0.364

          let pulseBoost = 0
          pulses.forEach(p => {
            const pd = Math.sqrt((midX - p.x) ** 2 + (midY - p.y) ** 2)
            const ring = Math.abs(pd - p.r)
            if (ring < 24) pulseBoost = Math.max(pulseBoost, (1 - ring / 24) * p.alpha * 1.5)
          })

          const base = (1 - dist / LINE_DIST) * 0.091
          const alpha = Math.min(base + waveBoost + pulseBoost, 0.585)

          ctx.beginPath()
          ctx.strokeStyle = `rgba(${C},${alpha})`
          ctx.lineWidth = 0.7
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [gridOffsetY, textZone])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
