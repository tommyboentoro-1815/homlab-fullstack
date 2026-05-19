import MainLayout from '@/components/MainLayout'
import ContactForm from '@/components/ContactForm'
import { connectDB } from '@/lib/mongodb'
import { ContactInfo } from '@/models/ContactInfo'

async function getContactInfo() {
  await connectDB()
  const info = await ContactInfo.findOne().lean() as {
    phone?: string
    email?: string
    location?: string
  } | null
  return info
}

const emailSection = (
  <div className="email-main-container">
    <div className="container">
      <div className="contact-line"></div>
      <div className="find-us-container">
        <div className="col-6 contact-title-text color-primary font-asul">
          <div>Question Left?</div>
          <div>We Will Be Happy To</div>
          <div>Answer:</div>
        </div>
        <div className="font-mulish col-6">
          <div className="text-body-email color-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed commodo, nisl at viverra aliquet, magna risus consectetur quam,
            sed auctor libero lectus a mauris. Fusce facilisis mi nec lacus efficitur
            fermentum. In placerat elit lacus,
            consequat dictum sem tincidunt at.
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
)

export default async function Contact() {
  const info = await getContactInfo()

  return (
    <MainLayout bottomContent={emailSection}>
      <div className="text-contact color-primary font-mulish">CONTACT</div>
      <br />
      <div className="color-primary font-asul contact-title-text">
        <div>We&apos;re A Friendly Bunch</div>
        <div>Why Not Call Us Or Drop Us A Line?</div>
      </div>
      <br />
      <div className="contact-line"></div>
      <div className="main-container">
        <div className="col-6 image-wrapper">
          <img className="image-contact" src="/images/contact/jumbotronContact.png" alt="" />
        </div>
        <div style={{ height: '100%' }} className="col-6 body-container">
          <div style={{ height: '100%' }} className="d-flex flex-column">
            <div className="body-wrapper-container">
              <div className="col-7">
                <div className="text-contact color-primary font-asul">/ OUR LOCATION</div>
                <div className="text-body color-secondary font-mulish">
                  {info?.location || 'Semarang, Indonesia'}
                </div>
              </div>
              <div className="col-5">
                <div className="text-contact color-primary font-asul">/ CALL US</div>
                <div className="text-body color-secondary font-mulish">
                  {info?.phone || '+62 811 890 900'}
                </div>
              </div>
            </div>
            <div className="body-wrapper-container">
              <div className="col-7">
                <div className="text-contact color-primary font-asul">/ EMAIL</div>
                <div className="text-body color-secondary font-mulish">
                  {info?.email || 'homlab@gmail.com'}
                </div>
              </div>
              <div className="col-5">
                <div className="text-contact color-primary font-asul">/ INSTAGRAM</div>
                <div className="text-body color-secondary font-mulish">@____homlab</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
