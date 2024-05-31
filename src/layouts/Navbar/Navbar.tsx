import {
  AppShell,
  Box,
  Code,
  Group,
  Text
} from '@mantine/core'
import {
  type PropsWithChildren,
  useContext
} from 'react'
import { Link } from 'react-router-dom'

import {
  type NavbarItemsLabels,
  navbarItems
} from './navbarItems'
import { ThemeSwitch } from './ThemeSwitch'
import { PreloadContext } from '../../providers'

import classes from './Navbar.module.css'

export type NavbarProps = {
  selectedOption?: NavbarItemsLabels
} & Required<PropsWithChildren>

export const Navbar = (props: NavbarProps) => {
  const {
    children,
    selectedOption
  } = props

  const preloadData = useContext(PreloadContext)

  return (
    <AppShell
      padding='md'
      navbar={{
        breakpoint: 'sm',
        width: 300
      }}
    >
      <AppShell.Navbar>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify='space-between'>
              <Link to='/' className={classes.headerLink}>
                <Text size='lg'>Oligula Automatizações</Text>
              </Link>
              <Code fw={700}>{preloadData.app.version}</Code>
            </Group>

            {
              navbarItems.map(
                item => <Box
                  key={item.label}
                  my='xs'
                >
                  <Link
                    to={item.link}
                    className={classes.link}
                    data-active={item.label === selectedOption || undefined}
                  >
                    <item.icon className={classes.linkIcon} stroke={1.5} />
                    <Text size='sm'>{item.label}</Text>
                  </Link>
                </Box>
              )
            }
          </div>

          <div>
            <ThemeSwitch />
          </div>
        </nav>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
