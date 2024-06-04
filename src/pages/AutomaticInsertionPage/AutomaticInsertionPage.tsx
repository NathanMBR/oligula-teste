import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

import {
  Navbar,
  Header
} from '../../layouts'
import { AutomationProvider } from '../../providers'

import {
  Automation,
  RunAutomation
} from './Automation'
import { NewStep } from './NewStep'

export const AutomaticInsertionPage = () => {
  const [isNewStepOpen, setIsNewStepOpen] = useState(false)

  return (
    <AutomationProvider>
      <Navbar selectedOption='Inserção automática'>
        <Header title='Inserção automática' backHref='/'>
          <Button
            variant='default'
            mb='md'
            leftSection={<IconPlus />}
            onClick={() => setIsNewStepOpen(true)}
            fullWidth
          >
            Adicionar passo
          </Button>

          <Automation />

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
