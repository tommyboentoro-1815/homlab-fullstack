'use client'

const icons = ['/images/scroll-img-1.png', '/images/scroll-img-2.png', '/images/scroll-img-3.png']
const items = Array(10).fill(null)

export default function MarqueeTicker() {
  return (
    <div style={{ overflow: 'hidden', width: '100%', padding: '40px 0' }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 20s linear infinite',
      }}>
        {[...items, ...items].map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '40px' }}>
            <span className="font-asul color-primary" style={{ fontSize: '32px', whiteSpace: 'nowrap', fontWeight: '300' }}>homlab</span>
            <img src={icons[i % icons.length]} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
