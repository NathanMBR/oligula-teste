import {
  ActionIcon,
  Divider,
  Group,
  Title
} from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

export type HeaderProps = PropsWithChildren<{
  backHref: string
  title: string
}>

export const Header = (props: HeaderProps) => {
  const {
    backHref,
    title,
    children
  } = props

  return (
    <>
      <Group mb='lg'>
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

        <Title order={1}>{title}</Title>
      </Group>

      <Divider mb='md' />

      {children}
    </>
  )
}
