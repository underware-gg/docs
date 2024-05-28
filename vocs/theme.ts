import { Theme } from 'vocs'

//
// https://vocs.dev/docs/guides/theming
//
// reference: (uncollapse 'Theme Reference')
// https://vocs.dev/docs/guides/theming#variables
//

export const theme: Theme = {
  colorScheme: 'dark',
  accentColor: '#ffb82a',
  variables: {
    color: {
      background: {
        light: 'white',
        dark: '#232225',
      },
      backgroundDark: { // sidebar
        light: '#f9f9f9',
        dark: '#1e1d1f',
      },
    },
  }
};

export default theme;
