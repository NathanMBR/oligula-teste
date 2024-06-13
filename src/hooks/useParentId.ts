import { useParams } from 'react-router-dom'

import type { AutomatorPageParams } from '../pages'

export const useParentId = () => {
  const { expandedStepId: rawExpandedStepId } = useParams<AutomatorPageParams>()

  const defaultParentId = -1

  const expandedStepId = Number(rawExpandedStepId)
  if (Number.isNaN(expandedStepId) || expandedStepId < 0)
    return defaultParentId

  return expandedStepId
}
