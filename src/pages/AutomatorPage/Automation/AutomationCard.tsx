import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Text
} from '@mantine/core'
import {
  IconDotsVertical,
  IconPlus,
  IconX
} from '@tabler/icons-react'
import type {
  ReactElement,
  ReactNode
} from 'react'

import type {
  MoveStepData,
  ClickStepData,
  WriteStepData,
  ReadFileStepData,
  ParseStringStepData,
  CycleStepData,
  StepData
} from '../../../types'
import { ensureCharactersLimit } from '../../../helpers'

import { StepTypes } from '../StepTypes'

export type AutomationCardProps = {
  icon: ReactElement
  position: number
  title: string
  label?: ReactNode
  steps?: Array<StepData>
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

  const minorIconProps = {
    size: 16,
    stroke: 1
  }

  const renderMinorSteps = (step: StepData) => {
    const Icon = StepTypes[step.type].icon

    return <Group gap='xs' key={step.id}>
      <Icon {...minorIconProps} />

      <Text size='sm'>{StepTypes[step.type].title}</Text>
    </Group>
  }

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

              {
                props.steps
                  ? <Stack gap='xs' mt='lg'>
                    {
                      props.steps.length <= 4
                        ? props.steps.map(renderMinorSteps)
                        : <>
                          {
                            props.steps.filter((_step, index) => index < 3).map(renderMinorSteps)
                          }

                          <Group gap='xs'>
                            <IconDotsVertical {...minorIconProps} />

                            <Text size='sm'>e outros {props.steps.length - 3} passos</Text>
                          </Group>
                        </>
                    }
                  </Stack>
                  : null
              }
            </Stack>
          </Group>

          <Group>
            <ActionIcon variant='subtle' color='gray'>
              <IconPlus stroke={1.5} />
            </ActionIcon>

            <ActionIcon variant='subtle' color='gray' onClick={onRemove} >
              <IconX stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  )
}

export namespace AutomationCard {
  const MAX_CHAR_LIMITS = {
    BADGE: 30,
    QUOTE: 50
  }

  export const Move = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & MoveStepData['data']) => <AutomationCardBase
    icon={<StepTypes.move.icon />}
    title={StepTypes.move.title}
    position={props.position}
    onRemove={props.onRemove}
    label={`para a posição x: ${props.x}, y: ${props.y}`}
  />

  export const Click = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ClickStepData['data']) => {
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
        icon={<StepTypes.click.icon />}
        title={StepTypes.click.title}
        position={position}
        onRemove={onRemove}
        label={`usando o botão ${MouseButtons[button]}`}
      />
    )
  }

  export const Write = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & WriteStepData['data']) => <AutomationCardBase
    icon={<StepTypes.write.icon />}
    title={StepTypes.write.title}
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

  export const ReadFile = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ReadFileStepData['data']) => <AutomationCardBase
    icon={<StepTypes.readFile.icon />}
    title={StepTypes.readFile.title}
    position={props.position}
    onRemove={props.onRemove}
    label={
      <Group gap={4}>
        <Text size='sm'>do arquivo <i>&quot;{ensureCharactersLimit(props.filename, MAX_CHAR_LIMITS.QUOTE)}&quot;</i>, e armazenar como</Text> <Badge>{ensureCharactersLimit(props.saveAs, MAX_CHAR_LIMITS.BADGE)}</Badge>
      </Group>
    }
  />

  export const ParseString = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & ParseStringStepData['data']) => <AutomationCardBase
    icon={<StepTypes.parseString.icon />}
    title={StepTypes.parseString.title}
    position={props.position}
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

  export const Cycle = (props: Pick<AutomationCardProps, 'position' | 'onRemove'> & CycleStepData['data']) => <AutomationCardBase
    icon={<StepTypes.cycle.icon />}
    title={StepTypes.cycle.title}
    position={props.position}
    onRemove={props.onRemove}
    steps={props.steps}
    label={
      <Group gap={4}>
        <Text size='sm'>
          armazenados na variável <Badge color='orange'>{ensureCharactersLimit(props.iterable, MAX_CHAR_LIMITS.BADGE)}</Badge>,

          e atribuir cada um à variável <Badge color='pink'>{ensureCharactersLimit(props.saveItemsAs, MAX_CHAR_LIMITS.BADGE)}</Badge>
        </Text>
      </Group>
    }
  />
}
