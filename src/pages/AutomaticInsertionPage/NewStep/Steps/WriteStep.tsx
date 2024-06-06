import {
  CloseButton,
  Divider,
  NativeSelect,
  Stack,
  TextInput,
  Transition
} from '@mantine/core'
import {
  useContext,
  useState
} from 'react'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'

import { StepFinishFooter } from '../StepFinishFooter'

export type WriteStepProps = {
  onClose: () => void
}

export const WriteStep = (props: WriteStepProps) => {
  const { onClose } = props

  const [writeText, setWriteText] = useState('')
  const [selectedVariable, setSelectedVariable] = useState('')

  const {
    addStep,
    listVariables,
    getVariable
  } = useContext(AutomationContext)

  const variables = listVariables()

  const selectError = variables.length <= 0
    ? 'Desativado (não há variáveis disponíveis)'
    : writeText !== ''
      ? 'Desativado (dado manual inserido; remova-o para ativar)'
      : ''

  const addWriteStep = () => {
    const text = writeText.length > 0
      ? writeText
      : String(getVariable(selectedVariable)?.value)

    addStep({
      id: generateRandomID(),
      type: 'write',
      data: {
        text
      }
    })

    onClose()
  }

  return (
    <>
      <Stack justify='space-between'>
        <TextInput
          label='Inserir dado manual'
          placeholder='Digite o dado a ser inserido'
          value={writeText}
          onChange={event => setWriteText(event.currentTarget.value)}
          rightSection={<Transition mounted={writeText.length > 0} transition='fade'>{styles => <CloseButton style={styles} onClick={() => setWriteText('')} />}</Transition>}
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
