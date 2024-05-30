import { Theme } from 'vocs'

//
// https://vocs.dev/docs/guides/theming
//
// reference: (uncollapse 'Theme Reference')
// https://vocs.dev/docs/guides/theming#variables
//

const accentColor = '#ffb82a';
const accentColor2 = '#ffde9b';

export const theme: Theme = {
  colorScheme: 'dark',
  accentColor,
  variables: {
    color: {
      text: {
        light: '#ebebeb',
        dark: 'white',
      },
      background: {
        light: 'white',
        dark: '#232225',
      },
      backgroundDark: { // sidebar
        light: '#f9f9f9',
        dark: '#1e1d1f',
      },
      blockquoteText: accentColor2,
    },
  }
};

export default theme;
