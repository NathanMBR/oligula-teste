import {
  useContext,
  useEffect
} from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import {
  AutomationContext,
  HeaderContext
} from '../../../providers'
import type { StepData } from '../../../types'

import { AutomationSteps } from './AutomationSteps'
import { StepTypes } from '../StepTypes'
import type { AutomatorPageParams } from '../AutomatorPage'

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
  const { setPageSubtitle } = useContext(HeaderContext)

  const { expandedStepId: rawExpandedStepId } = useParams<AutomatorPageParams>()
  const expandedStepId = Number(rawExpandedStepId)

  const loadExpandedStep = (id: StepData['id']) => {
    /* eslint-disable no-console */
    if (Number.isNaN(id)) {
      console.error(`Unexpected Error: Expected valid step id (got ${rawExpandedStepId})`)
      return null
    }

    if (id < 0)
      return null

    const step = getStep(id)
    if (!step) {
      console.error(`Unexpected Error: Step with id ${id} not found`)
      return null
    }
    /* eslint-enable no-console */

    return step
  }

  const getChildrenSteps = (step: StepData | null) => {
    if (!step)
      return null

    if (!('steps' in step.data)) {
      // eslint-disable-next-line no-console
      console.error(`Unexpected Error: Step with id ${step.id} has no children steps`)
      return null
    }

    return step.data.steps
  }

  const steps = getChildrenSteps(loadExpandedStep(expandedStepId)) || contextSteps

  useEffect(() => {
    if (Number.isNaN(expandedStepId))
      return

    if (expandedStepId < 0)
      return

    const step = getStep(expandedStepId)
    if (!step)
      return

    const stepPosition = getStepPositionString(step.id)

    setPageSubtitle(`Passo ${stepPosition}: ${StepTypes[step.type].title}`)
  }, [rawExpandedStepId])

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

      <AutomationSteps steps={steps} />
    </>
  )
}
