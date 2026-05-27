import MainLayout from '@/components/MainLayout'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import { News } from '@/models/News'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  category: string
  imageUrls: string[]
}

async function getProduct(id: string): Promise<IProduct | null> {
  await connectDB()
  const product = await Product.findById(id).lean()
  if (!product) return null
  return JSON.parse(JSON.stringify(product))
}

async function getFurtherReading(): Promise<{ _id: string; title: string; date: string; imageUrls: string[] }[]> {
  await connectDB()
  const articles = await News.aggregate([{ $sample: { size: 2 } }])
  return JSON.parse(JSON.stringify(articles))
}

async function getRecommended(excludeId: string): Promise<IProduct[]> {
  await connectDB()
  const { default: mongoose } = await import('mongoose')
  const products = await Product.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(excludeId) } } },
    { $sample: { size: 3 } },
  ])
  return JSON.parse(JSON.stringify(products))
}


export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) notFound()
  const [recommended, furtherArticles] = await Promise.all([
    getRecommended(params.id),
    getFurtherReading(),
  ])

  const furtherReadingSection = furtherArticles.length > 0 ? (
    <div className="font-mulish color-primary pd-main-container">
      <div className="container">
        <div className="pd-text-subtitle">WHAT&apos;S ON</div>
        <br />
        <div className="font-asul pd-text-h1">Further Reading</div>
        <br /><br />
        <div className="d-flex align-items-center" style={{ gap: '24px' }}>
          {furtherArticles[0] && (
            <Link href={`/news-details/${furtherArticles[0]._id}`} style={{ textDecoration: 'none', width: '55%', flexShrink: 0, position: 'relative', height: '500px', display: 'block' }}>
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={furtherArticles[0].imageUrls?.[0]} alt={furtherArticles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="further-reading-img" />
              </div>
              <div className="pd-text-reading-left pd-container-absolute-left font-asul color-white">
                {furtherArticles[0].title.split(' ').slice(0, 4).join(' ')}
              </div>
              <div className="color-white pd-container-absolute-right pd-text-reading-right">
                {furtherArticles[0].date}
              </div>
            </Link>
          )}
          {furtherArticles[1] && (
            <Link href={`/news-details/${furtherArticles[1]._id}`} style={{ textDecoration: 'none', flex: 1, display: 'block', height: '400px', overflow: 'hidden' }}>
              <img src={furtherArticles[1].imageUrls?.[0]} alt={furtherArticles[1].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="further-reading-img" />
            </Link>
          )}
        </div>
        <br /><br />
        <div>
          <Link href="/news">
            <button style={{ backgroundColor: '#2C3F2C' }} type="button" className="pd-button-primary">
              READ MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : null

  return (
    <MainLayout bottomContent={furtherReadingSection}>
      <div className="d-flex">
        <div className="image-wrapper col-6">
          <img className="image-content" src={product.imageUrls?.[0]} alt={product.name} />
        </div>
        <div className="mt-5 product-details-container col-6">
          <div className="font-asul color-primary product-details-text-title">{product.name}</div>
          <br />
          <div className="pd-line"></div>
          <br /><br />
          <div className="d-flex color-primary">
            <div className="col-4">
              <div className="font-mulish pd-text-subtitle">Category</div>
              <div className="font-asul pd-text-title">{product.category || '—'}</div>
            </div>
            <div className="col-4">
              <div className="font-mulish pd-text-subtitle">Price</div>
              <div className="font-asul pd-text-title">Rp {product.price.toLocaleString('id-ID')}</div>
            </div>
          </div>
          <br /><br />
          <div className="font-mulish color-secondary pd-text-body">
            {product.description}
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
      {recommended.length > 0 && (
        <>
          <div className="d-flex flex-column align-items-center">
            <div className="home-text-subtitle font-mulish color-primary">YOU MAY ALSO LIKE</div>
            <br />
            <div className="home-text-title font-asul color-primary">Recommended Products</div>
          </div>
          <br /><br />
          <div className="d-flex">
            {recommended.map(rec => (
              <div key={rec._id} className="col-4">
                <Link href={`/product-details/${rec._id}`} style={{ textDecoration: 'none' }}>
                  <div className="product-img-wrapper">
                    <img src={rec.imageUrls?.[0]} alt={rec.name} className="product-img-primary" />
                    {rec.imageUrls?.[1] && (
                      <img src={rec.imageUrls[1]} alt={rec.name} className="product-img-secondary" />
                    )}
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <div className="container-text-product">
                      <div className="font-asul font-product-title color-primary">{rec.name}</div>
                      <div className="font-mulish color-primary font-product-body">
                        {rec.description.slice(0, 80)}...
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
      <br /><br /><br />
    </MainLayout>
  )
}
