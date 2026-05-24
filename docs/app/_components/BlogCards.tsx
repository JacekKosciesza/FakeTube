import { getPageMap } from 'nextra/page-map'

type PageItem = {
  name: string
  route: string
  frontMatter?: {
    title?: string
    date?: string
    description?: string
    cover?: string
    readingTime?: number
  }
}

export async function BlogCards() {
  const pageMap = (await getPageMap('/blog')) as PageItem[]

  const articles = pageMap.filter(
    (p) => p.name !== 'index' && p.frontMatter?.date
  )

  return (
    <div className="ct-blog-grid">
      {articles.map((a) => (
        <a key={a.name} href={a.route} className="ct-blog-card">
          {a.frontMatter?.cover && (
            <img
              src={a.frontMatter.cover}
              alt=""
              className="ct-blog-card-cover"
            />
          )}
          <div className="ct-blog-card-body">
            <h3 className="ct-blog-card-title">{a.frontMatter?.title}</h3>
            <p className="ct-blog-card-meta">
              {a.frontMatter?.date &&
                new Date(a.frontMatter.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              {a.frontMatter?.readingTime &&
                ` · ${a.frontMatter.readingTime} min read`}
            </p>
            {a.frontMatter?.description && (
              <p className="ct-blog-card-desc">{a.frontMatter.description}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}
