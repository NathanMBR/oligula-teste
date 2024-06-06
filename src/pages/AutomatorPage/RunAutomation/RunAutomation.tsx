import { useContext } from 'react'
import { IconSettingsAutomation } from '@tabler/icons-react'

import { AutomationContext } from '../../../providers'
import { FAB } from '../../../components'

import { runAutomationScript } from './runAutomationScript'

export const RunAutomation = () => {
  const automationPayload = useContext(AutomationContext)

  return (
    <FAB
      ActionIconProps={{ variant: 'filled' }}
      onClick={() => runAutomationScript(automationPayload)}
      icon={<IconSettingsAutomation />}
      hidden={automationPayload.steps.length <= 0}
    />
  )
}
