'use client'
import { useEffect, useState } from 'react'

interface ContactInfoData {
  phone: string
  email: string
  location: string
  instagram: string
  tokopedia: string
}

const FIELDS: { key: keyof ContactInfoData; label: string; placeholder: string }[] = [
  { key: 'phone', label: 'Phone Number', placeholder: '+62 812 3456 7890' },
  { key: 'email', label: 'Email', placeholder: 'hello@homlab.com' },
  { key: 'location', label: 'Location', placeholder: 'Jakarta, Indonesia' },
  { key: 'instagram', label: 'Instagram Link', placeholder: 'https://instagram.com/homlab' },
  { key: 'tokopedia', label: 'Tokopedia Link', placeholder: 'https://tokopedia.com/homlab' },
]

export default function AdminContact() {
  const [form, setForm] = useState<ContactInfoData>({
    phone: '', email: '', location: '', instagram: '', tokopedia: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/contact-info')
      .then(r => r.json())
      .then(data => {
        if (data) setForm(prev => ({ ...prev, ...data }))
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    await fetch('/api/contact-info', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Contact Info</h1>
        <p style={{ color: '#888', fontSize: '14px', margin: '4px 0 0' }}>Manage your public contact details</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {label}
              </label>
              <input
                type="text"
                value={form[key]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '28px' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ backgroundColor: saved ? '#22c55e' : '#FE5C36', color: 'white', padding: '10px 28px', borderRadius: '8px', border: 'none', cursor: saving ? 'wait' : 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
