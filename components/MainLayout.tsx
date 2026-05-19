import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
  bottomContent?: ReactNode
}

export default function MainLayout({ children, bottomContent }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="container mt-4 ">
        {children}
      </div>
      {bottomContent && <div>{bottomContent}</div>}
      <Footer />
    </>
  )
}
