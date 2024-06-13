import {
  useContext,
  useState
} from 'react'
import { Select } from '@mantine/core'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'
import { useParentId } from '../../../../hooks'
import type { ClickStepData } from '../../../../types'

import { StepFinishFooter } from '../StepFinishFooter'

export type ClickStepProps = {
  onClose: () => void
}

export const ClickStep = (props: ClickStepProps) => {
  const { onClose } = props

  const [mouseButton, setMouseButton] = useState<ClickStepData['data']['button']>('left')

  const { addStep } = useContext(AutomationContext)

  const parentId = useParentId()

  const addClickStep = () => {
    addStep(
      {
        id: generateRandomID(),
        type: 'click',
        data: {
          button: mouseButton
        }
      },

      parentId
    )

    onClose()
  }

  return (
    <>
      <Select
        label='Botão do mouse'
        checkIconPosition='right'
        value={mouseButton}
        allowDeselect={false}
        onChange={value => setMouseButton(String(value) as ClickStepData['data']['button'])}
        data={[
          {
            value: 'left',
            label: 'Esquerdo'
          },

          {
            value: 'right',
            label: 'Direito'
          },

          {
            value: 'middle',
            label: 'Meio'
          }
        ]}
      />

      <StepFinishFooter
        addStep={addClickStep}
        allowFinish
      />
    </>
  )
}
