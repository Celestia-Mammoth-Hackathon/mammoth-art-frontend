import { Theme, darkTheme } from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';

export const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#FF6B6B',
    modalBorder: '#FFFFFF',
    modalBackground: '#000000',
  },
  radii: {
    actionButton: '0px',
    connectButton: '0px',
    menuButton: '0px',
    modal: '0px',
    modalMobile: '0px',
  },
  shadows: {
    // dialog: '0 0 #0000, 0 0 #0000, 4px 6px 0px 0px #FFFFFF',
  },
  fonts: {
    body: `'IBM Plex Mono', 'Neue Haas Grotesk', 'Helvetica', 'sans-serif'`,
  },
} as Theme);
