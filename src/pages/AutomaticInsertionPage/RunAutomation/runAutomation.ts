import { invoke } from '@tauri-apps/api'

import { sleep } from '../../../helpers'
import { MouseButton } from '../../../types'
import type { AutomationData } from '../../../providers'

export type RunAutomationData = Pick<
  AutomationData,
  'steps' |
  'hasVariable' |
  'getVariable' |
  'setVariable'
>

/* eslint-disable no-await-in-loop */
export const runAutomation = async (data: RunAutomationData) => {
  const {
    steps,

    hasVariable,
    getVariable,
    setVariable
  } = data

  for (const step of steps) {
    await sleep(1000)

    if (step.type === 'move')
      await invoke('move_mouse_to', { position: step.data })

    if (step.type === 'click')
      await invoke('click', { button: MouseButton[step.data.button] })

    if (step.type === 'write') {
      const textToWrite = step.data.text.length <= 0 && hasVariable(step.data.readFrom)
        ? getVariable(step.data.readFrom)!.value
        : step.data.text

      await invoke('write', { text: textToWrite })
    }

    if (step.type === 'readFile')
      continue

    if (step.type === 'parseString') {
      const {
        parseString,
        readFrom,
        divider,
        saveAs
      } = step.data

      let textToParse: string

      if (parseString.length > 0)
        textToParse = parseString
      else {
        if (!hasVariable(readFrom))
          throw new Error(`Variável "${readFrom}" não encontrada`)

        const variable = getVariable(readFrom)!
        if (typeof variable.value !== 'string')
          throw new Error(`Variável "${readFrom}" não é um texto`)

        textToParse = variable.value
      }

      const parsedText = textToParse.split(divider)
      setVariable(saveAs, {
        ownerId: step.id,
        value: parsedText
      })
    }
  }
}
/* eslint-enable no-await-in-loop */
