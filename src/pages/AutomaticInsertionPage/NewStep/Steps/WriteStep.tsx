import {
  Divider,
  NativeSelect,
  Stack
} from '@mantine/core'
import {
  useContext,
  useState
} from 'react'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'
import { ClearableTextInput } from '../../../../components'

import { StepFinishFooter } from '../StepFinishFooter'

export type WriteStepProps = {
  onClose: () => void
}

export const WriteStep = (props: WriteStepProps) => {
  const { onClose } = props

  const {
    addStep,
    listVariables
  } = useContext(AutomationContext)

  const variables = listVariables()

  const [writeText, setWriteText] = useState('')
  const [selectedVariable, setSelectedVariable] = useState(variables[0] || '')

  const selectError = variables.length <= 0
    ? 'Desativado (não há variáveis disponíveis)'
    : writeText !== ''
      ? 'Desativado (dado manual inserido; remova-o para ativar)'
      : ''

  const addWriteStep = () => {
    addStep({
      id: generateRandomID(),
      type: 'write',
      data: {
        text: writeText,
        readFrom: selectedVariable
      }
    })

    onClose()
  }

  return (
    <>
      <Stack justify='space-between'>
        <ClearableTextInput
          label='Inserir dado manual'
          placeholder='Digite o dado a ser inserido'
          value={writeText}
          onChange={text => setWriteText(text)}
        />

        <Divider label='ou' />

        <NativeSelect
          label='Inserir dado de uma variável'
          data={variables}
          onChange={event => setSelectedVariable(event.currentTarget.value)}
          disabled={variables.length <= 0 || writeText !== ''}
          error={selectError}
        />
      </Stack>

      <StepFinishFooter
        addStep={addWriteStep}
        allowFinish={writeText.length > 0 || selectedVariable !== ''}
      />
    </>
  )
}
