import MainLayout from '@/components/MainLayout'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import Link from 'next/link'

interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  category: string
  imageUrls: string[]
}

async function getProducts(): Promise<IProduct[]> {
  await connectDB()
  const products = await Product.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(products))
}

function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="col-4">
      <Link href={`/product-details/${product._id}`} style={{ textDecoration: 'none' }}>
        <div className="product-img-wrapper" style={{ aspectRatio: '1' }}>
          <img src={product.imageUrls?.[0]} alt={product.name} className="product-img-primary" style={{ aspectRatio: '1', objectFit: 'cover' }} />
          {product.imageUrls?.[1] && (
            <img src={product.imageUrls[1]} alt={product.name} className="product-img-secondary" />
          )}
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <div className="container-text-product">
            <div className="font-asul font-product-title color-primary">{product.name}</div>
            <div className="font-mulish color-primary font-product-body">
              {product.description.length > 80 ? product.description.slice(0, 80) + '...' : product.description}
            </div>
            <div className="font-mulish color-primary" style={{ marginTop: '8px', fontSize: '14px', fontWeight: '500' }}>
              Rp {product.price.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default async function Products() {
  const products = await getProducts()

  const rows = []
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3))
  }

  return (
    <MainLayout>
      <div className="text-subtitle color-primary font-mulish">PRODUCTS</div>
      <br />
      <div className="text-title color-primary font-asul">Our Products</div>
      <br />
      <div className="line-title"></div>
      <br /><br />
      {products.length === 0 ? (
        <div className="color-primary font-mulish" style={{ textAlign: 'center', padding: '80px 0' }}>
          No products available yet.
        </div>
      ) : (
        rows.map((row, i) => (
          <div key={i}>
            <div className="d-flex">
              {row.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            <br />
          </div>
        ))
      )}
      <div style={{ marginTop: '200px' }}></div>
    </MainLayout>
  )
}
