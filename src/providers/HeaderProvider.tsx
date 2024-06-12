import {
  createContext,
  useState,
  type PropsWithChildren
} from 'react'

export type HeaderData = {
  backHref: string
  setBackHref: (href: string) => void

  pageTitle: string
  setPageTitle: (title: string) => void

  pageSubtitle: string
  setPageSubtitle: (subtitle: string) => void
}

const defaultHeaderData: HeaderData = {
  backHref: '/',
  setBackHref: () => {},

  pageTitle: '',
  setPageTitle: () => {},

  pageSubtitle: '',
  setPageSubtitle: () => {}
}

export const HeaderContext = createContext<HeaderData>(defaultHeaderData)

export type HeaderProviderProps = Required<PropsWithChildren>

export const HeaderProvider = (props: HeaderProviderProps) => {
  const { children } = props

  const [backHref, setBackHref] = useState(defaultHeaderData.backHref)
  const [pageTitle, setPageTitle] = useState(defaultHeaderData.pageTitle)
  const [pageSubtitle, setPageSubtitle] = useState(defaultHeaderData.pageSubtitle)

  const headerData: HeaderData = {
    backHref,
    setBackHref,

    pageTitle,
    setPageTitle,

    pageSubtitle,
    setPageSubtitle
  }

  return (
    <HeaderContext.Provider value={headerData}>
      {children}
    </HeaderContext.Provider>
  )
}
