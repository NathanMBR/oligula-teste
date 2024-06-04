import { Stack } from '@mantine/core'
import { useContext } from 'react'

import { AutomationContext } from '../../../providers'

import { AutomationCard } from './AutomationCard'

export const Automation = () => {
  const {
    steps,
    removeStep
  } = useContext(AutomationContext)

  if (steps.length <= 0)
    return null

  return (
    <Stack>
      {
        steps.map((step, index) => {
          const { type } = step
          const position = index + 1

          if (type === 'move')
            return <AutomationCard.Move
              position={position}
              key={step.id}
              x={step.data.x}
              y={step.data.y}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'click')
            return <AutomationCard.Click
              position={position}
              key={step.id}
              button={step.data.button}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'write')
            return <AutomationCard.Write
              position={position}
              key={step.id}
              text={step.data.text}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'readFile')
            return <AutomationCard.ReadFile
              position={position}
              key={step.id}
              filename={step.data.filename}
              saveAs={step.data.saveAs}
              onRemove={() => removeStep(step.id)}
            />

          if (type === 'parseString')
            return <AutomationCard.ParseString
              position={position}
              key={step.id}
              readFrom={step.data.readFrom}
              divider={step.data.divider}
              saveAs={step.data.saveAs}
              onRemove={() => removeStep(step.id)}
            />
        })
      }
    </Stack>
  )
}
