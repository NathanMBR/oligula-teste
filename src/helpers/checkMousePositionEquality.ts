import { MousePosition } from '../types'

export const checkMousePositionEquality = (positions: Array<MousePosition>) => positions.reduce(
  (positionsEquality, currentPosition, index) => {
    if (!positionsEquality)
      return false

    if (index <= 0)
      return true

    const previousPosition = positions[index - 1]!
    if (previousPosition.x !== currentPosition.x || previousPosition.y !== currentPosition.y)
      return false

    return true
  },
  true
)
