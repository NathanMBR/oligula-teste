import {
  Select,
  Stack
} from '@mantine/core'
import {
  useContext,
  useState
} from 'react'
import { IconVariable } from '@tabler/icons-react'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'
import { ClearableTextInput } from '../../../../components'

import { StepFinishFooter } from '../StepFinishFooter'

export type CycleStepProps = {
  onClose: () => void
}

export const CycleStep = (props: CycleStepProps) => {
  const { onClose } = props

  const {
    addStep,

    listVariables,
    hasVariable,
    setVariable
  } = useContext(AutomationContext)

  const variables = listVariables()

  const [selectedVariable, setSelectedVariable] = useState(variables[0] || '')
  const [saveItemsAs, setSaveItemsAs] = useState('')
  const [variableError, setVariableError] = useState('')

  const noVariablesError = variables.length <= 0
    ? 'Desativado (não há variáveis disponíveis)'
    : null

  const selectError = noVariablesError || ''

  const allowFinish =
    selectedVariable !== '' &&
    saveItemsAs.length > 0 &&
    variableError === ''

  const addCycleStep = () => {
    if (hasVariable(saveItemsAs))
      return setVariableError('Nome de variável já utilizado')

    const id = generateRandomID()

    addStep({
      id,
      type: 'cycle',
      data: {
        iterable: selectedVariable,
        steps: [],
        saveItemsAs
      }
    })

    setVariable(saveItemsAs, {
      ownerId: id,
      value: null
    })

    onClose()
  }

  return (
    <>
      <Stack justify='space-between'>
        <Select
          label='Selecionar variável do tipo lista'
          checkIconPosition='right'
          data={variables}
          error={selectError}
          allowDeselect={false}
          value={selectedVariable}
          disabled={selectError !== ''}
          onChange={value => setSelectedVariable(String(value))}
        />

        <ClearableTextInput
          label='Salvar cada item como'
          placeholder='Digite o nome da variável em que cada item será salvo'
          value={saveItemsAs}
          error={variableError}
          leftSection={<IconVariable stroke={1.5} />}
          onChange={text => {
            setSaveItemsAs(text)
            setVariableError('')
          }}
        />
      </Stack>

      <StepFinishFooter
        allowFinish={allowFinish}
        addStep={addCycleStep}
      />
    </>
  )
}
