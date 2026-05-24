import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(
  components?: Partial<typeof docsComponents>
): typeof docsComponents {
  return {
    ...docsComponents,
    ...components
  }
}
