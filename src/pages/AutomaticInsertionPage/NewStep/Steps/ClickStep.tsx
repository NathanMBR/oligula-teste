import {
  useContext,
  useState
} from 'react'
import { NativeSelect } from '@mantine/core'

import { AutomationContext } from '../../../../providers'
import { generateRandomID } from '../../../../helpers'

import { AutomationCard } from '../../Automation'
import { StepFinishFooter } from '../StepFinishFooter'

export type ClickStepProps = {
  onClose: () => void
}

export const ClickStep = (props: ClickStepProps) => {
  const { onClose } = props

  const [mouseButton, setMouseButton] = useState<AutomationCard.ClickProps['button']>('left')

  const { addStep } = useContext(AutomationContext)

  const addClickStep = () => {
    addStep({
      id: generateRandomID(),
      type: 'click',
      data: {
        button: mouseButton
      }
    })

    onClose()
  }

  return (
    <>
      <NativeSelect
        label='Botão do mouse'
        onChange={event => setMouseButton(event.currentTarget.value as AutomationCard.ClickProps['button'])}
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
