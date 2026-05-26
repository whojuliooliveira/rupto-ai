// Gera og-image dinamicamente via SVG → PNG não precisa de arquivo estático
export default function handler(req, res) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="4" fill="#2f80ed" y="0"/>

  <!-- Grid sutil -->
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
    </pattern>
    <radialGradient id="fade" cx="50%" cy="50%" r="60%">
      <stop offset="30%" stop-color="white" stop-opacity="0"/>
      <stop offset="100%" stop-color="white" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#fade)"/>

  <!-- Logo mark -->
  <rect x="80" y="72" width="36" height="36" rx="0" fill="#2f80ed"/>
  <text x="124" y="100" font-family="system-ui, sans-serif" font-size="26" font-weight="800" fill="#0a0a0a" letter-spacing="-0.5">Rupto AI</text>

  <!-- Headline -->
  <text x="80" y="240" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="#0a0a0a" letter-spacing="-2">Sua operação cresce,</text>
  <text x="80" y="330" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="#0a0a0a" letter-spacing="-2">mas os processos</text>
  <text x="80" y="420" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="#2f80ed" letter-spacing="-2">não acompanham.</text>

  <!-- Subtext -->
  <text x="80" y="510" font-family="system-ui, sans-serif" font-size="28" font-weight="400" fill="#666">Diagnóstico gratuito · ruptoai.com</text>
</svg>`

  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.status(200).send(svg)
}
