import { Config } from 'vocs'

//
// https://vocs.dev/docs/guides/components#sponsors
//

type Sponsor = {
  name: string
  link: string
  image: string
}

const BibliothecaDAO: Sponsor = {
  name: 'BibliothecaDAO',
  image: '/partners/BibliothecaDAO.svg',
  link: 'https://www.bibliothecadao.xyz',
}
const RealmsWorld: Sponsor = {
  name: 'RealmsWorld',
  image: '/partners/RealmsWorld.png',
  link: 'https://realms.world',
}
const Cartridge: Sponsor = {
  name: 'Cartridge',
  image: '/partners/Cartridge.svg',
  link: 'https://cartridge.gg',
}
const Dojo: Sponsor = {
  name: 'Dojo',
  image: '/partners/Dojo.svg',
  link: 'https://www.dojoengine.org',
}
const Mask: Sponsor = {
  name: 'Mask Network',
  image: '/partners/Mask.svg',
  link: 'https://mask.io',
}
const Starknet: Sponsor = {
  name: 'Starknet',
  image: '/partners/Starknet.svg',
  link: 'https://www.starknet.io',
}

type SponsorSet = Config['sponsors']

const sponsors: SponsorSet = [
  {
    name: 'Partners',
    height: 80,
    items: [
      [RealmsWorld, BibliothecaDAO],
      [Cartridge, Starknet],
      [Dojo, Mask],
    ],
  },
  // {
  //   name: 'Sponsors',
  //   height: 60,
  //   items: [
  //     []
  //   ],
  // },
]

export default sponsors;
