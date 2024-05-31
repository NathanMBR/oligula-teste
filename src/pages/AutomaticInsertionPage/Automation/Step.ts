import type { AutomationCard } from './AutomationCard'

type MoveStep = {
  type: 'move'
  data: AutomationCard.MoveProps
}

type ClickStep = {
  type: 'click'
  data: AutomationCard.ClickProps
}

type WriteStep = {
  type: 'write'
  data: AutomationCard.WriteProps
}

export type Step = {
  id: number
} & (
  MoveStep |
  ClickStep |
  WriteStep
)

export const StepTypesTitles: Record<Step['type'], string> = {
  move: 'Mover o mouse',
  click: 'Clicar com o mouse',
  write: 'Inserir dado'
}
