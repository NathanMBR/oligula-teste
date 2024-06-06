import {
  Divider,
  Fieldset,
  NativeSelect,
  Stack
} from '@mantine/core'
import {
  useContext,
  useState
} from 'react'
import { IconPencil } from '@tabler/icons-react'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'
import { ClearableTextInput } from '../../../../components'

import { StepFinishFooter } from '../StepFinishFooter'

export type ParseStringStepProps = {
  onClose: () => void
}

export const ParseStringStep = (props: ParseStringStepProps) => {
  const { onClose } = props

  const {
    addStep,

    listVariables,
    hasVariable,
    setVariable
  } = useContext(AutomationContext)

  const variables = listVariables()

  const [parseText, setParseText] = useState('')
  const [selectedVariable, setSelectedVariable] = useState(variables[0] || '')
  const [separatorText, setSeparatorText] = useState('')
  const [saveAs, setSaveAs] = useState('')
  const [variableError, setVariableError] = useState('')

  const allowFinish =
    (parseText !== '' || selectedVariable !== '') &&
    separatorText !== '' &&
    saveAs !== '' &&
    variableError === ''

  const selectError = variables.length <= 0
    ? 'Desativado (não há variáveis disponíveis)'
    : parseText !== ''
      ? 'Desativado (dado manual inserido; remova-o para ativar)'
      : ''

  const addParseStringStep = () => {
    if (hasVariable(saveAs))
      return setVariableError('Nome de variável já utilizado')

    const id = generateRandomID()

    addStep({
      id,
      type: 'parseString',
      data: {
        parseString: parseText,
        readFrom: selectedVariable,
        divider: separatorText,
        saveAs
      }
    })

    setVariable(saveAs, {
      ownerId: id,
      value: null
    })

    onClose()
  }

  return (
    <>
      <Stack justify='space-between'>
        <Fieldset legend='Texto a dividir'>
          <Stack>
            <ClearableTextInput
              label='Inserir texto manualmente'
              placeholder='Insira o dado a ser dividido'
              value={parseText}
              onChange={text => setParseText(text)}
            />

            <Divider label='ou' />

            <NativeSelect
              label='Inserir texto de uma variável'
              data={variables}
              error={selectError}
              disabled={variables.length <= 0 || parseText !== ''}
              onChange={event => setSelectedVariable(event.currentTarget.value)}
            />
          </Stack>
        </Fieldset>

        <ClearableTextInput
          label='Texto separador'
          placeholder='Insira o texto separador'
          value={separatorText}
          onChange={text => setSeparatorText(text)}
        />

        <ClearableTextInput
          label='Salvar como'
          placeholder='Digite o nome da variável em que o texto será salvo'
          value={saveAs}
          error={variableError}
          leftSection={<IconPencil stroke={1.5} />}
          onChange={
            text => {
              setSaveAs(text)
              setVariableError('')
            }
          }
        />
      </Stack>

      <StepFinishFooter
        allowFinish={allowFinish}
        addStep={addParseStringStep}
      />
    </>
  )
}
