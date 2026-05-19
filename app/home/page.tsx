import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JumbotronSlider from '@/components/JumbotronSlider'
import MarqueeTicker from '@/components/MarqueeTicker'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import { News } from '@/models/News'
import { Settings } from '@/models/Settings'
import Link from 'next/link'
import ArchiveSlider from '@/components/ArchiveSlider'
import FadeIn from '@/components/FadeIn'

interface IProduct {
  _id: string
  name: string
  description: string
  imageUrls: string[]
}

interface IArticle {
  _id: string
  title: string
  date: string
  excerpt: string
  imageUrls: string[]
}

async function getFeaturedProducts(): Promise<IProduct[]> {
  await connectDB()
  const products = await Product.find({ featured: true }).limit(3).lean()
  return JSON.parse(JSON.stringify(products))
}

async function getJumbotronImages(): Promise<string[]> {
  await connectDB()
  const setting = await Settings.findOne({ key: 'jumbotronImages' }).lean() as { value: string } | null
  if (setting?.value) return JSON.parse(setting.value)
  return ['/images/home-1.png']
}

async function getArchiveArticles(): Promise<IArticle[]> {
  await connectDB()
  const articles = await News.aggregate([{ $sample: { size: 3 } }])
  return JSON.parse(JSON.stringify(articles))
}

export default async function Home() {
  const [featuredProducts, jumbotronImages, archiveArticles] = await Promise.all([
    getFeaturedProducts(),
    getJumbotronImages(),
    getArchiveArticles(),
  ])

  return (
    <>
      <Navbar />

      <JumbotronSlider images={jumbotronImages} />

      <div className="line-home"></div>

      <div className="container">
        <br /><br /><br /><br /><br /><br/><br /><br /><br/>
        <FadeIn>
          <div className="color-primary">
            <div className="home-text-subtitle font-mulish">WHAT&apos;S ON</div>
          </div>
          <br />
          <div className="home-text-title font-asul color-primary">
            <div>Volumes From</div>
            <div>The Archive</div>
          </div>
          <br /><br />
          <div className="d-flex">
            <div className="col-1 line-home-body"></div>
            <div className="col-6 font-mulish color-primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Curabitur id justo magna. Vestibulum mattis viverra urna,
              eget dapibus quam. Proin vel sapien hendrerit, ullamcorper
              ex vitae, aliquam magna. Integer eget ex ac felis sagittis
              varius nec dapibus lectus. Nam sollicitudin justo quis magna
              commodo, non cursus leo auctor.
            </div>
          </div>
          <br /><br /><br />

          {archiveArticles.length >= 2 && (
            <ArchiveSlider articles={archiveArticles} />
          )}
          <br /><br /><br /><br />
        </FadeIn>
      </div>

      <MarqueeTicker />
      <br /><br /><br/><br /><br /><br/>
      <div className="container">
        {featuredProducts.length > 0 && (
          <div className="d-flex flex-column align-items-center">
            <div className="home-text-subtitle font-mulish color-primary">OUR PRODUCTS</div>
            <br />
            <div className="home-text-title font-asul color-primary">Our Products</div>
            <br />
            <div className="line-home-body-2"></div>
            <br />
            <div className="home-container-body-text font-mulish color-primary">
              Pellentesque sagittis hendrerit diam,
              eu hendrerit odio ultricies a. Curabitur
              tincidunt, sem et pretium consequat, massa
              ligula gravida ex, id dignissim quam risus
              et dolor.
            </div>
            <br /><br />

            <div className="d-flex">
              {featuredProducts.map(product => (
                <div key={product._id} className="col-4">
                  <Link href={`/product-details/${product._id}`} style={{ textDecoration: 'none' }}>
                    <div className="product-img-wrapper">
                      <img src={product.imageUrls?.[0]} alt={product.name} className="product-img-primary" />
                      {product.imageUrls?.[1] && (
                        <img src={product.imageUrls[1]} alt={product.name} className="product-img-secondary" />
                      )}
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                      <div className="container-text-product">
                        <div className="font-asul font-product-title color-primary">{product.name}</div>
                        <div className="font-mulish color-primary font-product-body">
                          {product.description.slice(0, 80)}...
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <br /><br />
            <div className="d-flex justify-content-center align">
              <Link href="/products">
                <button style={{ fontSize:'14px', lineHeight:'150%',  letterSpacing: '0.1em' }} type="button" className="pd-button-primary font-mulish">View More</button>
              </Link>
            </div>
            <br /><br /><br /><br />
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
