import {
  Button,
  Divider,
  FileInput,
  Group,
  Loader,
  Modal,
  NativeSelect,
  NumberInput,
  Text,
  TextInput,
  Stack,
  Stepper
} from '@mantine/core'
import {
  IconFileText,
  IconPencil,
  IconPlayerRecordFilled
} from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'
import * as notification from '@tauri-apps/api/notification'
import * as path from '@tauri-apps/api/path'

import {
  type Step,
  AutomationCard
} from '../Automation'
import {
  checkMousePositionEquality,
  generateRandomID,
  sleep
} from '../../../helpers'
import type { MousePosition } from '../../../types'

const MOUSE_SAMPLES = 5
const SLEEP_TIME_IN_MS = 1_000

export type NewStepProps = {
  isOpen: boolean
  addStep: (step: Step) => void
  onClose: () => void
}

export const NewStep = (props: NewStepProps) => {
  const {
    isOpen,
    addStep,
    onClose
  } = props

  const [currentStep, setCurrentStep] = useState(0)
  const [isCapturingMousePosition, setIsCapturingMousePosition] = useState(false)
  const [text, setText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 })
  const [fileContent, setFileContent] = useState<string>('')
  const [isReadingFile, setIsReadingFile] = useState(false)
  const [fileSaveAs, setFileSaveAs] = useState('')
  const [filename, setFilename] = useState('')

  const [globalVariables, setGlobalVariables] = useState<Record<string, unknown>>({})

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: 0,
      type: 'move',
      data: {
        x: -1,
        y: -1,
        button: 'left',
        text: '',
        filename: '',
        saveAs: ''
      }
    }
  })

  const formValues = form.getValues()

  const getFormValidation = () => {
    const { type, data } = formValues

    if (currentStep === 0)
      return Object.keys(AutomationCard.StepTypesTitles).includes(type)

    if (currentStep === 1) {
      if (type === 'move') {
        const { x, y } = mousePosition

        return !Number.isNaN(x) &&
          x >= 0 &&
          !Number.isNaN(y) &&
          y >= 0
      }

      if (type === 'click')
        return ['left', 'right', 'middle'].includes(data.button)

      if (type === 'write')
        return text.length > 0

      if (type === 'readFile')
        return fileContent.length > 0 && fileSaveAs.length > 0
    }
  }

  const handleMousePositionCapture = async () => {
    const mousePositions: Array<MousePosition> = []

    setIsCapturingMousePosition(true)
    await appWindow.minimize()

    /* eslint-disable no-await-in-loop */
    while (mousePositions.length < MOUSE_SAMPLES || !checkMousePositionEquality(mousePositions)) {
      await sleep(SLEEP_TIME_IN_MS)

      if (mousePositions.length >= MOUSE_SAMPLES)
        mousePositions.shift()

      const mousePosition = await invoke('get_mouse_position') as MousePosition
      mousePositions.push(mousePosition)
    }
    /* eslint-enable no-await-in-loop */

    const capturedMousePosition = mousePositions[0]!
    setMousePosition(capturedMousePosition)

    const isWindowMinimized = await appWindow.isMinimized()
    if (isWindowMinimized) {
      const isNotificationPermissionGranted = await notification.isPermissionGranted()
      if (isNotificationPermissionGranted) {
        const icon = await path.resolveResource('128x128.png')

        notification.sendNotification({
          title: 'Captura do mouse concluída',
          body: `Posição X: ${capturedMousePosition.x}, Y: ${capturedMousePosition.y}`,
          icon
        })
      }

      await appWindow.unminimize()
    }
    setIsCapturingMousePosition(false)
  }

  return (
    <Modal
      title='Novo passo'
      size='lg'
      opened={isOpen}
      onClose={onClose}
      overlayProps={{ blur: 2.5 }}
      centered
    >
      <form>
        <Stepper active={currentStep}>
          <Stepper.Step label='Selecionar tipo'>
            <NativeSelect
              label='Selecione o tipo'
              defaultValue='move'
              data={Object.entries(AutomationCard.StepTypesTitles).map(([value, label]) => ({ value, label }))}
              disabled={isCapturingMousePosition}
              key={form.key('type')}
              {...form.getInputProps('type')}
            >
            </NativeSelect>

            <Group justify='end' mt='md'>
              <Button onClick={() => setCurrentStep(1)}>Próximo</Button>
            </Group>
          </Stepper.Step>

          <Stepper.Step label='Inserir dados'>
            {
              formValues.type === 'move'
                ? <Stack justify='space-between'>
                  <Group grow>
                    <NumberInput
                      label='Posição X'
                      placeholder='(vazio)'
                      clampBehavior='strict'
                      min={0}
                      value={mousePosition.x >= 0 ? mousePosition.x : undefined}
                      allowDecimal={false}
                      allowNegative={false}
                      onChange={value => setMousePosition({ ...mousePosition, x: Number(value) })}
                    />

                    <NumberInput
                      label='Posição Y'
                      placeholder='(vazio)'
                      clampBehavior='strict'
                      min={0}
                      value={mousePosition.y >= 0 ? mousePosition.y : undefined}
                      allowDecimal={false}
                      allowNegative={false}
                      onChange={value => setMousePosition({ ...mousePosition, y: Number(value) })}
                    />
                  </Group>

                  <Divider label='ou' />

                  <Button
                    variant='default'
                    onClick={handleMousePositionCapture}
                    disabled={isCapturingMousePosition}
                  >
                    {
                      isCapturingMousePosition
                        ? <Group gap={4}>
                          <IconPlayerRecordFilled color='#f00' size={20} />
                          <span>Capturando...</span>
                        </Group>
                        : <>
                          Capturar posição do mouse
                        </>
                    }
                  </Button>

                  {
                    formValues.data.x >= 0 && formValues.data.y >= 0 && !isCapturingMousePosition
                      ? <Stack gap={4}>
                        <Text size='xs' ta='center'>Posição do mouse:</Text>
                        <Text size='md' ta='center'>X: {formValues.data.x}, Y: {formValues.data.y}</Text>
                      </Stack>
                      : <Text size='xs' ta='center'>
                        Ao iniciar a captura, o programa será minimizado. <br />
                        Movimente o mouse até o local desejado e não o mova até que o programa conclua a captura.
                      </Text>
                  }
                </Stack>
                : null
            }

            {
              formValues.type === 'click'
                ? <NativeSelect
                  label='Botão do mouse'
                  data={[
                    {
                      value: 'left',
                      label: 'Esquerdo'
                    },

                    {
                      value: 'right',
                      label: 'Direito'
                    },

                    {
                      value: 'middle',
                      label: 'Meio'
                    }
                  ]}
                  key={form.key('data.button')}
                  {...form.getInputProps('data.button')}
                />
                : null
            }

            {
              formValues.type === 'write'
                ? <>
                  <TextInput
                    label='Inserir dado'
                    placeholder='Digite o dado a ser inserido'
                    key={form.key('data.text')}
                    onChange={event => setText(event.currentTarget.value)}
                  />
                </>
                : null
            }

            {
              formValues.type === 'readFile'
                ? <>
                  <FileInput
                    label='Selecione o arquivo'
                    placeholder='Clique para selecionar'
                    pb='lg'
                    key={form.key('data.path')}
                    leftSection={isReadingFile ? <Loader size={16}/> : <IconFileText stroke={1.5} />}
                    disabled={isReadingFile}
                    onChange={file => {
                      if (!file)
                        return

                      setFilename(file.name)

                      setIsReadingFile(true)
                      file
                        .text()
                        .then(fileText => setFileContent(fileText))
                        .finally(() => setIsReadingFile(false))
                    }}
                    clearable
                  />

                  <TextInput
                    label='Salvar como'
                    placeholder='Digite o nome da variável em que o texto será salvo'
                    key={form.key('data.saveAs')}
                    leftSection={<IconPencil stroke={1.5} />}
                    onChange={event => setFileSaveAs(event.currentTarget.value)}
                  />
                </>
                : null
            }

            <Group justify='end' mt='md'>
              <Button variant='default' onClick={() => setCurrentStep(0)}>Voltar</Button>

              <Button
                onClick={() => {
                  const step = {
                    ...form.getValues(),
                    id: generateRandomID()
                  } as Step

                  if (step.type === 'move')
                    step.data = mousePosition

                  if (step.type === 'write')
                    step.data.text = text

                  if (step.type === 'readFile') {
                    step.data.filename = filename
                    step.data.saveAs = fileSaveAs
                    setGlobalVariables({ ...globalVariables, [formValues.data.saveAs]: fileContent })
                  }

                  addStep(step)
                  form.reset()

                  setCurrentStep(0)
                  setMousePosition({ x: -1, y: -1 })
                  setText('')
                  setFileContent('')

                  onClose()
                }}
                disabled={!getFormValidation()}
              >
                Adicionar
              </Button>
            </Group>
          </Stepper.Step>
        </Stepper>
      </form>
    </Modal>
  )
}
