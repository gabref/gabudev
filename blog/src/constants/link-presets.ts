import { LinkPreset, type NavBarLink } from '@/types/config'

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
  [LinkPreset.Home]: {
    name: 'Home',
    url: '/',
  },
  [LinkPreset.About]: {
    name: 'About',
    url: '/about/',
  },
  [LinkPreset.Archive]: {
    name: 'Archive',
    url: '/archive/',
  },
}
