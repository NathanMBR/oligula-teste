import {
  createContext,
  useState,
  type PropsWithChildren
} from 'react'

export type HeaderData = {
  pageTitle: string
  setPageTitle: (title: string) => void

  pageSubtitle: string
  setPageSubtitle: (subtitle: string) => void
}

const defaultHeaderData: HeaderData = {
  pageTitle: '',
  setPageTitle: () => {},

  pageSubtitle: '',
  setPageSubtitle: () => {}
}

export const HeaderContext = createContext<HeaderData>(defaultHeaderData)

export type HeaderProviderProps = Required<PropsWithChildren>

export const HeaderProvider = (props: HeaderProviderProps) => {
  const { children } = props

  const [pageTitle, setPageTitle] = useState(defaultHeaderData.pageTitle)
  const [pageSubtitle, setPageSubtitle] = useState(defaultHeaderData.pageSubtitle)

  const headerData: HeaderData = {
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
