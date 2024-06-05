import { useState } from 'react'

import {
  Navbar,
  Header
} from '../../layouts'
import { AutomationProvider } from '../../providers'

import { Automation } from './Automation'
import { NewStep } from './NewStep'
import { RunAutomation } from './RunAutomation'

export const AutomaticInsertionPage = () => {
  const [isNewStepOpen, setIsNewStepOpen] = useState(false)

  return (
    <AutomationProvider>
      <Navbar selectedOption='Inserção automática'>
        <Header title='Inserção automática' backHref='/'>
          <Automation setIsNewStepOpen={setIsNewStepOpen} />

          <NewStep
            isOpen={isNewStepOpen}
            onClose={() => setIsNewStepOpen(false)}
          />

          <RunAutomation />
        </Header>
      </Navbar>
    </AutomationProvider>
  )
}
