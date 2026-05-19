'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit() {
    if (!form.name || !form.phone || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <div>
        <div className="container-text-input">YOUR NAME</div>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', width: '100%', color: 'white', outline: 'none', padding: '4px 0' }}
        />
      </div>
      <div style={{ marginTop: '16px' }}>
        <div className="container-text-input">PHONE NUMBER</div>
        <input
          type="text"
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', width: '100%', color: 'white', outline: 'none', padding: '4px 0' }}
        />
      </div>
      <div style={{ marginTop: '16px' }}>
        <div className="container-text-input">MESSAGES</div>
        <input
          type="text"
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', width: '100%', color: 'white', outline: 'none', padding: '4px 0' }}
        />
      </div>
      <div className="container-text-input" style={{ marginTop: '24px' }}>
        {status === 'sent' ? (
          <div style={{ color: '#86efac', fontSize: '14px' }}>Message sent successfully!</div>
        ) : status === 'error' ? (
          <div style={{ color: '#fca5a5', fontSize: '14px' }}>Failed to send. Please try again.</div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'sending' || !form.name || !form.phone || !form.message}
            className="btn btn-outline-light button-container"
            style={{ opacity: (!form.name || !form.phone || !form.message) ? 0.5 : 1 }}
          >
            {status === 'sending' ? 'Sending...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  )
}
