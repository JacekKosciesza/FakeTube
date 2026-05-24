import { generateStaticParamsFor, importPage } from 'nextra/pages'
import type { ComponentType, ReactNode } from 'react'
import { useMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

type PageProps = {
  params: Promise<{ mdxPath: string[] }>
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

type WrapperProps = {
  toc?: unknown
  metadata?: unknown
  sourceCode?: unknown
  children?: ReactNode
}

const Wrapper = useMDXComponents().wrapper as ComponentType<WrapperProps>

export default async function Page(props: PageProps) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
    params.mdxPath
  )
  const title = (metadata as { title?: string } | undefined)?.title
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {title && <h1 className="ct-page-title">{title}</h1>}
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
