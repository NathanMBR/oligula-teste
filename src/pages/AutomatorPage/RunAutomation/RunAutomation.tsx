import { useContext } from 'react'
import { IconSettingsAutomation } from '@tabler/icons-react'

import { AutomationContext } from '../../../providers'
import { FAB } from '../../../components'

import { runAutomation } from './runAutomation'

export const RunAutomation = () => {
  const automationPayload = useContext(AutomationContext)

  return (
    <FAB
      ActionIconProps={{ variant: 'filled' }}
      onClick={() => runAutomation(automationPayload)}
      icon={<IconSettingsAutomation />}
      hidden={automationPayload.steps.length <= 0}
    />
  )
}
