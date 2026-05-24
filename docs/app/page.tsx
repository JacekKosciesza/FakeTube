import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: '0.5rem' }}>
        CodeTube
      </h1>
      <p style={{ fontSize: 18, opacity: 0.7, marginBottom: '2rem' }}>
        Open-source YouTube clone — documentation and articles
      </p>
      <p>
        <Link href="/docs">Docs</Link>
        {' · '}
        <Link href="/blog">Blog</Link>
      </p>
    </div>
  )
}
