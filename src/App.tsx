import {
  MantineProvider,
  PreloadProvider,
  HeaderProvider,
  ReactRouterProvider
} from './providers'

import '@mantine/core/styles.css'

export const App = () => {
  return (
    <MantineProvider>
      <PreloadProvider>
        <HeaderProvider>
          <ReactRouterProvider />
        </HeaderProvider>
      </PreloadProvider>
    </MantineProvider>
  )
}
