'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/home'
  const [contactInfo, setContactInfo] = useState<{ email?: string; phone?: string; instagram?: string; tokopedia?: string }>({})

  useEffect(() => {
    fetch('/api/contact-info').then(r => r.json()).then(setContactInfo).catch(() => {})
  }, [])

  return (
    <>
      <div className="color-primary" style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        <div
          style={{ height: '100px' }}
          className="container d-flex justify-content-between align-items-center"
        >
          <Link href="/products" className="d-flex justify-content-center align-items-center cursor-pointer" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '14px', letterSpacing: '0.1em', lineHeight: '150%' }} className={`me-2 font-mulish ${isHome ? 'color-white' : 'color-primary'}`}>PRODUCTS</div>
            {isHome ? (
              <div className="leaf-container">
                <img src="/images/leaf.svg" alt="" className="leaf-normal" />
                <img src="/images/leaf-hover.svg" alt="" className="leaf-filled" />
              </div>
            ) : (
              <img src="/images/leaf-orange.svg" alt="" />
            )}
          </Link>

          <Link href="/home">
            <img src={isHome ? '/images/homlab-filled-white.svg' : '/images/homlab-logo-orange.svg'} alt="Homlab" />
          </Link>

          <div
            className="menu-btn d-flex justify-content-center align-items-center cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <div style={{ fontSize: '14px', letterSpacing: '0.1em', lineHeight: '150%' }} className={`me-1 font-mulish menu-text ${isHome ? 'color-white' : 'color-primary'}`}>MENU</div>
            <svg className="menu-icon" width="60" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_769_5166)">
                <path d="M0.90625 35.2955V38.3044C0.90625 38.7582 1.28834 39.1164 1.74207 39.1164H38.2794C38.7331 39.1164 39.1152 38.7582 39.1152 38.3044V35.2955C39.1152 34.8417 38.7331 34.4835 38.2794 34.4835H1.71819C1.26446 34.4835 0.90625 34.8417 0.90625 35.2955Z" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M36.7024 16.9552C36.6546 8.0716 29.2039 0.883545 19.9859 0.883545C10.768 0.883545 3.31729 8.0716 3.26953 16.9552V34.4835H36.7024V16.9552Z" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M32.2841 17.3134C32.2363 10.7702 26.7677 5.49255 20.0094 5.49255C13.2512 5.49255 7.7587 10.7702 7.71094 17.3134V34.4597H32.2841V17.3134Z" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M22.6858 16.8835L23.2351 14.6626C23.4022 14.0417 22.9007 13.4447 22.2321 13.4447H20.0589H17.8619C17.2171 13.4447 16.7157 14.0417 16.8828 14.6865L17.4321 16.8835C17.5992 17.5522 17.2888 18.2447 16.644 18.5551C14.8291 19.4626 11.5336 21.8746 13.444 27.0089C14.9963 31.1641 15.6888 33.0745 15.9992 33.9104C16.1425 34.3163 16.5246 34.579 16.9545 34.579H20.0589H23.1395C23.5694 34.579 23.9515 34.3163 24.0948 33.9104C24.4052 33.0745 25.0977 31.188 26.65 27.0089C28.5604 21.8507 25.2649 19.4626 23.45 18.5551C22.8291 18.2447 22.5186 17.5522 22.6858 16.8835Z" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M20.0117 5.49255V0.907471" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M32.0469 23.188H36.823" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M3.26953 23.188H8.04565" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M9.8637 10.603L6.47266 7.35522" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
                <path d="M33.5286 7.28351L30.3047 10.6746" stroke={isHome ? 'white' : '#FE5C36'} strokeMiterlimit="10"/>
              </g>
              <defs>
                <clipPath id="clip0_769_5166">
                  <rect width="40" height="40" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backgroundImage: 'repeating-linear-gradient(to right, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 16.666%)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          {/* Top bar — matches main navbar height and container */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px' }} className="container d-flex justify-content-between align-items-center">
            <Link href="/products" onClick={() => setMenuOpen(false)} className="d-flex align-items-center" style={{ textDecoration: 'none', color: '#FE5C36', gap: '8px' }}>
              <div style={{ fontSize: '14px', letterSpacing: '0.1em', lineHeight: '150%' }} className=" color-primary font-mulish">PRODUCTS</div>
              <img src="/images/leaf-orange.svg" alt=""  />
            </Link>
            <Link href="/home" onClick={() => setMenuOpen(false)}>
              <img src="/images/homlab-filled-white.svg" alt="Homlab" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              style={{display: 'flex',justifyContent:'center', alignItems: 'center', gap: '4px', background: 'white', border: 'none', borderRadius: '999px', padding: '10px 20px', cursor: 'pointer', width: '150px', height: '60px' }}
            >
              <span style={{ fontSize: '14px', letterSpacing: '0.1em', lineHeight: '150%', fontFamily: 'Mulish, sans-serif', color: '#FE5C36' }}>CLOSE</span>
              <img src="/images/cross-orange.svg" alt="" width={40} height={25} />
            </button>
          </div>

          {/* Links - row 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px', marginBottom: '24px' }}>
            {[{ label: 'HOME', href: '/home' }, { label: 'ABOUT US', href: '/about' }, { label: 'PRODUCTS', href: '/products' }].map((link, i) => (
              <div key={link.href} style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontFamily: 'Asul, sans-serif', fontSize: '32px', fontWeight: '400' }}
                  onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textDecorationThickness = '1px'; e.currentTarget.style.textUnderlineOffset = '24px'; }}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >{link.label}</Link>
                {i < 2 && <span style={{ color: 'white', fontSize: '24px' }}>●</span>}
              </div>
            ))}
          </div>
          <br />

          {/* Links - row 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            {[{ label: 'ARTICLES', href: '/news' }, { label: 'CONTACTS', href: '/contact' }].map((link, i) => (
              <div key={link.href} style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontFamily: 'Asul, sans-serif', fontSize: '32px', fontWeight: '400' }}
                  onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textDecorationThickness = '1px'; e.currentTarget.style.textUnderlineOffset = '24px'; }}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >{link.label}</Link>
                {i < 1 && <span style={{ color: 'white', fontSize: '24px' }}>●</span>}
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { src: '/images/email.png', href: contactInfo.email ? `mailto:${contactInfo.email}` : undefined },
                { src: '/images/facebook.png', href: contactInfo.tokopedia || undefined },
                { src: '/images/whatsapp.png', href: contactInfo.phone ? `https://wa.me/${contactInfo.phone.replace(/\D/g, '')}` : undefined },
                { src: '/images/instagram.png', href: contactInfo.instagram || undefined },
              ].map(({ src, href }, i) => (
                <a key={i} href={href} target={href?.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </a>
              ))}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>@2021 homlab. All Rights Reserved</div>
          </div>

        </div>
      )}
    </>
  )
}
