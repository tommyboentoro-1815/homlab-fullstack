'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface NewImage { type: 'new'; file: File; preview: string }
interface ExistingImage { type: 'existing'; url: string }
type ImageEntry = NewImage | ExistingImage

export default function EditProduct() {
  const router = useRouter()
  const { id } = useParams()
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' })
  const [images, setImages] = useState<ImageEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({ name: data.name, description: data.description, price: String(data.price), category: data.category ?? '' })
        const urls: string[] = data.imageUrls?.length ? data.imageUrls : (data.imageUrl ? [data.imageUrl] : [])
        const existing: ExistingImage[] = urls.map((url: string) => ({ type: 'existing', url }))
        setImages(existing)
        setFetching(false)
      })
  }, [id])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const entries: NewImage[] = files.map(file => ({ type: 'new', file, preview: URL.createObjectURL(file) }))
    setImages(prev => [...prev, ...entries])
    e.target.value = ''
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (images.length === 0) { setError('Please add at least one image'); return }
    setLoading(true)
    setError('')

    const imageUrls: string[] = []
    for (const img of images) {
      if (img.type === 'existing') {
        imageUrls.push(img.url)
      } else {
        const uploadData = new FormData()
        uploadData.append('file', img.file)
        uploadData.append('folder', 'homlab/products')
        const res = await fetch('/api/upload', { method: 'POST', body: uploadData })
        const { url, error: uploadError } = await res.json()
        if (uploadError) { setError('Image upload failed'); setLoading(false); return }
        imageUrls.push(url)
      }
    }

    const res = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price), imageUrls }),
    })

    if (res.ok) {
      router.push('/admin/products')
    } else {
      setError('Failed to update product')
      setLoading(false)
    }
  }

  if (fetching) return <div style={{ color: '#888' }}>Loading...</div>

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Link href="/admin/products" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>← Products</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Product Images</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img
                  src={img.type === 'existing' ? img.url : img.preview}
                  alt=""
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  style={{ position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', lineHeight: '22px', textAlign: 'center', padding: 0 }}
                >×</button>
              </div>
            ))}
            <div
              onClick={() => document.getElementById('img-input')?.click()}
              style={{ width: '100px', height: '100px', border: '2px dashed #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#aaa', fontSize: '28px', backgroundColor: '#fafafa' }}
            >+</div>
          </div>
          <input id="img-input" type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Name</label>
          <input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Description</label>
          <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Price (Rp)</label>
            <input required type="number" style={inputStyle} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <input style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          </div>
        </div>

        {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ backgroundColor: '#FE5C36', color: 'white', padding: '12px 28px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#444' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }
