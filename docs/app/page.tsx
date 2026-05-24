import Link from 'next/link'
import { Logo } from './_components/Logo'

export default function HomePage() {
  return (
    <main className="hero">
      <Logo size={88} />
      <h1>CodeTube<sup style={{ fontSize: '0.35em', verticalAlign: 'super', opacity: 0.35, fontWeight: 400 }}>&reg;</sup></h1>
      <p className="tagline">
        Learn advanced software engineering by building a YouTube clone.
      </p>
      <div className="ctas">
        <Link href="/docs" className="cta cta-primary">
          Read the docs
        </Link>
        <Link href="/blog" className="cta cta-secondary">
          Read the blog
        </Link>
      </div>
    </main>
  )
}
