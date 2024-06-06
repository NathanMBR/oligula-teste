import {
  Button,
  Stack
} from '@mantine/core'
import { useContext } from 'react'
import { IconPlus } from '@tabler/icons-react'

import { AutomationContext } from '../../../providers'

import { AutomationCard } from './AutomationCard'

export type AutomationProps = {
  setIsNewStepOpen: (value: boolean) => void
}

export const Automation = (props: AutomationProps) => {
  const { setIsNewStepOpen } = props

  const {
    steps,
    removeStep,
    deleteVariablesById
  } = useContext(AutomationContext)

  return (
    <>
      <Button
        variant='default'
        mb='md'
        leftSection={<IconPlus />}
        onClick={() => setIsNewStepOpen(true)}
        fullWidth
      >
        Adicionar passo
      </Button>

      <Stack>
        {
          steps.map((step, index) => {
            const {
              id,
              type
            } = step
            const position = index + 1

            const onRemove = () => {
              removeStep(id)
              deleteVariablesById(id)
            }

            if (type === 'move')
              return <AutomationCard.Move
                key={id}
                position={position}
                x={step.data.x}
                y={step.data.y}
                onRemove={onRemove}
              />

            if (type === 'click')
              return <AutomationCard.Click
                key={id}
                position={position}
                button={step.data.button}
                onRemove={onRemove}
              />

            if (type === 'write')
              return <AutomationCard.Write
                key={id}
                position={position}
                text={step.data.text}
                readFrom={step.data.readFrom}
                onRemove={onRemove}
              />

            if (type === 'readFile')
              return <AutomationCard.ReadFile
                key={id}
                position={position}
                filename={step.data.filename}
                saveAs={step.data.saveAs}
                onRemove={onRemove}
              />

            if (type === 'parseString')
              return <AutomationCard.ParseString
                key={id}
                position={position}
                parseString={step.data.parseString}
                readFrom={step.data.readFrom}
                divider={step.data.divider}
                saveAs={step.data.saveAs}
                onRemove={onRemove}
              />
          })
        }
      </Stack>
    </>
  )
}
