import {
  IconPlus,
  IconSettingsAutomation
} from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { invoke } from '@tauri-apps/api'

import {
  Navbar,
  Header
} from '../../layouts'
import { FAB } from '../../components'
import { sleep } from '../../helpers'
import { MouseButton } from '../../types'

import {
  Automation,
  type AutomationProps
} from './Automation'
import { NewStep } from './NewStep'

export const AutomaticInsertionPage = () => {
  const [isNewStepOpen, setIsNewStepOpen] = useState(false)
  const [steps, setSteps] = useState<AutomationProps['steps']>([])

  const runAutomation = async () => {
    /* eslint-disable no-await-in-loop */
    for (const step of steps) {
      await sleep(1000)

      if (step.type === 'move') {
        await invoke('move_mouse_to', { position: step.data })
        continue
      }

      if (step.type === 'click') {
        await invoke('click', { button: MouseButton[step.data.button] })
        continue
      }

      if (step.type === 'write') {
        await invoke('write', { text: 'Hello world' })
        continue
      }
    }
    /* eslint-enable no-await-in-loop */
  }

  return (
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

        <Automation
          steps={steps}
          removeStep={id => setSteps(steps.filter(step => step.id !== id))}
        />

        <NewStep
          isOpen={isNewStepOpen}
          addStep={newStep => setSteps([...steps, newStep])}
          onClose={() => setIsNewStepOpen(false)}
        />

        <FAB
          ActionIconProps={{ variant: 'filled' }}
          onClick={runAutomation}
          hidden={steps.length <= 0}
          icon={<IconSettingsAutomation />}
        />
      </Header>
    </Navbar>
  )
}
