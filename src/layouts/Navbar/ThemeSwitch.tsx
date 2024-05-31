import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group
} from '@mantine/core'
import {
  IconSun,
  IconMoon
} from '@tabler/icons-react'
import clsx from 'clsx'

import classes from './ThemeSwitch.module.css'

export const ThemeSwitch = () => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <Group justify='center'>
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <IconSun className={clsx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={clsx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  )
}
