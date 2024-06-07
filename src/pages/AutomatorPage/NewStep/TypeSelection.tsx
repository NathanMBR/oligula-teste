import {
  Button,
  Group,
  NativeSelect
} from '@mantine/core'
import { useContext } from 'react'

import { AutomationContext } from '../../../providers'
import type { StepData } from '../../../types'

import { AutomationCard } from '../Automation'

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

  return (
    <>
      <NativeSelect
        label='Selecione o tipo'
        value={stepType}
        onChange={event => setStepType(event.currentTarget.value as StepData['type'])}
        data={Object.entries(AutomationCard.StepTypesTitles).map(([value, label]) => ({ value, label }))}
      />

      <Group justify='end' mt='md'>
        <Button onClick={() => setStageIndex(1)}>Próximo</Button>
      </Group>
    </>
  )
}
