import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NewsDetails() {
  return (
    <>
      <div className="main-img-news-detail">
        <Navbar />
        <div className="d-flex align-items-center main-container-news-details">
          <div className="color-secondary col-6 d-flex flex-column align-items-end">
            <div className="news-detail-title-jumbotron font-asul news-detail-inner-container-jumbotron">
              Dreaming of The Perfect Art it Was Keeps Us Awake
            </div>
            <br />
            <div className="about-heading font-mulish news-detail-inner-container-jumbotron">
              20 JANUARY 2022
            </div>
            <br />
            <div className="about-subheading font-asul news-detail-inner-container-jumbotron">
              Pellentesque sagittis hendrerit diam, eu hendrerit odio ultricies a.
              Curabitur tincidunt, sem et pretium consequat, massa ligula gravida ex,
              id dignissim quam risus et dolor
            </div>
          </div>
          <div className="col-6 container-image-inner-jumbotron">
            <img src="/images/product-details/img-1.png" alt="" />
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="container about-main-container-news">
          <div style={{ height: 'auto' }} className="d-flex">
            <div className="col-6 font-mulish color-secondary">
              <div className="about-subheading font-asul" style={{ width: '65%', marginTop: '40px' }}>
                Maecenas elementum a leo vel lacinia. Maecenas quis auctor justo. Nam ultrices ante eros,
                eu bibendum lacus interdum et. Fusce egestas venenatis enim. Maecenas lobortis condimentum maximus.
                Suspendisse imperdiet purus dui, non finibus libero convallis non. Nullam auctor leo elit,
                non eleifend ex convallis in. Nunc blandit metus quis malesuada luctus.
              </div>
              <br /><br />
              <div style={{ width: '50%', height: '1px', backgroundColor: '#2C3F2C' }}></div>
              <br />
              <div className="color-secondary about-body-text">
                <br /><br />
                <div style={{ width: '65%' }}>
                  Pellentesque sagittis hendrerit diam, eu hendrerit odio ultricies a. Curabitur tincidunt,
                  sem et pretium consequat, massa ligula gravida ex, id dignissim quam risus et dolor.
                  Mauris sed auctor nibh, ornare maximus risus. Fusce facilisis sed dui nec ultricies.
                  Morbi enim neque, sagittis id aliquam egestas, placerat nec leo. Donec sapien odio,
                  varius at vestibulum ut, ultricies at nisl. Donec sit amet cursus ipsum.
                </div>
                <br /><br />
                <div style={{ width: '65%' }}>
                  Pellentesque sagittis hendrerit diam, eu hendrerit odio ultricies a. Curabitur tincidunt,
                  sem et pretium consequat, massa ligula gravida ex, id dignissim quam risus et dolor.
                  Mauris sed auctor nibh, ornare maximus risus. Fusce facilisis sed dui nec ultricies.
                  Morbi enim neque, sagittis id aliquam egestas, placerat nec leo.
                </div>
                <br /><br />
                <div className="about-subheading font-asul">Article by homlab</div>
              </div>
            </div>
            <div className="col-6 d-flex flex-column justify-content-between">
              <div style={{ marginBottom: '10px', height: '454px', width: '100%' }}>
                <img className="images-wrapper" src="/images/news/img-3.png" alt="" />
              </div>
              <div className="container-wrapper-bg-2">
                <div style={{ width: '50%', height: '100%' }}>
                  <img className="images-wrapper" src="/images/news/img-6.png" alt="" />
                </div>
                <div className="color-primary" style={{ width: '50%', height: '100%' }}>
                  <img className="images-wrapper" src="/images/news/img-7.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
