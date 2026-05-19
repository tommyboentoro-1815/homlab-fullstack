import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { connectDB } from '@/lib/mongodb'
import { News } from '@/models/News'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface IArticle {
  _id: string
  title: string
  date: string
  excerpt: string
  subheading: string
  paragraphs: string[]
  author: string
  imageUrls: string[]
}

async function getRelated(excludeId: string): Promise<IArticle[]> {
  await connectDB()
  const { default: mongoose } = await import('mongoose')
  const articles = await News.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(excludeId) } } },
    { $sample: { size: 3 } },
  ])
  return JSON.parse(JSON.stringify(articles))
}

async function getArticle(id: string): Promise<IArticle | null> {
  await connectDB()
  const article = await News.findById(id).lean()
  if (!article) return null
  return JSON.parse(JSON.stringify(article))
}

export default async function NewsDetails({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)
  if (!article) notFound()
  const related = await getRelated(params.id)

  const [heroImage, largeBodyImage, smallImage1, smallImage2] = article.imageUrls ?? []

  return (
    <>
      <div className="main-img-news-detail" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'white', opacity: 0.6, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <div className="container">
            <div className="d-flex align-items-center main-container-news-details">
              <div className="color-secondary col-6 d-flex flex-column align-items-start" style={{ paddingRight: '48px' }}>
                <div className="font-mulish" style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '16px', opacity: 0.7 }}>NEWS</div>
                <div className="news-detail-title-jumbotron font-asul">
                  {article.title}
                </div>
                <br />
                <div className="about-heading font-mulish">
                  {article.date}
                </div>
                <br />
                <div className="about-subheading font-asul">
                  {article.excerpt}
                </div>
              </div>
              {heroImage && (
                <div className="col-6">
                  <img src={heroImage} alt={article.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="container about-main-container-news">
          <div style={{ height: 'auto' }} className="d-flex">

            {/* Left column — text */}
            <div className="col-6 font-mulish color-secondary">
              <div className="about-subheading font-asul" style={{ width: '65%', marginTop: '40px' }}>
                {article.subheading}
              </div>
              <br /><br />
              <div style={{ width: '50%', height: '1px', backgroundColor: '#2C3F2C' }}></div>
              <br />
              <div className="color-secondary about-body-text">
                {article.paragraphs?.map((p, i) => (
                  <div key={i}>
                    <br /><br />
                    <div style={{ width: '65%' }}>{p}</div>
                  </div>
                ))}
                <br /><br />
                <div className="about-subheading font-asul">{article.author}</div>
              </div>
            </div>

            {/* Right column — images */}
            <div className="col-6 d-flex flex-column justify-content-between">
              {largeBodyImage && (
                <div style={{ marginBottom: '10px', height: '454px', width: '100%' }}>
                  <img className="images-wrapper" src={largeBodyImage} alt="" style={{ height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              {(smallImage1 || smallImage2) && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  {smallImage1 && (
                    <div style={{ flex: 1, height: '280px', overflow: 'hidden' }}>
                      <img src={smallImage1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  {smallImage2 && (
                    <div style={{ flex: 1, height: '280px', overflow: 'hidden' }}>
                      <img src={smallImage2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ backgroundColor: '#2C3F2C', padding: '128px 0' }}>
          <div className="container">
            <div className="font-asul" style={{ color: '#FE5C36', fontSize: '53px', marginBottom: '40px' }}>You Will Like Also</div>
            <div className="d-flex gap-5">
              {related.map(item => (
                <Link key={item._id} href={`/news-details/${item._id}`} style={{ flex: 1, textDecoration: 'none' }}>
                  <div style={{ overflow: 'hidden', marginBottom: '20px', height: '300px' }}>
                    <img src={item.imageUrls?.[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="font-mulish" style={{ color: '#FE5C36', fontSize: '13px', marginBottom: '10px', letterSpacing: '1px' , fontWeight:'200'}}>{item.date}</div>
                  <div className="font-asul col-10" style={{ color: '#FE5C36', fontSize: '21px', fontWeight: '400', marginBottom: '10px', lineHeight: '1.3' , letterSpacing:'1%' }}>{item.title}</div>
                  <div className="font-mulish col-12" style={{ color: '#FE5C36', fontSize: '13px', lineHeight: '150%' ,fontWeight: '200', letterSpacing:'0.5%'}}>
                    {item.excerpt.slice(0, 120)}...
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
