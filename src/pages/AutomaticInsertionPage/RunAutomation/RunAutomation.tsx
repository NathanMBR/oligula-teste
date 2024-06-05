import { useContext } from 'react'
import { IconSettingsAutomation } from '@tabler/icons-react'

import { AutomationContext } from '../../../providers'
import { FAB } from '../../../components'

import { runAutomation } from './runAutomation'

export const RunAutomation = () => {
  const { steps } = useContext(AutomationContext)

  return (
    <FAB
      ActionIconProps={{ variant: 'filled' }}
      onClick={() => runAutomation(steps)}
      icon={<IconSettingsAutomation />}
      hidden={steps.length <= 0}
    />
  )
}
