import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { IconSettingsAutomation } from '@tabler/icons-react'

import { AutomationContext } from '../../../providers'
import { FAB } from '../../../components'

import { runAutomationScript } from './runAutomationScript'
import type { AutomatorPageParams } from '../AutomatorPage'

export const RunAutomation = () => {
  const automationPayload = useContext(AutomationContext)

  const { expandedStepId: rawExpandedStepId } = useParams<AutomatorPageParams>()
  const expandedStepId = Number(rawExpandedStepId)

  const isHidden =
    automationPayload.steps.length <= 0 ||
    Number.isNaN(expandedStepId) ||
    expandedStepId !== -1

  return (
    <FAB
      ActionIconProps={{ variant: 'filled' }}
      onClick={() => runAutomationScript(automationPayload)}
      icon={<IconSettingsAutomation />}
      hidden={isHidden}
    />
  )
}
