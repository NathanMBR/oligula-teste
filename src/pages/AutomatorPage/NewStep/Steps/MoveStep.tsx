import {
  Button,
  Divider,
  Group,
  NumberInput,
  Stack,
  Text
} from '@mantine/core'
import {
  useContext,
  useState
} from 'react'
import { IconPlayerRecordFilled } from '@tabler/icons-react'
import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'
import * as notification from '@tauri-apps/api/notification'
import * as path from '@tauri-apps/api/path'

import {
  checkMousePositionEquality,
  generateRandomID,
  sleep
} from '../../../../helpers'
import { AutomationContext } from '../../../../providers'
import { useParentId } from '../../../../hooks'
import type { MousePosition } from '../../../../types'

import { StepFinishFooter } from '../StepFinishFooter'

const MOUSE_SAMPLES = 5
const SLEEP_TIME_IN_MS = 1_000

export type MoveStepProps = {
  onClose: () => void
}

export const MoveStep = (props: MoveStepProps) => {
  const { onClose } = props

  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 })
  const [isCapturingMousePosition, setIsCapturingMousePosition] = useState(false)

  const { addStep } = useContext(AutomationContext)

  const parentId = useParentId()

  const allowFinish =
    !Number.isNaN(mousePosition.x) &&
    !Number.isNaN(mousePosition.y) &&
    mousePosition.x >= 0 &&
    mousePosition.y >= 0 &&
    !isCapturingMousePosition

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

  const addMoveStep = () => {
    addStep(
      {
        id: generateRandomID(),
        type: 'move',
        data: mousePosition
      },

      parentId
    )

    onClose()
  }

  return (
    <>
      <Stack justify='space-between'>
        <Group grow>
          <NumberInput
            label='Posição X'
            placeholder='(vazio)'
            clampBehavior='strict'
            min={0}
            allowDecimal={false}
            allowNegative={false}
            value={mousePosition.x >= 0 ? mousePosition.x : undefined}
            onChange={value => setMousePosition({ ...mousePosition, x: Number(value) })}
          />

          <NumberInput
            label='Posição Y'
            placeholder='(vazio)'
            clampBehavior='strict'
            min={0}
            allowDecimal={false}
            allowNegative={false}
            value={mousePosition.y >= 0 ? mousePosition.y : undefined}
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

      <StepFinishFooter
        allowFinish={allowFinish}
        addStep={addMoveStep}
      />
    </>
  )
}
