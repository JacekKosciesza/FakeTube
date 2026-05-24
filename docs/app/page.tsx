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
        <a
          href="https://faketube.app/"
          target="_blank"
          rel="noreferrer"
          className="cta cta-primary"
        >
          Demo
        </a>
        <Link href="/docs" className="cta cta-secondary">
          Docs
        </Link>
        <Link href="/blog" className="cta cta-secondary">
          Blog
        </Link>
      </div>
    </main>
  )
}
