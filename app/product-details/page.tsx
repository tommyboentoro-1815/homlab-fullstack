import MainLayout from '@/components/MainLayout'

const furtherReadingSection = (
  <div className="font-mulish color-primary pd-main-container">
    <div className="container">
      <div className="pd-text-subtitle">WHAT&apos;S ON</div>
      <br />
      <div className="font-asul pd-text-h1">Further Reading</div>
      <br /><br />
      <div className="d-flex align-items-center gap-5">
        <div className="pd-container-wrapper col-7">
          <img src="/images/product-details/img-1.png" alt="" />
          <div className="pd-text-reading-left pd-container-absolute-left font-asul color-white">
            <div>FOR THE BETTER</div>
            <div>NATURE</div>
          </div>
          <div className="color-white pd-container-absolute-right pd-text-reading-right">
            JANNUARY, 20
          </div>
        </div>
        <div className="col-6 pd-image-wrapper-right">
          <img src="/images/product-details/img-2.png" alt="" />
        </div>
      </div>
      <br /><br />
      <div>
        <button style={{ backgroundColor: '#2C3F2C' }} type="button" className="pd-button-primary">
          READ MORE
        </button>
      </div>
    </div>
  </div>
)

export default function ProductDetails() {
  return (
    <MainLayout bottomContent={furtherReadingSection}>
      <div className="d-flex">
        <div className="image-wrapper col-6">
          <img className="image-content" src="/images/products/img-1.png" alt="" />
        </div>
        <div className="mt-5 product-details-container col-6">
          <div className="font-asul color-primary product-details-text-title">Eggware Mug</div>
          <br />
          <div className="pd-line"></div>
          <br /><br />
          <div className="d-flex color-primary">
            <div className="col-4">
              <div className="font-mulish pd-text-subtitle">Material</div>
              <div className="font-asul pd-text-title">Egg Shell</div>
            </div>
            <div className="col-4">
              <div className="font-mulish pd-text-subtitle">Weight</div>
              <div className="font-asul pd-text-title">500 gr</div>
            </div>
            <div className="col-4">
              <div className="font-mulish pd-text-subtitle">Dimension (cm)</div>
              <div className="font-asul pd-text-title">7 x 3 x 10</div>
            </div>
          </div>
          <br /><br />
          <div className="font-mulish color-secondary pd-text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean nulla ipsum, faucibus viverra dapibus ac, vehicula
            vel eros. Duis consequat ante ac lacus fermentum, a interdum
            velit posuere. Sed pretium pharetra felis ut fermentum. Sed
            faucibus eros id orci vulputate, ac tristique ante gravida.
            Praesent sit amet est sit amet orci egestas tempus.
          </div>
          <br /><br />
          <div className="d-flex gap-3">
            <button type="button" className="pd-button-primary">SHOP NOW</button>
            <button type="button" className="pd-button-secondary">CONTACT VIA WA</button>
          </div>
        </div>
      </div>
      <br /><br /><br />
      <div style={{ width: '100%' }} className="d-flex justify-content-center font-asul color-primary pd-text-poetry">
        <div className="pd-container-poetry">
          &ldquo;Pottery is emotion put into measure.
          The emotion must come by nature, but the measure
          can be acquired by art.&rdquo;
        </div>
      </div>
      <br /><br /><br />
      <div className="d-flex">
        {['/images/products/img-1.png', '/images/products/img-2.png', '/images/products/img-3.jpg'].map((img, i) => (
          <div key={i} className="col-4">
            <div><img src={img} alt="" /></div>
            <br />
            <div className="d-flex justify-content-center">
              <div className="container-text-product">
                <div className="font-asul font-product-title color-primary">Eggware Mug</div>
                <div className="font-mulish color-primary font-product-body">
                  Pellentesque sagittis hendrerit diam,
                  eu hendrerit odio ultricies a.
                  Curabitur tincidunt, sem et pretium consequat.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br /><br /><br />
    </MainLayout>
  )
}
