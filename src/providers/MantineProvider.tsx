
import { MantineProvider as CoreMantineProvider } from '@mantine/core'
import type { PropsWithChildren } from 'react'

export type MantineProviderProps = Required<PropsWithChildren>

export const MantineProvider = (props: MantineProviderProps) => {
  const { children } = props

  return (
    <CoreMantineProvider defaultColorScheme='light'>
      {
        children
      }
    </CoreMantineProvider>
  )
}
