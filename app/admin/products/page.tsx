'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  price: number
  category: string
  featured: boolean
  imageUrls?: string[]
  imageUrl?: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    const res = await fetch('/api/products', { cache: 'no-store' })
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    setProducts(products.filter(p => p._id !== id))
  }

  function handleStarClick(product: Product) {
    const isFeatured = product.featured === true
    const featuredCount = products.filter(p => p.featured === true).length
    if (!isFeatured && featuredCount >= 3) {
      alert('Maximum 3 featured products allowed. Unstar another product first.')
      return
    }
    setPendingProduct(product)
  }

  async function confirmToggle() {
    if (!pendingProduct) return
    setConfirming(true)
    const isFeatured = pendingProduct.featured === true
    const newFeatured = !isFeatured
    try {
      const res = await fetch(`/api/products/${pendingProduct._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured }),
      })
      if (res.ok) {
        setProducts(prev => prev.map(p =>
          p._id === pendingProduct._id ? { ...p, featured: newFeatured } : p
        ))
      } else {
        alert('Failed to update. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setConfirming(false)
      setPendingProduct(null)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Products</h1>
          <p style={{ color: '#888', fontSize: '14px', margin: '4px 0 0' }}>
            {products.length} total · {products.filter(p => p.featured === true).length} featured on homepage
          </p>
        </div>
        <Link href="/admin/products/new" style={{ backgroundColor: '#FE5C36', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div style={{ color: '#888' }}>Loading...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <div>No products yet. Add your first one!</div>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Featured</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: product.featured === true ? '#fffbf9' : 'white' }}>
                  <td style={{ padding: '16px' }}>
                    <img src={product.imageUrls?.[0] ?? product.imageUrl} alt={product.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                  </td>
                  <td style={{ padding: '16px', fontWeight: '500', color: '#1a1a1a' }}>{product.name}</td>
                  <td style={{ padding: '16px', color: '#666', fontSize: '14px' }}>{product.category || '—'}</td>
                  <td style={{ padding: '16px', color: '#1a1a1a', fontWeight: '500' }}>Rp {product.price.toLocaleString()}</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleStarClick(product)}
                      title={product.featured === true ? 'Remove from homepage' : 'Feature on homepage'}
                      style={{
                        fontSize: '20px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: product.featured === true ? '#FE5C36' : '#ddd',
                        transition: 'color 0.15s',
                      }}
                    >
                      ★
                    </button>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/products/${product._id}/edit`} style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '6px', textDecoration: 'none', color: '#444' }}>Edit</Link>
                      <button onClick={() => handleDelete(product._id)} style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #fca5a5', borderRadius: '6px', color: '#ef4444', background: 'none', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {pendingProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', width: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '16px' }}>
              {pendingProduct.featured === true ? '★' : '☆'}
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px', textAlign: 'center' }}>
              {pendingProduct.featured === true ? 'Remove from Homepage?' : 'Feature on Homepage?'}
            </h2>
            <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', margin: '0 0 24px' }}>
              {pendingProduct.featured === true
                ? `"${pendingProduct.name}" will no longer appear on the homepage.`
                : `"${pendingProduct.name}" will be shown in the featured section on the homepage.`}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setPendingProduct(null)}
                disabled={confirming}
                style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px', background: 'none', cursor: 'pointer', fontSize: '14px', color: '#444' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                disabled={confirming}
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', backgroundColor: '#FE5C36', color: 'white', cursor: confirming ? 'wait' : 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                {confirming ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = { padding: '16px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }
