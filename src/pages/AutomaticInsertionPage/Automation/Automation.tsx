import { Stack } from '@mantine/core'

import { AutomationCard } from './AutomationCard'
import type { Step } from './Step'

export type AutomationProps = {
  steps: Array<Step>
  removeStep: (id: number) => void
}

export const Automation = (props: AutomationProps) => {
  const {
    steps,
    removeStep
  } = props

  if (steps.length <= 0)
    return (
      <>

      </>
    )

  return (
    <Stack>
      {
        steps.map((step, index) => {
          const { type } = step

          if (type === 'move')
            return <AutomationCard.Move
              key={step.id}
              position={index + 1}
              x={step.data.x}
              y={step.data.y}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'click')
            return <AutomationCard.Click
              key={step.id}
              position={index + 1}
              button={step.data.button}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'write')
            return <AutomationCard.Write
              key={step.id}
              position={index + 1}
              text={step.data.text}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'readFile')
            return <AutomationCard.ReadFile
              key={step.id}
              position={index + 1}
              filename={step.data.filename}
              saveAs={step.data.saveAs}
              onRemove={() => removeStep(step.id)}
            />
        })
      }
    </Stack>
  )
}
