'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'

function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const links = [
    { href: '/admin/dashboard-image', label: 'Dashboard Image' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/news', label: 'News' },
    { href: '/admin/contact', label: 'Contact Info' },
  ]

  return (
    <div style={{ width: '220px', minHeight: '100vh', backgroundColor: '#2C3F2C', display: 'flex', flexDirection: 'column', padding: '32px 0', flexShrink: 0 }}>
      <div style={{ padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>Homlab</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>Admin Panel</div>
      </div>
      <nav style={{ flex: 1, padding: '24px 0' }}>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'block',
              padding: '12px 24px',
              color: pathname.startsWith(link.href) ? '#FE5C36' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: pathname.startsWith(link.href) ? '600' : '400',
              backgroundColor: pathname.startsWith(link.href) ? 'rgba(254,92,54,0.1)' : 'transparent',
              borderLeft: pathname.startsWith(link.href) ? '3px solid #FE5C36' : '3px solid transparent',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div style={{ padding: '24px' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>{session?.user?.name}</div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', width: '100%' }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '40px', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
