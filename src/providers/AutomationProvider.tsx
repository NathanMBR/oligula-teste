import {
  createContext,
  useState,
  type PropsWithChildren
} from 'react'

import type {
  StepData,
  Variables
} from '../types'

export type AutomationData = {
  stageIndex: number
  setStageIndex: (index: number) => void

  steps: Array<StepData>
  addStep: (step: StepData) => void
  removeStep: (id: StepData['id']) => void

  variables: Variables
  getVariable: (name: string) => Variables[string] | undefined
  setVariable: (name: string, value: Variables[string]) => void
  hasVariable: (name: string) => boolean
  listVariables: () => Array<string>
  deleteVariable: (name: string) => void
  deleteVariablesById: (id: number) => void
}

const defaultAutomationData: AutomationData = {
  stageIndex: 0,
  setStageIndex: () => {},

  steps: [],
  addStep: () => {},
  removeStep: () => {},

  variables: {},
  getVariable: () => undefined,
  setVariable: () => {},
  hasVariable: () => false,
  listVariables: () => [],
  deleteVariable: () => {},
  deleteVariablesById: () => {}
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

  const getVariable: AutomationData['getVariable'] = name => variables[name.toLowerCase()]
  const setVariable: AutomationData['setVariable'] = (name, value) => setVariables({ ...variables, [name.toLowerCase()]: value })
  const hasVariable: AutomationData['hasVariable'] = name => name.toLowerCase() in variables
  const listVariables: AutomationData['listVariables'] = () => Object.keys(variables)
  const deleteVariable: AutomationData['deleteVariable'] = name => {
    const newVariables = { ...variables }
    delete newVariables[name.toLowerCase()]
    setVariables(newVariables)
  }
  const deleteVariablesById: AutomationData['deleteVariablesById'] = id => {
    const newVariables = { ...variables }
    for (const [variable, { ownerId }] of Object.entries(newVariables))
      if (ownerId === id)
        delete newVariables[variable]

    setVariables(newVariables)
  }

  const automationData: AutomationData = {
    stageIndex,
    setStageIndex,

    steps,
    addStep,
    removeStep,

    variables,
    getVariable,
    setVariable,
    hasVariable,
    listVariables,
    deleteVariable,
    deleteVariablesById
  }

  return (
    <AutomationContext.Provider value={automationData}>
      {children}
    </AutomationContext.Provider>
  )
}
