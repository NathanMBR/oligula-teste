import { useContext } from 'react'
import { invoke } from '@tauri-apps/api'
import { IconSettingsAutomation } from '@tabler/icons-react'

import { AutomationContext } from '../../../providers'
import { FAB } from '../../../components'
import { sleep } from '../../../helpers'
import { MouseButton } from '../../../types'

export const RunAutomation = () => {
  const {
    steps
  } = useContext(AutomationContext)

  const runAutomation = async () => {
    /* eslint-disable no-await-in-loop */
    for (const step of steps) {
      await sleep(1000)

      if (step.type === 'move') {
        await invoke('move_mouse_to', { position: step.data })
        continue
      }

      if (step.type === 'click') {
        await invoke('click', { button: MouseButton[step.data.button] })
        continue
      }

      if (step.type === 'write') {
        await invoke('write', { text: 'Hello world' })
        continue
      }
    }
    /* eslint-enable no-await-in-loop */
  }

  return (
    <FAB
      ActionIconProps={{ variant: 'filled' }}
      onClick={runAutomation}
      hidden={steps.length <= 0}
      icon={<IconSettingsAutomation />}
    />
  )
}
