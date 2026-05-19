'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface NewImage { type: 'new'; file: File; preview: string }
interface ExistingImage { type: 'existing'; url: string }
type ImageEntry = NewImage | ExistingImage

export default function EditArticle() {
  const router = useRouter()
  const { id } = useParams()
  const [form, setForm] = useState({ title: '', date: '', excerpt: '', subheading: '', author: '', tags: '' })
  const [paragraphs, setParagraphs] = useState<string[]>([''])
  const [images, setImages] = useState<ImageEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          title: data.title ?? '',
          date: data.date ?? '',
          excerpt: data.excerpt ?? '',
          subheading: data.subheading ?? '',
          author: data.author ?? '',
          tags: (data.tags ?? []).join(', '),
        })
        setParagraphs(data.paragraphs?.length ? data.paragraphs : [''])
        const urls: string[] = data.imageUrls?.length ? data.imageUrls : (data.imageUrl ? [data.imageUrl] : [])
        setImages(urls.map((url: string) => ({ type: 'existing', url })))
        setFetching(false)
      })
  }, [id])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setImages(prev => [...prev, ...files.map(file => ({ type: 'new' as const, file, preview: URL.createObjectURL(file) }))])
    e.target.value = ''
  }

  function removeImage(i: number) { setImages(prev => prev.filter((_, idx) => idx !== i)) }
  function addParagraph() { setParagraphs(prev => [...prev, '']) }
  function removeParagraph(i: number) { setParagraphs(prev => prev.filter((_, idx) => idx !== i)) }
  function updateParagraph(i: number, val: string) { setParagraphs(prev => prev.map((p, idx) => idx === i ? val : p)) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (images.length === 0) { setError('Please add at least one image'); return }
    setLoading(true)
    setError('')

    const imageUrls: string[] = []
    for (const img of images) {
      if (img.type === 'existing') { imageUrls.push(img.url); continue }
      const uploadData = new FormData()
      uploadData.append('file', img.file)
      uploadData.append('folder', 'homlab/news')
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData })
      const { url, error: uploadError } = await res.json()
      if (uploadError) { setError('Image upload failed'); setLoading(false); return }
      imageUrls.push(url)
    }

    const res = await fetch(`/api/news/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        paragraphs: paragraphs.filter(p => p.trim()),
        imageUrls,
      }),
    })

    if (res.ok) router.push('/admin/news')
    else { setError('Failed to update article'); setLoading(false) }
  }

  if (fetching) return <div style={{ color: '#888' }}>Loading...</div>

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Link href="/admin/news" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>← News</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Edit Article</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Images */}
        <section style={sectionStyle}>
          <div style={sectionTitleStyle}>Images</div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
            Order matters: 1st = Hero, 2nd = Large body, 3rd & 4th = Small bottom images
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={img.type === 'existing' ? img.url : img.preview} alt="" style={thumbStyle} />
                <div style={thumbLabelStyle}>{i + 1}</div>
                <button type="button" onClick={() => removeImage(i)} style={removeBtn}>×</button>
              </div>
            ))}
            <div onClick={() => document.getElementById('img-input')?.click()} style={addThumbStyle}>+</div>
          </div>
          <input id="img-input" type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
        </section>

        {/* Jumbotron info */}
        <section style={sectionStyle}>
          <div style={sectionTitleStyle}>Jumbotron</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Title</label>
              <input required style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input required style={inputStyle} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="e.g. 20 JANUARY 2022" />
            </div>
            <div>
              <label style={labelStyle}>Excerpt <span style={{ fontWeight: 400, color: '#888' }}>(short teaser shown in hero)</span></label>
              <textarea required rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Body */}
        <section style={sectionStyle}>
          <div style={sectionTitleStyle}>Body</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Subheading <span style={{ fontWeight: 400, color: '#888' }}>(large text at top of body)</span></label>
              <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.subheading} onChange={e => setForm({ ...form, subheading: e.target.value })} />
            </div>

            <div>
              <label style={labelStyle}>Paragraphs</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {paragraphs.map((p, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>Paragraph {i + 1}</div>
                    <textarea
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', paddingRight: '40px' }}
                      value={p}
                      onChange={e => updateParagraph(i, e.target.value)}
                    />
                    {paragraphs.length > 1 && (
                      <button type="button" onClick={() => removeParagraph(i)} style={{ position: 'absolute', top: '24px', right: '8px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>×</button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={addParagraph} style={{ marginTop: '8px', fontSize: '13px', color: '#FE5C36', background: 'none', border: '1px dashed #FE5C36', borderRadius: '6px', padding: '6px 16px', cursor: 'pointer' }}>
                + Add Paragraph
              </button>
            </div>

            <div>
              <label style={labelStyle}>Author</label>
              <input required style={inputStyle} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="e.g. Article by homlab" />
            </div>
          </div>
        </section>

        {/* Meta */}
        <section style={sectionStyle}>
          <div style={sectionTitleStyle}>Meta</div>
          <div>
            <label style={labelStyle}>Tags <span style={{ fontWeight: 400, color: '#888' }}>(comma separated)</span></label>
            <input style={inputStyle} value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="pottery, ceramics" />
          </div>
        </section>

        {error && <div style={{ color: '#ef4444', fontSize: '13px' }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ backgroundColor: '#FE5C36', color: 'white', padding: '12px 28px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

const sectionStyle: React.CSSProperties = { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
const sectionTitleStyle: React.CSSProperties = { fontSize: '13px', fontWeight: '700', color: '#2C3F2C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#444' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }
const thumbStyle: React.CSSProperties = { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee', display: 'block' }
const thumbLabelStyle: React.CSSProperties = { position: 'absolute', bottom: '4px', left: '4px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '11px', borderRadius: '4px', padding: '1px 6px' }
const removeBtn: React.CSSProperties = { position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', lineHeight: '22px', textAlign: 'center', padding: 0 }
const addThumbStyle: React.CSSProperties = { width: '100px', height: '100px', border: '2px dashed #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#aaa', fontSize: '28px', backgroundColor: '#fafafa' }
