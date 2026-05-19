import MainLayout from '@/components/MainLayout'

export default function About() {
  return (
    <MainLayout>
      <div className="container about-main-container">
        <div style={{ height: 'auto' }} className="d-flex">
          <div className="col-6 font-mulish color-primary">
            <div className="about-heading font-asul ms-2">ABOUT US</div>
            <div className="about-subheading font-asul" style={{ width: '65%', marginTop: '40px' }}>
              We produced artisanal biofabricated goods from hom with aesthetic and efficacy in mind.
              We always try to see how we can apply biomaterials in our everyday life. We believe the
              future will rely on biomaterials
            </div>
            <br /><br />
            <div style={{ width: '50%', height: '1px', backgroundColor: '#FE5C36' }}></div>
            <br />
            <div className="color-secondary about-body-text">
              <div style={{ width: '65%' }}>
                Started as a creative outlet during the early stressful period of pandemic,
                two friends experimented with bio materials on their own.
              </div>
              <br /><br />
              <div style={{ width: '65%' }}>
                Joshua has always been fascinated with bioplastic, so this working from home period allowed
                him to research and develop the perfect bioplastic formula. Celine, with a handful of eggshells waste around her,
                started to brainstorming how to reuse this waste. She then started experimenting turning eggshells into eggware.
              </div>
              <br /><br />
              <div style={{ width: '65%' }}>
                The two of them shared their journey with each other. And as their experiment went by, perfecting their formula,
                they decided to start working together. Now working as a team of three, we strive to continue experimenting with
                other biomaterials from waste and transform to goods for you to enjoy in everyday life.
              </div>
            </div>
          </div>
          <div className="col-6 d-flex flex-column justify-content-between">
            <div style={{ marginBottom: '10px', height: '454px', width: '100%' }}>
              <img className="images-wrapper" src="/images/about/bg-1.png" alt="" />
            </div>
            <div className="container-wrapper-bg-2">
              <div style={{ width: '50%', height: '100%' }}>
                <img className="images-wrapper" src="/images/about/bg-3.png" alt="" />
              </div>
              <div className="color-primary" style={{ width: '50%', height: '100%' }}>
                <img className="images-wrapper" src="/images/about/bg-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '120px' }}></div>
    </MainLayout>
  )
}
