import {
  Alert,
  Button,
  Code,
  Group,
  Loader,
  Modal,
  Text,
  Title,
  Transition
} from '@mantine/core'
import {
  useContext,
  useState,
  type ReactElement
} from 'react'
import { IconInfoCircle } from '@tabler/icons-react'

import { PreloadContext } from '../../providers'

type UpdateModalBodyProps = {
  handleClose: () => void
  handleUpdate: () => void
}

const UpdateModalAvailableBody = (props: UpdateModalBodyProps) => {
  const {
    handleClose,
    handleUpdate
  } = props

  return (
    <>
      <Text>Uma nova versão está disponível.</Text>
      <Text fw={500}>Gostaria de baixá-la?</Text>

      <Group mt='md' justify='flex-end'>
        <Button
          variant='default'
          onClick={handleClose}
        >
          Não
        </Button>

        <Button onClick={handleUpdate}>Sim</Button>
      </Group>
    </>
  )
}

const UpdateModalUpdatingBody = (props: UpdateModalBodyProps) => {
  const {
    handleClose,
    handleUpdate
  } = props

  return (
    <>
      <Text>Baixando atualização...</Text>

      <Group mt='md' justify='flex-end'>
        <Button
          variant='default'
          onClick={handleClose}
          disabled
        >
          Não
        </Button>

        <Button
          onClick={handleUpdate}
          disabled
        >
          <Loader size={20} />
        </Button>
      </Group>
    </>
  )
}

const UpdateModalSuccessBody = (props: Pick<UpdateModalBodyProps, 'handleClose'>) => {
  const { handleClose } = props

  return (
    <>
      <Text>Atualização concluída com sucesso.</Text>
      <Text>Por favor, <span style={{ fontWeight: 'bold' }}>reinicie o programa</span> para aplicar as atualizações.</Text>

      <Group mt='md' justify='flex-end'>
        <Button onClick={handleClose}>Fechar</Button>
      </Group>
    </>
  )
}

const UpdateModalFailureBody = (props: Pick<UpdateModalBodyProps, 'handleClose'>) => {
  const { handleClose } = props

  const { os } = useContext(PreloadContext)
  const isLinux = os.type === 'Linux'

  return (
    <>
      <Text mb='xl'>Um erro inesperado ocorreu durante a atualização.</Text>

      {
        isLinux
          ? <Alert
            title='Nota sobre o Linux'
            color='yellow'
            icon={<IconInfoCircle />}
          >
            <Text mb='xs'>A atualização automática não está disponível caso tenha instalado este aplicativo pelo pacote <Code>.deb</Code>.</Text>
            <Text>Caso este seja o seu caso, baixe a atualização manualmente do repositório do GitHub, ou considere mudar para a versão <Code>AppImage</Code>.</Text>
          </Alert>
          : null
      }

      <Group mt='md' justify='flex-end'>
        <Button onClick={handleClose}>Fechar</Button>
      </Group>
    </>
  )
}

export const UpdateModal = () => {
  type UpdateStates = 'AVAILABLE' | 'UPDATING' | 'SUCCESS' | 'FAILURE'

  const { update } = useContext(PreloadContext)

  const [open, isOpen] = useState(update.available || true as boolean)
  const [updateState, setUpdateState] = useState<UpdateStates>('AVAILABLE')

  const handleClose = () => isOpen(false)

  const handleUpdate = () => {
    const executeUpdate = async () => {
      const success = await update.execute()
      return success
    }

    setUpdateState('UPDATING')

    executeUpdate()
      .then(success => setUpdateState(success ? 'SUCCESS' : 'FAILURE'))
  }

  const isUpdating = updateState === 'UPDATING'

  const modalBodies: Record<UpdateStates, ReactElement> = {
    AVAILABLE: <UpdateModalAvailableBody
      handleClose={handleClose}
      handleUpdate={handleUpdate}
    />,

    UPDATING: <UpdateModalUpdatingBody
      handleClose={handleClose}
      handleUpdate={handleUpdate}
    />,

    SUCCESS: <UpdateModalSuccessBody
      handleClose={handleClose}
    />,

    FAILURE: <UpdateModalFailureBody
      handleClose={handleClose}
    />
  }

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
            <Title order={4}>
              {
                updateState === 'FAILURE'
                  ? 'Erro durante a atualização'
                  : 'Atualização disponível'
              }
            </Title>
          </Modal.Title>

          <Transition mounted={!isUpdating}>
            {
              styles => <Modal.CloseButton style={styles} disabled={isUpdating} />
            }
          </Transition>
        </Modal.Header>

        <Modal.Body>
          {modalBodies[updateState]}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
