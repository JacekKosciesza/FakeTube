import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { Wordmark } from './_components/Logo'

export const metadata = {
  title: {
    default: 'CodeTube',
    template: '%s — CodeTube'
  },
  description: 'Learn advanced software engineering by building a YouTube clone'
}

const navbar = (
  <Navbar
    logo={<Wordmark />}
    projectLink="https://github.com/JacekKosciesza/CodeTube"
  />
)

const search = <Search placeholder="Search" />

const footer = (
  <Footer>
    <div className="ct-footer-inner">
      Built by{' '}
      <a
        href="https://www.linkedin.com/in/jacekkosciesza/"
        target="_blank"
        rel="noreferrer"
      >
        Jacek Kościesza
      </a>
    </div>
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          search={search}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/JacekKosciesza/CodeTube/tree/main/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
