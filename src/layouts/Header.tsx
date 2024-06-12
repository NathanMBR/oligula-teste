import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Text,
  Title
} from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

import { ensureCharactersLimit } from '../helpers'

export type HeaderProps = PropsWithChildren<{
  backHref: string
  title: string
  subtitle?: string
}>

export const Header = (props: HeaderProps) => {
  const {
    backHref,
    title,
    subtitle,
    children
  } = props

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
          <Title order={1}>{title}</Title>

          {
            subtitle
              ? <Text size='md'>{ensureCharactersLimit(subtitle, 100)}</Text>
              : null
          }
        </Box>
      </Group>

      <Divider mb='md' />

      {children}
    </>
  )
}
