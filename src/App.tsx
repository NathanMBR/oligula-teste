import {
  MantineProvider,
  PreloadProvider,
  ReactRouterProvider
} from './providers'

import '@mantine/core/styles.css'

export const App = () => {
  return (
    <MantineProvider>
      <PreloadProvider>
        <ReactRouterProvider />
      </PreloadProvider>
    </MantineProvider>
  )
}
