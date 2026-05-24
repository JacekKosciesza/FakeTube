import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: '1rem' }}>
        CodeTube
      </h1>
      <p style={{ fontSize: 18, opacity: 0.7, marginBottom: '2rem' }}>
        Open-source YouTube clone — documentation and articles
      </p>
      <Link
        href="/docs"
        style={{ fontSize: 16, textDecoration: 'underline' }}
      >
        Read the docs →
      </Link>
    </div>
  )
}
