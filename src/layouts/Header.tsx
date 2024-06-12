import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Text,
  Title
} from '@mantine/core'
import {
  useContext,
  type PropsWithChildren
} from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import { HeaderContext } from '../providers'
import { ensureCharactersLimit } from '../helpers'

export type HeaderProps = Required<PropsWithChildren>

export const Header = (props: HeaderProps) => {
  const { children } = props

  const {
    backHref,
    pageTitle,
    pageSubtitle
  } = useContext(HeaderContext)

  return (
    <>
      <Group mb='lg' >
        <Link to={backHref}>
          <ActionIcon
            variant='subtle'
            color='gray'
            size='xl'
            radius='xl'
            aria-label='Voltar'
          >
            <IconChevronLeft />
          </ActionIcon>
        </Link>

        <Box>
          <Title order={1}>{pageTitle}</Title>

          {
            pageSubtitle
              ? <Text size='md'>{ensureCharactersLimit(pageSubtitle, 100)}</Text>
              : null
          }
        </Box>
      </Group>

      <Divider mb='md' />

      {children}
    </>
  )
}
