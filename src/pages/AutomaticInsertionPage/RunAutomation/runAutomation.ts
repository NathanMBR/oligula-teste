import { invoke } from '@tauri-apps/api'

import { sleep } from '../../../helpers'
import { MouseButton } from '../../../types'

import type { Step } from '../Automation'

/* eslint-disable no-await-in-loop */
export const runAutomation = async (steps: Array<Step>) => {
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
      await invoke('write', { text: step.data.text })
      continue
    }
  }
}
/* eslint-enable no-await-in-loop */
