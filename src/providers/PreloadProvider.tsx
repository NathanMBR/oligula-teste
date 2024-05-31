import {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren
} from 'react'
import {
  Center,
  Loader
} from '@mantine/core'
import {
  app,
  path
} from '@tauri-apps/api'

const defaultPreloadData = {
  app: {
    version: 'unknown',
    configDir: ''
  }
}

export const PreloadContext = createContext(defaultPreloadData)

export type PreloadProviderProps = Required<PropsWithChildren>

export const PreloadProvider = (props: PreloadProviderProps) => {
  const { children } = props

  const [isLoading, setIsLoading] = useState(false)
  const [appVersion, setAppVersion] = useState(defaultPreloadData.app.version)
  const [appConfigDir, setAppConfigDir] = useState(defaultPreloadData.app.configDir)

  /* eslint-disable no-console */
  const loadVersion = async () => {
    try {
      const version = await app.getVersion()
      setAppVersion(version)
    } catch (error) {
      console.error('Failed to load app version:\n', error)
    }
  }

  const loadConfigPath = async () => {
    try {
      const configDir = await path.configDir()
      setAppConfigDir(configDir)
    } catch (error) {
      console.error('Failed to load app config path:\n' + error)
    }
  }
  /* eslint-enable no-console */

  useEffect(
    () => {
      setIsLoading(true)

      Promise.all([
        loadVersion(),
        loadConfigPath()
      ])
        .finally(() => setIsLoading(false))
    },
    []
  )

  if (isLoading)
    return (
      <Center h='100vh'>
        <Loader />
      </Center>
    )

  return (
    <PreloadContext.Provider value={{
      app: {
        version: appVersion,
        configDir: appConfigDir
      }
    }}>
      {children}
    </PreloadContext.Provider>
  )
}
