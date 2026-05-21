'use client'
import { useState, useEffect } from 'react'

export default function JumbotronSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="home-main-container">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="animate-zoom-out"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      ))}
      <div className="home-jumbotron-text text-h1 color-primary animate-slide-up" style={{ position: 'absolute', bottom: '80px', left: '80px', zIndex: 1 }}>
        <div>Pottery Is Emotion</div>
        <div>Put Into Measure.</div>
      </div>
      <div className="home-jumbotron-dots" style={{ position: 'absolute', zIndex: 1 }}>
        {images.map((_, i) => (
          <img
            key={i}
            src={i === current ? '/images/egg-icon-selected.png' : '/images/egg-icon.png'}
            alt=""
            onClick={() => setCurrent(i)}
            style={{ width: '40px', height: '40px', cursor: 'pointer', objectFit: 'contain', transform: i === current ? 'scale(1.4)' : 'scale(1)', transition: 'transform 0.2s ease' }}
          />
        ))}
      </div>
    </div>
  )
}
