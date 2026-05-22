'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface IArticle {
  _id: string
  title: string
  date: string
  excerpt: string
  imageUrls: string[]
}

export default function ArchiveSlider({ articles }: { articles: IArticle[] }) {
  const [current, setCurrent] = useState(0)
  const total = articles.length
  const next = (current + 1) % total

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Images row — counter uses col-1 to match paragraph indent above */}
      <div className="d-flex" style={{ height: '480px', alignItems: 'center' }}>

        {/* Counter — same col-1 width + 32px right margin as line-home-body above */}
        <div className="col-1" style={{ flexShrink: 0, marginRight: '32px' }}>
          <div className="font-asul color-primary" style={{ fontSize: '13px', letterSpacing: '1px' }}>
            <span style={{ fontSize: '48px', fontWeight: '600' }}>{current + 1}</span>
            <span style={{ margin: '0 2px', fontSize: '18px' }}> / {total}</span>
          </div>
        </div>

        {/* Images — fill remaining width */}
        <div style={{ flex: 1, display: 'flex', gap: '32px', height: '100%' }}>

          {/* Main large image */}
          <div style={{ flex: 4, position: 'relative', overflow: 'hidden' }}>
            {articles.map((article, i) => (
              <Link
                key={article._id}
                href={`/news-details/${article._id}`}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: i === current ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  pointerEvents: i === current ? 'auto' : 'none',
                }}
              >
                <img
                  src={article.imageUrls?.[0]}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                  <div className="font-asul" style={{ color: 'white', fontSize: '20px', fontWeight: '400', lineHeight: '1.3', maxWidth: '280px' }}>
                    {article.title}
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                  <div className="font-mulish" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', letterSpacing: '1px' }}>
                    {article.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary image — smaller than main */}
          <div style={{ flex: 3, position: 'relative', overflow: 'hidden', height: '85%', alignSelf: 'center' }}>
            {articles.map((article, i) => (
              <Link
                key={article._id}
                href={`/news-details/${article._id}`}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: i === next ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  pointerEvents: i === next ? 'auto' : 'none',
                }}
              >
                <img
                  src={article.imageUrls?.[0]}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
                  {/* <div className="font-asul" style={{ color: 'white', fontSize: '14px', fontWeight: '400', lineHeight: '1.3', maxWidth: '180px' }}>
                    {article.title}
                  </div> */}
                </div>
                <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
                  {/* <div className="font-mulish" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', letterSpacing: '1px' }}>
                    {article.date}
                  </div> */}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* READ MORE — aligned with images (offset by col-1 + 32px margin) */}
      <br /><br /><br/>
      <div className="d-flex">
        <div className="col-1" style={{ flexShrink: 0, marginRight: '32px' }} />
        <div>
          <Link href="/news" style={{ textDecoration: 'none' }}>
            <button type="button" className="pd-button-primary">READ MORE</button>
          </Link>
        </div>
      </div>

    </div>
  )
}
