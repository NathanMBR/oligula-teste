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
  MoveStep,
  ClickStep,
  WriteStep,
  ReadFileStep,
  ParseStringStep
} from './Steps'
import { TypeSelection } from './TypeSelection'
import type { Step } from '../Automation'

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

  const [stepType, setStepType] = useState<Step['type']>('move')

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
        </Stepper.Step>
      </Stepper>
    </Modal>
  )
}
