'use client'
import { useState, useEffect, useRef } from 'react'
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
  const [prev, setPrev] = useState<number | null>(null)
  const [prevNext, setPrevNext] = useState<number | null>(null)
  const prevTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = articles.length
  const next = (current + 1) % total

  const advance = (from: number) => {
    if (prevTimerRef.current) clearTimeout(prevTimerRef.current)
    setPrev(from)
    setPrevNext((from + 1) % total)
    setCurrent((from + 1) % total)
    prevTimerRef.current = setTimeout(() => {
      setPrev(null)
      setPrevNext(null)
    }, 750)
  }

  useEffect(() => {
    const timer = setInterval(() => advance(current), 5000)
    return () => clearInterval(timer)
  }, [current, total])

  useEffect(() => {
    return () => { if (prevTimerRef.current) clearTimeout(prevTimerRef.current) }
  }, [])

  if (total === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Images row */}
      <div className="d-flex" style={{ height: '480px', alignItems: 'center' }}>

        {/* Counter */}
        <div className="col-1" style={{ flexShrink: 0, marginRight: '32px' }}>
          <div className="font-asul color-primary" style={{ fontSize: '13px', letterSpacing: '1px' }}>
            <span style={{ fontSize: '48px', fontWeight: '600' }}>{current + 1}</span>
            <span style={{ margin: '0 2px', fontSize: '18px' }}> / {total}</span>
          </div>
        </div>

        {/* Images — fill remaining width */}
        <div style={{ flex: 1, display: 'flex', gap: '32px', height: '100%' }}>

          {/* ── Main image ── */}
          <div style={{ flex: 4, position: 'relative', overflow: 'hidden' }}>

            {/* Outgoing main — slides out to the left */}
            {prev !== null && (
              <div
                key={`main-out-${prev}`}
                style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  animation: 'slideOutToLeft 0.65s ease-in-out forwards',
                }}
              >
                <img src={articles[prev].imageUrls?.[0]} alt={articles[prev].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                  <div className="font-asul" style={{ color: 'white', fontSize: '20px', fontWeight: '400', lineHeight: '1.3', maxWidth: '280px' }}>
                    {articles[prev].title}
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                  <div className="font-mulish" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', letterSpacing: '1px' }}>
                    {articles[prev].date}
                  </div>
                </div>
              </div>
            )}

            {/* Incoming main — slides in from the right */}
            <Link
              key={`main-in-${current}`}
              href={`/news-details/${articles[current]._id}`}
              style={{
                position: 'absolute', inset: 0, zIndex: 2, display: 'block',
                animation: prev !== null ? 'slideInFromRight 0.65s ease-in-out forwards' : 'none',
              }}
            >
              <img src={articles[current].imageUrls?.[0]} alt={articles[current].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                <div className="font-asul" style={{ color: 'white', fontSize: '20px', fontWeight: '400', lineHeight: '1.3', maxWidth: '280px' }}>
                  {articles[current].title}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                <div className="font-mulish" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', letterSpacing: '1px' }}>
                  {articles[current].date}
                </div>
              </div>
            </Link>
          </div>

          {/* ── Secondary image ── */}
          <div
            onClick={() => advance(current)}
            style={{ flex: 3, position: 'relative', overflow: 'hidden', height: '85%', alignSelf: 'center', cursor: 'pointer' }}
          >
            {/* New secondary — slides in from the right */}
            <div
              key={`sec-in-${next}`}
              style={{
                position: 'absolute', inset: 0, zIndex: 1,
                animation: prevNext !== null ? 'slideInFromRight 0.65s ease-in-out forwards' : 'none',
              }}
            >
              <img src={articles[next].imageUrls?.[0]} alt={articles[next].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
            </div>

            {/* Old secondary — slides out to the left (as if moving into main) */}
            {prevNext !== null && (
              <div
                key={`sec-out-${prevNext}`}
                style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  animation: 'slideOutToLeft 0.65s ease-in-out forwards',
                }}
              >
                <img src={articles[prevNext].imageUrls?.[0]} alt={articles[prevNext].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* READ MORE */}
      <br /><br /><br />
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
