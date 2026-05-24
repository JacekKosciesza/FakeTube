import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'CodeTube',
    template: '%s — CodeTube'
  },
  description: 'Open-source YouTube clone — documentation and articles'
}

const navbar = (
  <Navbar
    logo={<b>CodeTube</b>}
    projectLink="https://github.com/JacekKosciesza/FakeTube"
  />
)

const footer = (
  <Footer>MIT {new Date().getFullYear()} © CodeTube</Footer>
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
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/JacekKosciesza/FakeTube/tree/main/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
