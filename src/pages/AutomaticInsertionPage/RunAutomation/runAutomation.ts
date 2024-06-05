import { invoke } from '@tauri-apps/api'

import { sleep } from '../../../helpers'
import { MouseButton } from '../../../types'
import type { AutomationData } from '../../../providers'

export type RunAutomationData = Pick<AutomationData, 'steps' | 'setVariable'>

/* eslint-disable no-await-in-loop */
export const runAutomation = async (data: RunAutomationData) => {
  const {
    steps,
    setVariable
  } = data

  for (const step of steps) {
    await sleep(1000)

    if (step.type === 'move')
      await invoke('move_mouse_to', { position: step.data })

    if (step.type === 'click')
      await invoke('click', { button: MouseButton[step.data.button] })

    if (step.type === 'write')
      await invoke('write', { text: step.data.text })

    if (step.type === 'readFile')
      setVariable(step.data.saveAs, step.data.content)
  }
}
/* eslint-enable no-await-in-loop */
