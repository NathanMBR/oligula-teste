import { FileInput, Loader, TextInput } from '@mantine/core'
import { IconFileText, IconPencil } from '@tabler/icons-react'
import { useContext, useState } from 'react'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'

import { StepFinishFooter } from '../StepFinishFooter'

export type ReadFileStepProps = {
  onClose: () => void
}

export const ReadFileStep = (props: ReadFileStepProps) => {
  const { onClose } = props

  const [filename, setFilename] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [saveAs, setSaveAs] = useState('')
  const [variableError, setVariableError] = useState('')
  const [isReadingFile, setIsReadingFile] = useState(false)

  const {
    addStep,
    hasVariable,
    setVariable
  } = useContext(AutomationContext)

  const allowFinish =
    filename.length > 0 &&
    saveAs.length > 0 &&
    !isReadingFile &&
    variableError === ''

  /* eslint-disable no-console */
  const handleFileChange = (file: File | null) => {
    if (!file)
      return

    setFilename(file.name)

    setIsReadingFile(true)
    file
      .text()
      .then(fileText => setFileContent(fileText))
      .catch(console.error)
      .finally(() => setIsReadingFile(false))
  }
  /* eslint-enable no-console */

  const addReadFileStep = () => {
    if (hasVariable(saveAs))
      return setVariableError('Nome de variável já utilizado')

    const id = generateRandomID()

    addStep({
      id,
      type: 'readFile',
      data: {
        filename: filename,
        saveAs: saveAs
      }
    })

    setVariable(saveAs, {
      ownerId: id,
      value: fileContent
    })

    onClose()
  }

  return (
    <>
      <FileInput
        label='Selecione o arquivo'
        placeholder='Clique para selecionar'
        pb='lg'
        disabled={isReadingFile}
        onChange={handleFileChange}
        leftSection={isReadingFile ? <Loader size={16}/> : <IconFileText stroke={1.5} />}
        clearable
      />

      <TextInput
        label='Salvar como'
        placeholder='Digite o nome da variável em que o texto será salvo'
        error={variableError}
        leftSection={<IconPencil stroke={1.5} />}
        onChange={
          event => {
            setSaveAs(event.currentTarget.value)
            setVariableError('')
          }
        }
      />

      <StepFinishFooter
        addStep={addReadFileStep}
        allowFinish={allowFinish}
      />
    </>
  )
}
