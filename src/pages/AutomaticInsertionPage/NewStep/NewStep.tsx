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
import {
  useContext,
  useState
} from 'react'
import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'
import * as notification from '@tauri-apps/api/notification'
import * as path from '@tauri-apps/api/path'

import {
  checkMousePositionEquality,
  generateRandomID,
  sleep
} from '../../../helpers'
import { AutomationContext } from '../../../providers'
import type { MousePosition } from '../../../types'

import {
  type Step,
  AutomationCard
} from '../Automation'

const MOUSE_SAMPLES = 5
const SLEEP_TIME_IN_MS = 1_000

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
    addStep,
    setVariable
  } = useContext(AutomationContext)

  const [currentStep, setCurrentStep] = useState(0)

  const [stepType, setStepType] = useState<Step['type']>('move')

  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 })
  const [isCapturingMousePosition, setIsCapturingMousePosition] = useState(false)

  const [clickButton, setClickButton] = useState<AutomationCard.ClickProps['button']>('left')

  const [writeText, setWriteText] = useState('')

  const [fileContent, setFileContent] = useState<string>('')
  const [fileSaveAs, setFileSaveAs] = useState('')
  const [filename, setFilename] = useState('')
  const [isReadingFile, setIsReadingFile] = useState(false)

  const getFormValidation = () => {
    if (currentStep === 0)
      return Object.keys(AutomationCard.StepTypesTitles).includes(stepType)

    if (currentStep === 1) {
      if (stepType === 'move') {
        const { x, y } = mousePosition

        return !Number.isNaN(x) &&
          x >= 0 &&
          !Number.isNaN(y) &&
          y >= 0
      }

      if (stepType === 'click')
        return ['left', 'right', 'middle'].includes(clickButton)

      if (stepType === 'write')
        return writeText.length > 0

      if (stepType === 'readFile')
        return fileContent.length > 0 && fileSaveAs.length > 0
    }

    return false
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
      <Stepper active={currentStep}>
        <Stepper.Step label='Selecionar tipo'>
          <NativeSelect
            label='Selecione o tipo'
            defaultValue='move'
            data={Object.entries(AutomationCard.StepTypesTitles).map(([value, label]) => ({ value, label }))}
            onChange={event =>setStepType(event.currentTarget.value as Step['type'])}
            disabled={isCapturingMousePosition}
          />

          <Group justify='end' mt='md'>
            <Button onClick={() => setCurrentStep(1)}>Próximo</Button>
          </Group>
        </Stepper.Step>

        <Stepper.Step label='Inserir dados'>
          {
            stepType === 'move'
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

                <Text size='xs' ta='center'>
                    Ao iniciar a captura, o programa será minimizado. <br />
                    Movimente o mouse até o local desejado e não o mova até que o programa conclua a captura.
                </Text>
              </Stack>
              : null
          }

          {
            stepType === 'click'
              ? <NativeSelect
                label='Botão do mouse'
                onChange={event => setClickButton(event.currentTarget.value as AutomationCard.ClickProps['button'])}
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
              />
              : null
          }

          {
            stepType === 'write'
              ? <>
                <TextInput
                  label='Inserir dado'
                  placeholder='Digite o dado a ser inserido'
                  onChange={event => setWriteText(event.currentTarget.value)}
                />
              </>
              : null
          }

          {
            stepType === 'readFile'
              ? <>
                <FileInput
                  label='Selecione o arquivo'
                  placeholder='Clique para selecionar'
                  pb='lg'
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
                  leftSection={<IconPencil stroke={1.5} />}
                  onChange={event => setFileSaveAs(event.currentTarget.value)}
                />
              </>
              : null
          }

          <Group justify='end' mt='md'>
            <Button variant='default' onClick={() => setCurrentStep(0)}>Voltar</Button>

            <Button
              disabled={!getFormValidation()}
              onClick={() => {
                const step = {
                  id: generateRandomID(),
                  type: stepType,
                  data: {}
                } as Step

                if (step.type === 'move')
                  step.data = {
                    x: mousePosition.x,
                    y: mousePosition.y
                  }

                if (step.type === 'click')
                  step.data = {
                    button: clickButton
                  }

                if (step.type === 'write')
                  step.data = {
                    text: writeText
                  }

                if (step.type === 'readFile') {
                  step.data = {
                    filename,
                    saveAs: fileSaveAs
                  }

                  setVariable(fileSaveAs, fileContent)
                }

                addStep(step)

                setCurrentStep(0)

                setStepType('move')

                setMousePosition({ x: -1, y: -1 })
                setIsCapturingMousePosition(false)

                setClickButton('left')

                setWriteText('')

                setFilename('')
                setFileSaveAs('')
                setFileContent('')
                setIsReadingFile(false)

                onClose()
              }}
            >
                Adicionar
            </Button>
          </Group>
        </Stepper.Step>
      </Stepper>
    </Modal>
  )
}
