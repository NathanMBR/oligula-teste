import {
  Modal,
  Stepper
} from '@mantine/core'
import {
  useContext,
  useEffect,
  useState
} from 'react'

import { AutomationContext } from '../../../providers'

import {
  // actions
  MoveStep,
  ClickStep,
  WriteStep,
  ReadFileStep,
  ParseStringStep,

  // statements
  CycleStep
} from './Steps'
import { TypeSelection } from './TypeSelection'
import type { StepData } from '../../../types'

export type NewStepProps = {
  isOpen: boolean
  onClose: () => void
}

export const NewStep = (props: NewStepProps) => {
  const {
    isOpen,
    onClose
  } = props

  const {
    stageIndex,
    setStageIndex
  } = useContext(AutomationContext)

  const [stepType, setStepType] = useState<StepData['type']>('move')

  useEffect(() => {
    if (isOpen) {
      setStageIndex(0)
      setStepType('move')
    }
  }, [isOpen])

  return (
    <Modal
      title='Novo passo'
      size='lg'
      opened={isOpen}
      onClose={onClose}
      overlayProps={{ blur: 2.5 }}
      centered
    >
      <Stepper active={stageIndex}>
        <Stepper.Step label='Selecionar tipo'>
          <TypeSelection
            stepType={stepType}
            setStepType={setStepType}
          />
        </Stepper.Step>

        <Stepper.Step label='Inserir dados'>
          {/* actions */}

          {
            stepType === 'move'
              ? <MoveStep onClose={onClose} />
              : null
          }

          {
            stepType === 'click'
              ? <ClickStep onClose={onClose} />
              : null
          }

          {
            stepType === 'write'
              ? <WriteStep onClose={onClose} />
              : null
          }

          {
            stepType === 'readFile'
              ? <ReadFileStep onClose={onClose} />
              : null
          }

          {
            stepType === 'parseString'
              ? <ParseStringStep onClose={onClose} />
              : null
          }

          {/* statements */}

          {
            stepType === 'cycle'
              ? <CycleStep onClose={onClose} />
              : null
          }
        </Stepper.Step>
      </Stepper>
    </Modal>
  )
}
