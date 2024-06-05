import {
  createContext,
  useState,
  type PropsWithChildren
} from 'react'

import type {
  Step,
  Variables
} from '../pages/AutomaticInsertionPage/Automation'

export type AutomationData = {
  stageIndex: number
  setStageIndex: (index: number) => void

  steps: Array<Step>
  addStep: (step: Step) => void
  removeStep: (id: Step['id']) => void

  variables: Variables
  getVariable: (name: keyof Variables) => Variables[keyof Variables]
  setVariable: (name: keyof Variables, value: Variables[keyof Variables]) => void
  listVariables: () => Array<keyof Variables>
}

const defaultAutomationData: AutomationData = {
  stageIndex: 0,
  setStageIndex: () => {},

  steps: [],
  addStep: () => {},
  removeStep: () => {},

  variables: {},
  getVariable: () => {},
  setVariable: () => {},
  listVariables: () => []
}

export const AutomationContext = createContext(defaultAutomationData)

export type AutomationProviderProps = Required<PropsWithChildren>

export const AutomationProvider = (props: AutomationProviderProps) => {
  const { children } = props

  const [stageIndex, setStageIndex] = useState(defaultAutomationData.stageIndex)
  const [steps, setSteps] = useState(defaultAutomationData.steps)
  const [variables, setVariables] = useState(defaultAutomationData.variables)

  const addStep: AutomationData['addStep'] = step => setSteps([...steps, step])
  const removeStep: AutomationData['removeStep'] = id => setSteps(steps.filter(step => step.id !== id))

  const getVariable: AutomationData['getVariable'] = name => variables[name]
  const setVariable: AutomationData['setVariable'] = (name, value) => setVariables({ ...variables, [name]: value })
  const listVariables: AutomationData['listVariables'] = () => Object.keys(variables)

  const automationData: AutomationData = {
    stageIndex,
    setStageIndex,

    steps,
    addStep,
    removeStep,

    variables,
    getVariable,
    setVariable,
    listVariables
  }

  return (
    <AutomationContext.Provider value={automationData}>
      {children}
    </AutomationContext.Provider>
  )
}
