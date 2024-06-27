import {
  Button,
  Group,
  Loader,
  Modal,
  Text,
  Title,
  Transition
} from '@mantine/core'
import {
  useContext,
  useEffect,
  useState
} from 'react'

import { PreloadContext } from '../../providers'
import { sleep } from '../../helpers'

export const UpdateModal = () => {
  const { update } = useContext(PreloadContext)

  const [open, isOpen] = useState(update.available)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleClose = () => isOpen(false)

  const handleUpdate = () => {
    const executeUpdate = async () => {
      await sleep(1000)
      await update.execute()
    }

    setIsUpdating(true)

    executeUpdate()
      .finally(handleClose)
  }

  useEffect(() => {
    return () => {
      if (update.unlisten)
        update.unlisten()
    }
  }, [])

  return (
    <Modal.Root
      opened={open}
      onClose={handleClose}
      closeOnEscape={!isUpdating}
      closeOnClickOutside={!isUpdating}
      centered
    >
      <Modal.Overlay blur={2.5} />

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Title order={3}>Atualização disponível</Title>
          </Modal.Title>

          <Transition mounted={!isUpdating}>
            {
              styles => <Modal.CloseButton style={styles} disabled={isUpdating} />
            }
          </Transition>
        </Modal.Header>

        <Modal.Body>
          {
            isUpdating
              ? <Text>Baixando atualização...</Text>
              : <>
                <Text>Uma nova versão está disponível.</Text>
                <Text fw={500}>Gostaria de baixá-la?</Text>
              </>
          }

          <Group mt='md' justify='flex-end'>
            <Button
              variant='default'
              onClick={handleClose}
              disabled={isUpdating}>
              Não
            </Button>

            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {
                isUpdating
                  ? <Loader size={20} />
                  : 'Sim'
              }
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
