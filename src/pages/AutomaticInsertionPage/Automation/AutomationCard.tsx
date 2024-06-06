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

  export const MAX_CHAR_LIMITS = {
    BADGE: 30,
    QUOTE: 50
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
    readFrom: string
  }

  export type ReadFileProps = {
    filename: string
    saveAs: string
  }

  export type ParseStringProps = {
    parseString: string
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
        title={StepTypesTitles.click}
        position={position}
        onRemove={onRemove}
        label={`usando o botão ${MouseButtons[button]}`}
      />
    )
  }

  export const Write = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & WriteProps) => <AutomationCardBase
    icon={<IconCursorText />}
    title={StepTypesTitles.write}
    position={props.position}
    onRemove={props.onRemove}
    label={
      <Group gap={4}>
        <Text size='sm' style={{ overflow: 'hidden' }}>Escrever {
          props.text.length > 0
            ? <i>&quot;{ensureCharactersLimit(props.text, 100)}&quot;</i>
            : <>o conteúdo armazenado em <Badge color='orange'>{ensureCharactersLimit(props.readFrom, MAX_CHAR_LIMITS.BADGE)}</Badge></>
        }</Text>
      </Group>
    }
  />

  export const ReadFile = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ReadFileProps) => <AutomationCardBase
    icon={<IconFileText />}
    title={StepTypesTitles.readFile}
    position={props.position}
    onRemove={props.onRemove}
    label={
      <Group gap={4}>
        <Text size='sm'>do arquivo <i>&quot;{ensureCharactersLimit(props.filename, MAX_CHAR_LIMITS.QUOTE)}&quot;</i>, e armazenar como</Text> <Badge>{ensureCharactersLimit(props.saveAs, MAX_CHAR_LIMITS.BADGE)}</Badge>
      </Group>
    }
  />

  export const ParseString = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ParseStringProps) => <AutomationCardBase
    icon={<IconScissors />}
    position={props.position}
    title={StepTypesTitles.parseString}
    onRemove={props.onRemove}
    label={
      <Group gap={4}>
        <Text size='sm'>
          {
            props.parseString.length > 0
              ? <>Dividir <i>&quot;{ensureCharactersLimit(props.parseString, MAX_CHAR_LIMITS.QUOTE)}&quot;</i></>
              : <>armazenado em <Badge color='orange'>{props.readFrom}</Badge></>
          }
        </Text>

        <Text size='sm'>por <i>&quot;{ensureCharactersLimit(props.divider, MAX_CHAR_LIMITS.BADGE)}&quot;</i>, e salvar em <Badge>{ensureCharactersLimit(props.saveAs, MAX_CHAR_LIMITS.BADGE)}</Badge></Text>
      </Group>
    }
  />
}
