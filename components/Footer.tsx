import Link from 'next/link'

export default function Footer() {
  return (
    <div>
      <div className="wrapper-footer">
        <img className="image-bg-footer" src="/images/footer-bg.png" alt="" />
      </div>
      <div style={{ width: '100%', height: '400px', backgroundColor: '#2C3F2C' }}>
        <div className="container d-flex flex-column align-items-center color-white">
          <div style={{ marginTop: '64px' }} className="text-footer-title-wrapper text-footer-title font-mulish">
            Pellentesque sagittis hendrerit diam, eu hendrerit odio ultricies a. Curabitur tincidunt,
            sem et pretium consequat,
          </div>
          <div className="mt-5" style={{ width: '500px', textAlign: 'center' }}>
            <Link href="/home">
              <img src="/images/homlabLogoFooter.png" alt="Homlab" />
            </Link>
          </div>
          <div className="mt-5 d-flex justify-content-between text-footer-title-wrapper text-footer-link">
            <Link href="/about" className="cursor-pointer color-white" style={{ textDecoration: 'none' }}>ABOUT US</Link>
            <Link href="/news" className="cursor-pointer color-white" style={{ textDecoration: 'none' }}>ARTICLES</Link>
            <Link href="/products" className="cursor-pointer color-white" style={{ textDecoration: 'none' }}>PRODUCTS</Link>
            <Link href="/contact" className="cursor-pointer color-white" style={{ textDecoration: 'none' }}>CONTACTS</Link>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center font-mulish color-white footer-2-container text-footer-2">
          <div>@2021 homlab, All Rights Reserved</div>
          <div className="gap-socmed-logo d-flex">
            <div><img src="/images/email.png" alt="" /></div>
            <div><img src="/images/facebook.png" alt="" /></div>
            <div><img src="/images/whatsapp.png" alt="" /></div>
            <div><img src="/images/instagram.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
