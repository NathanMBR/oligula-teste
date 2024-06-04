import {
  Badge,
  Card,
  CloseButton,
  Divider,
  Group,
  Stack,
  Text
} from '@mantine/core'
import {
  IconMouse2,
  IconPointer,
  IconCursorText,
  IconFileText,
  IconScissors
  // IconRotateClockwise
} from '@tabler/icons-react'
import type {
  ReactElement,
  ReactNode
} from 'react'

import { ensureCharactersLimit } from '../../../helpers'
import type { Step } from './Step'

export type AutomationCardProps = {
  icon: ReactElement
  position: number
  title: string
  label?: ReactNode
  onRemove: () => void
}

const AutomationCardBase = (props: AutomationCardProps) => {
  const {
    icon,
    position,
    title,
    label,
    onRemove
  } = props

  return (
    <Card withBorder>
      <Card.Section py='sm' inheritPadding>
        <Group justify='space-between'>
          <Group>
            {icon}

            <Divider orientation='vertical' />

            <Stack gap={1}>
              <Text fw={500} size='lg'>Passo {position}: {title}</Text>

              {
                typeof label === 'string'
                  ? <Text size='sm'>{label}</Text>
                  : label || null
              }
            </Stack>
          </Group>

          <CloseButton onClick={onRemove} />
        </Group>
      </Card.Section>
    </Card>
  )
}

export namespace AutomationCard {
  export const StepTypesTitles: Record<Step['type'], string> = {
    move: 'Mover o mouse',
    click: 'Clicar com o mouse',
    write: 'Inserir dado',
    readFile: 'Ler texto de arquivo',
    parseString: 'Dividir texto',
    cycle: 'Repetir ações'
  }

  export type MoveProps = {
    x: number
    y: number
  }

  export type ClickProps = {
    button: 'left' | 'right' | 'middle'
  }

  export type WriteProps = {
    text: string
  }

  export type ReadFileProps = {
    filename: string
    saveAs: string
  }

  export type ParseStringProps = {
    readFrom: string
    divider: string
    saveAs: string
  }

  export const Move = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & MoveProps) => <AutomationCardBase
    icon={<IconMouse2 />}
    position={props.position}
    title={StepTypesTitles.move}
    label={`para a posição x: ${props.x}, y: ${props.y}`}
    onRemove={props.onRemove}
  />

  export const Click = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ClickProps) => {
    const {
      position,
      button,
      onRemove
    } = props

    const MouseButtons: Record<typeof button, string> = {
      left: 'esquerdo',
      right: 'direito',
      middle: 'do meio'
    }

    return (
      <AutomationCardBase
        icon={<IconPointer />}
        position={position}
        title={StepTypesTitles.click}
        label={`usando o botão ${MouseButtons[button]}`}
        onRemove={onRemove}
      />
    )
  }

  export const Write = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & WriteProps) => <AutomationCardBase
    icon={<IconCursorText />}
    position={props.position}
    title={StepTypesTitles.write}
    label={<Text size='sm' style={{ overflow: 'hidden' }}>Escrever <i>&quot;{ensureCharactersLimit(props.text, 100)}&quot;</i></Text>}
    onRemove={props.onRemove}
  />

  export const ReadFile = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ReadFileProps) => <AutomationCardBase
    icon={<IconFileText />}
    position={props.position}
    title={StepTypesTitles.readFile}
    label={<Group gap={4}><Text size='sm'>do arquivo <i>&quot;{ensureCharactersLimit(props.filename, 25)}&quot;</i>, e armazenar como</Text> <Badge>{props.saveAs}</Badge></Group>}
    onRemove={props.onRemove}
  />

  export const ParseString = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ParseStringProps) => <AutomationCardBase
    icon={<IconScissors />}
    position={props.position}
    title={StepTypesTitles.parseString}
    label={<Group gap={4}><Text size='sm'>armazenado em</Text> <Badge>{props.saveAs}</Badge> <Text>por <i>&quot;{ensureCharactersLimit(props.readFrom, 25)}&quot;</i></Text></Group>}
    onRemove={props.onRemove}
  />
}
