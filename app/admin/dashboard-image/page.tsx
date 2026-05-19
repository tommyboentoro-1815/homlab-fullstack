'use client'
import { useEffect, useState } from 'react'

const MAX_IMAGES = 5

export default function DashboardImage() {
  const [images, setImages] = useState<string[]>(Array(MAX_IMAGES).fill(''))
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data.jumbotronImages) {
        const parsed: string[] = JSON.parse(data.jumbotronImages)
        const padded = [...parsed, ...Array(MAX_IMAGES).fill('')].slice(0, MAX_IMAGES)
        setImages(padded)
      }
    })
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingIndex(index)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'homlab/jumbotron')
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    setImages(prev => prev.map((img, i) => i === index ? data.url : img))
    setUploadingIndex(null)
  }

  function handleRemove(index: number) {
    setImages(prev => prev.map((img, i) => i === index ? '' : img))
  }

  async function handleSave() {
    setSaving(true)
    const filled = images.filter(Boolean)
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jumbotronImages: JSON.stringify(filled) }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Dashboard Image</h1>
        <p style={{ color: '#888', fontSize: '14px', margin: '4px 0 0' }}>Upload up to 5 images for the homepage slider</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {images.map((url, index) => (
            <div key={index}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Slide {index + 1}
              </div>
              <div style={{ height: '160px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', border: '2px dashed #e0e0e0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {url ? (
                  <>
                    <img src={url} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => handleRemove(index)}
                      style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', cursor: 'pointer', fontSize: '14px', lineHeight: '24px', textAlign: 'center' }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <label style={{ cursor: uploadingIndex === index ? 'wait' : 'pointer', textAlign: 'center', padding: '12px' }}>
                    <div style={{ fontSize: '24px', color: '#ccc' }}>+</div>
                    <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>
                      {uploadingIndex === index ? 'Uploading...' : 'Upload'}
                    </div>
                    <input type="file" accept="image/*" onChange={e => handleUpload(e, index)} style={{ display: 'none' }} disabled={uploadingIndex !== null} />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || images.every(img => !img)}
          style={{ backgroundColor: saved ? '#22c55e' : '#FE5C36', color: 'white', padding: '10px 28px', borderRadius: '8px', border: 'none', cursor: saving ? 'wait' : 'pointer', fontSize: '14px', fontWeight: '600', opacity: images.every(img => !img) ? 0.5 : 1 }}
        >
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
