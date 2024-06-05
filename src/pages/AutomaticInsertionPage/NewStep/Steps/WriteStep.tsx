import {
  useContext,
  useState
} from 'react'
import { TextInput } from '@mantine/core'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'

import { StepFinishFooter } from '../StepFinishFooter'

export type WriteStepProps = {
  onClose: () => void
}

export const WriteStep = (props: WriteStepProps) => {
  const { onClose } = props

  const [writeText, setWriteText] = useState('')

  const { addStep } = useContext(AutomationContext)

  const addWriteStep = () => {
    addStep({
      id: generateRandomID(),
      type: 'write',
      data: {
        text: writeText
      }
    })

    onClose()
  }

  return (
    <>
      <TextInput
        label='Inserir dado'
        placeholder='Digite o dado a ser inserido'
        onChange={event => setWriteText(event.currentTarget.value)}
      />

      <StepFinishFooter
        addStep={addWriteStep}
        allowFinish={writeText.length > 0}
      />
    </>
  )
}
