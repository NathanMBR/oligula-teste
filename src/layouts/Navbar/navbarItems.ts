import {
  type Icon,
  IconAutomation,
  IconRubberStamp
} from '@tabler/icons-react'

type NavbarItem = {
  link: string
  label: string
  icon: Icon
}

export const navbarItems = [
  {
    link: '/automatic-insertion',
    label: 'Inserção automática',
    icon: IconAutomation
  },

  {
    link: '/inmetro-seal-generator',
    label: 'Gerador de selo Inmetro',
    icon: IconRubberStamp
  }
] as const satisfies Array<NavbarItem> // merging 'as const' with 'satisfies' to get both type enforcement and inference

export type NavbarItemsLabels = typeof navbarItems[number]['label']
