import { defineConfig } from 'vocs'
import sponsors from './sponsors'
import theme from './theme'

export default defineConfig({
  title: 'Underware.gg',
  sponsors,
  theme,
  font: {
    default: {
      // google: 'Inter' // default
      // google: 'Roboto' // ok
      // google: 'Abel' // thinner
      google: 'Ubuntu' // stylish
    },
    mono: {
      google: 'Courier Prime'
    }
  },
  socials: [
    {
      icon: "x",
      link: "https://x.com/underware_gg",
    },
    {
      icon: "github",
      link: "https://github.com/underware-gg",
    },
    // {
    //   icon: "discord",
    //   link: "https://discord.com/invite/underware-gg",
    // },
    // {
    //   icon: "telegram",
    //   link: "https://telegram.com/g/underware-gg",
    // },
  ],

  sidebar: [
    //------------------------------------
    // Underware
    //
    {
      text: 'Underware',
      collapsed: true,
      items: [
        {
          text: 'About',
          link: '/underware',
        },
        {
          text: 'Team',
          link: '/underware/team',
        },
      ]
    },

    //------------------------------------
    // Pistols at 10 Blocks
    //
    {
      text: "Pistols at 10 Blocks",
      collapsed: true,
      items: [
        {
          text: 'About',
          link: '/pistols',
        },
        {
          text: 'For Honour!',
          link: '/pistols/for-honour',
        },
        {
          text: 'Gameplay',
          link: '/pistols/gameplay',
          items: [
            {
              text: 'Getting Started',
              link: '/pistols/getting-started',
            },
            {
              text: 'Pistols Round',
              link: '/pistols/pistols-round',
            },
            {
              text: 'Blades Round',
              link: '/pistols/blades-round',
            },
            {
              text: 'Advanced',
              link: '/pistols/advanced',
            },
          ],
        },
      ],
    },

    //------------------------------------
    // Underdark
    //
    {
      text: "Underdark",
      collapsed: true,
      items: [
        {
          text: 'About',
          link: '/underdark',
        },
        {
          text: 'Getting Started',
          link: '/underdark/getting-started',
        },
      ],
    },

    //------------------------------------
    // Loot Underworld
    //
    {
      text: "Loot Underworld",
      collapsed: true,
      items: [
        {
          text: 'About',
          link: '/underworld',
        },
        {
          text: 'Lore',
          link: '/underworld/lore',
        },
      ],
    },

    //------------------------------------
    // Developer resources
    //
    // {
    //   text: "Developer Resources",
    //   items: [
    //     {
    //       text: 'Dojo Lib',
    //       link: '/dev/dojo-lib',
    //     },
    //     {
    //       text: 'Crawler SDK',
    //       link: '/dev/crawler-sdk',
    //     },
    //   ]
    // }, // Developer

  ],
})
