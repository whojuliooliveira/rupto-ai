export default function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }} className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between gap-4 sm:gap-6">

        <div className="flex items-center gap-2">
          <img src="/Logo.svg" alt="Rupto AI" style={{ height: 20, width: 'auto' }} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: '#0a0a0a', fontSize: '0.9375rem', letterSpacing: '-0.02em' }}>Rupto AI</span>
        </div>

        <span className="hidden sm:block" style={{ fontFamily: '"DM Sans", sans-serif', color: '#767676', fontSize: '0.6875rem' }}>© 2026 Rupto AI. Todos os direitos reservados.</span>

        <div className="flex items-center gap-3 sm:gap-5">
          <a href="https://wa.me/5519992438604?text=Vim%20pelo%20site%20da%20Rupto.%20Quero%20o%20diagn%C3%B3stico%20gratuito." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: '#767676' }} className="hover:text-[#0a0a0a] transition-colors duration-200">
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/ruptoai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Rupto AI" style={{ color: '#767676' }} className="hover:text-[#0a0a0a] transition-colors duration-200">
            <svg aria-hidden="true" width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C14.396 7.179 20 6.988 20 12.247V19z"/></svg>
          </a>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mt-4 sm:hidden">
        <span style={{ fontFamily: '"DM Sans", sans-serif', color: '#767676', fontSize: '0.6875rem' }}>© 2026 Rupto AI. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
