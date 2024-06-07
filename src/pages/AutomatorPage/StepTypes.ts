import {
  type Icon,
  IconMouse2,
  IconPointer,
  IconCursorText,
  IconFileText,
  IconScissors,
  IconRotateClockwise
} from '@tabler/icons-react'

import type { StepData } from '../../types'

export const StepTypes: Record<
  StepData['type'],
  {
    title: string
    icon: Icon
  }
> = {
  move: {
    title:'Mover o mouse',
    icon: IconMouse2
  },

  click: {
    title: 'Clicar com o mouse',
    icon: IconPointer
  },

  write: {
    title:'Inserir dado',
    icon: IconCursorText
  },

  readFile: {
    title: 'Ler dados de um arquivo',
    icon: IconFileText
  },

  parseString: {
    title: 'Dividir texto',
    icon: IconScissors
  },

  cycle: {
    title: 'Repetir passos para vários valores',
    icon: IconRotateClockwise
  }
}
