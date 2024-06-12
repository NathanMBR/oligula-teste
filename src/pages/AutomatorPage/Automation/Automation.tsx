import {
  useContext,
  useEffect,
  useState
} from 'react'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import {
  AutomationContext,
  HeaderContext
} from '../../../providers'
import type { StepData } from '../../../types'

import { AutomationSteps } from './AutomationSteps'
import { StepTypes } from '../StepTypes'

export type AutomationProps = {
  setIsNewStepOpen: (value: boolean) => void
}

export const Automation = (props: AutomationProps) => {
  const { setIsNewStepOpen } = props

  const {
    steps: contextSteps,
    getStep,
    getStepPositionString
  } = useContext(AutomationContext)

  const { setPageSubtitle: setCurrentSubtitle } = useContext(HeaderContext)

  const [expandedStepId, setExpandedStepId] = useState<StepData['id']>(-1)
  const [steps, setSteps] = useState(contextSteps)

  useEffect(() => {
    if (expandedStepId >= 0) {
      const step = getStep(expandedStepId)
      if (!step) {
        // eslint-disable-next-line no-console
        console.error(`Unexpected Error: Step with id ${expandedStepId} not found`)
        return
      }

      if (!('steps' in step.data)) {
        // eslint-disable-next-line no-console
        console.error(`Unexpected Error: Step with id ${expandedStepId} has no steps`)
        return
      }

      const stepPosition = getStepPositionString(expandedStepId)

      setCurrentSubtitle(`Passo ${stepPosition}: ${StepTypes[step.type].title}`)
      setSteps(step.data.steps)
    }
  }, [expandedStepId])

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

      <AutomationSteps
        steps={steps}
        setExpandedStepId={setExpandedStepId}
      />
    </>
  )
}
