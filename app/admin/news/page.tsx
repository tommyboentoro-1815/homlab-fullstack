'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Article {
  _id: string
  title: string
  author: string
  imageUrls?: string[]
  imageUrl?: string
  createdAt: string
}

export default function AdminNews() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchArticles() }, [])

  async function fetchArticles() {
    const res = await fetch('/api/news')
    const data = await res.json()
    setArticles(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return
    await fetch(`/api/news/${id}`, { method: 'DELETE' })
    setArticles(articles.filter(a => a._id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>News & Articles</h1>
          <p style={{ color: '#888', fontSize: '14px', margin: '4px 0 0' }}>{articles.length} total</p>
        </div>
        <Link href="/admin/news/new" style={{ backgroundColor: '#FE5C36', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          + Add Article
        </Link>
      </div>

      {loading ? (
        <div style={{ color: '#888' }}>Loading...</div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📰</div>
          <div>No articles yet. Write your first one!</div>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '16px' }}>
                    <img src={article.imageUrls?.[0] ?? article.imageUrl} alt={article.title} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                  </td>
                  <td style={{ padding: '16px', fontWeight: '500', color: '#1a1a1a' }}>{article.title}</td>
                  <td style={{ padding: '16px', color: '#666', fontSize: '14px' }}>{article.author || '—'}</td>
                  <td style={{ padding: '16px', color: '#666', fontSize: '14px' }}>{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/news/${article._id}/edit`} style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '6px', textDecoration: 'none', color: '#444' }}>Edit</Link>
                      <button onClick={() => handleDelete(article._id)} style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #fca5a5', borderRadius: '6px', color: '#ef4444', background: 'none', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = { padding: '16px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }
