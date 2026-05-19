import MainLayout from '@/components/MainLayout'
import { connectDB } from '@/lib/mongodb'
import { News } from '@/models/News'
import Link from 'next/link'

interface IArticle {
  _id: string
  title: string
  date: string
  excerpt: string
  imageUrls: string[]
}

async function getArticles(): Promise<IArticle[]> {
  await connectDB()
  const articles = await News.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(articles))
}

function ArticleCard({ article }: { article: IArticle }) {
  return (
    <div style={{ height: 'auto', width: '47%' }} className="col-6">
      <Link href={`/news-details/${article._id}`} style={{ textDecoration: 'none' }}>
        <div className="image-wrapper-body-news">
          <img src={article.imageUrls?.[0]} alt={article.title} />
        </div>
        <div className="container-body-article font-mulish color-secondary">
          <div className="news-subtitle">{article.date}</div>
          <div className="text-body-article-title font-asul">{article.title}</div>
          <div className="text-body-article-subtitle">{article.excerpt}</div>
        </div>
      </Link>
    </div>
  )
}

export default async function NewsPage() {
  const articles = await getArticles()
  const featured = articles[0]
  const rest = articles.slice(1)
  const rows = []
  for (let i = 0; i < rest.length; i += 2) {
    rows.push(rest.slice(i, i + 2))
  }

  return (
    <MainLayout>
      <div className="font-mulish color-primary news-subtitle">BLOG</div>
      <br />
      <div className="font-asul color-primary news-title">Further Reading</div>
      <br />
      <div className="news-line"></div>
      <br /><br /><br />

      {featured && (
        <Link href={`/news-details/${featured._id}`} style={{ textDecoration: 'none' }}>
          <div className="d-flex">
            <div className="d-flex col-6 align-items-center">
              <div className="news-headline-container">
                <div className="news-subtitle color-secondary font-mulish">{featured.date}</div>
                <br />
                <div className="font-asul color-secondary news-headline-title">{featured.title}</div>
                <br />
                <div className="font-mulish color-secondary news-headline-body">{featured.excerpt}</div>
              </div>
            </div>
            <div className="col-6 img-wrapper-news">
              <img src={featured.imageUrls?.[0]} alt={featured.title} />
            </div>
          </div>
        </Link>
      )}

      {rows.length > 0 && (
        <div className="news-container-wrapper-body-article ">
          {rows.map((row, i) => (
            <div key={i} className="d-flex justify-content-between news-container-body-article-gap ">
              {row.map(a => <ArticleCard key={a._id} article={a} />)}
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  )
}
