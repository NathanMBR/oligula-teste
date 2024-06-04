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

type ReadFileStep = {
  type: 'readFile'
  data: AutomationCard.ReadFileProps
}

type ActionUnion =
  MoveStep |
  ClickStep |
  WriteStep |
  ReadFileStep

interface CycleStep {
  type: 'cycle'
  data: {
    iterable: string
    steps: Array<ActionUnion | CycleStep>
  }
}

type StepUnion =
  ActionUnion |
  CycleStep

export type Step = {
  id: number
} & StepUnion
