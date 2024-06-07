import {
  Button,
  Group,
  NativeSelect
} from '@mantine/core'
import { useContext } from 'react'

import {
  type StepData,
  StepTypesTitles
} from '../../../types'
import { AutomationContext } from '../../../providers'

export type TypeSelectionProps = {
  stepType: StepData['type']
  setStepType: (value: StepData['type']) => void
}

export const TypeSelection = (props: TypeSelectionProps) => {
  const {
    stepType,
    setStepType
  } = props

  const { setStageIndex } = useContext(AutomationContext)

  const typeCategories = {
    actions: [
      'move',
      'click',
      'write',
      'readFile',
      'parseString'
    ],

    statements: [
      'cycle'
    ]
  } satisfies Record<string, Array<StepData['type']>>

  return (
    <>
      <NativeSelect
        label='Selecione o tipo'
        value={stepType}
        onChange={event => setStepType(event.currentTarget.value as StepData['type'])}
      >
        <optgroup label='Ações'>
          {
            typeCategories.actions.map(
              type => <option key={type} value={type}>
                {StepTypesTitles[type]}
              </option>
            )
          }
        </optgroup>

        <optgroup label='Condicionais / Repetições'>
          {
            typeCategories.statements.map(
              type => <option key={type} value={type}>
                {StepTypesTitles[type]}
              </option>
            )
          }
        </optgroup>
      </NativeSelect>

      <Group justify='end' mt='md'>
        <Button onClick={() => setStageIndex(1)}>Próximo</Button>
      </Group>
    </>
  )
}
