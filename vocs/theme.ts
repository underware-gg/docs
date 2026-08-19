import type { Config } from 'vocs/config'

//
// https://vocs.dev/docs/guides/theming
//
// reference: (uncollapse 'Theme Reference')
// https://vocs.dev/docs/guides/theming#variables
//

const accentColor = '#ffb82a';
export const theme: Pick<Config, 'accentColor' | 'colorScheme'> = {
  colorScheme: 'dark',
  accentColor,
};

export default theme;
