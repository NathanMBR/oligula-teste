import {
  Button,
  Group,
  Select
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useContext } from 'react'

import type { StepData } from '../../../types'
import { AutomationContext } from '../../../providers'

import { StepTypes } from '../StepTypes'

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
      <Select
        label='Selecione o tipo'
        checkIconPosition='right'
        maxDropdownHeight={300}
        allowDeselect={false}
        value={stepType}
        onChange={value => setStepType(value as StepData['type'])}
        data={[
          {
            group: 'Ações',
            items: typeCategories.actions.map(type => ({ value: type, label: StepTypes[type].title }))
          },

          {
            group: 'Condicionais / Repetições',
            items: typeCategories.statements.map(type => ({ value: type, label: StepTypes[type].title }))
          }
        ]}
        renderOption={renderOptions => {
          const { option, checked } = renderOptions

          const Icon = StepTypes[option.value as keyof typeof StepTypes].icon

          return <Group flex={1} gap='xs'>
            {<Icon size={18} stroke={1.5} />}
            {option.label}
            {checked ? <IconCheck size={18} style={{ marginInlineStart: 'auto' }} stroke={1.5} /> : null}
          </Group>
        }}
      />

      <Group justify='end' mt='md'>
        <Button onClick={() => setStageIndex(1)}>Próximo</Button>
      </Group>
    </>
  )
}
