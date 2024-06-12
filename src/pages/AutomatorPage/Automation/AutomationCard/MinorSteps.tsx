import {
  Group,
  Stack,
  Text
} from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'

import type { StepData } from '../../../../types'

import { StepTypes } from '../../StepTypes'

export type MinorStepsProps = {
  steps: Array<StepData> | undefined
}

export const MinorSteps = (props: MinorStepsProps) => {
  const {
    steps
  } = props

  const MAX_STEPS_BEFORE_COLLAPSE = 4

  const minorIconProps = {
    size: 16,
    stroke: 1
  }

  const renderMinorSteps = (step: StepData) => {
    const Icon = StepTypes[step.type].icon

    return <Group gap='xs' key={step.id}>
      <Icon {...minorIconProps} />

      <Text size='sm'>{StepTypes[step.type].title}</Text>
    </Group>
  }

  if (!steps)
    return null

  if (steps.length <= 0)
    return <Text size='xs' fs='italic' mt='lg'>Passo sem instruções</Text>

  return (
    <Stack gap='xs' mt='lg'>
      {
        steps.length <= MAX_STEPS_BEFORE_COLLAPSE
          ? steps.map(renderMinorSteps)
          : <>
            {
              steps.filter((_step, index) => index < MAX_STEPS_BEFORE_COLLAPSE - 1).map(renderMinorSteps)
            }

            <Group gap='xs'>
              <IconDotsVertical {...minorIconProps} />

              <Text size='sm'>e outros {steps.length - (MAX_STEPS_BEFORE_COLLAPSE - 1)} passos</Text>
            </Group>
          </>
      }
    </Stack>
  )
}
