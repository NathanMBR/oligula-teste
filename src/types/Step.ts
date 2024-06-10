type StepDefault = {
  id: number
}

export type MoveStepData = {
  type: 'move'
  data: {
    x: number
    y: number
  }
}

export type ClickStepData = {
  type: 'click'
  data: {
    button: 'left' | 'right' | 'middle'
  }
}

export type WriteStepData = {
  type: 'write'
  data: {
    text: string
    readFrom: string
  }
}

export type ReadFileStepData = {
  type: 'readFile'
  data: {
    filename: string
    saveAs: string
  }
}

export type ParseStringStepData = {
  type: 'parseString'
  data: {
    parseString: string
    readFrom: string
    divider: string
    saveAs: string
  }
}

type ActionUnion =
  MoveStepData |
  ClickStepData |
  WriteStepData |
  ReadFileStepData |
  ParseStringStepData

export interface CycleStepData {
  type: 'cycle'
  data: {
    iterable: string
    saveItemsAs: string
    steps: Array<(ActionUnion | CycleStepData) & StepDefault>
  }
}

type StepUnion =
  ActionUnion |
  CycleStepData

export type StepData =
  StepDefault &
  StepUnion
