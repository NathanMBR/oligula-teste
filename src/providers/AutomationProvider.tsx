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
  steps: Array<Step>
  addStep: (step: Step) => void
  removeStep: (id: Step['id']) => void

  variables: Variables
  getVariable: (name: keyof Variables) => Variables[keyof Variables]
  setVariable: (name: keyof Variables, value: Variables[keyof Variables]) => void
}

const defaultAutomationData: AutomationData = {
  steps: [],
  addStep: () => {},
  removeStep: () => {},

  variables: {},
  getVariable: () => {},
  setVariable: () => {}
}

export const AutomationContext = createContext(defaultAutomationData)

export type AutomationProviderProps = Required<PropsWithChildren>

export const AutomationProvider = (props: AutomationProviderProps) => {
  const { children } = props

  const [steps, setSteps] = useState(defaultAutomationData.steps)
  const [variables, setVariables] = useState(defaultAutomationData.variables)

  const addStep: AutomationData['addStep'] = step => setSteps([...steps, step])
  const removeStep: AutomationData['removeStep'] = id => setSteps(steps.filter(step => step.id !== id))

  const getVariable: AutomationData['getVariable'] = name => variables[name]
  const setVariable: AutomationData['setVariable'] = (name, value) => setVariables({ ...variables, [name]: value })

  const automationData: AutomationData = {
    steps,
    addStep,
    removeStep,

    variables,
    getVariable,
    setVariable
  }

  return (
    <AutomationContext.Provider value={automationData}>
      {children}
    </AutomationContext.Provider>
  )
}
