import sponsors from '../../vocs/sponsors'

export default function Sponsors() {
  return (
    <div className="Sponsors">
      {sponsors.map((group) => (
        <section className="Sponsors_group" key={group.name}>
          <h2>{group.name}</h2>
          {group.items.map((row) => (
            <div className="Sponsors_items" key={row.map((sponsor) => sponsor.name).join(':')}>
              {row.map((sponsor) => (
                <a href={sponsor.link} key={sponsor.name} rel="noreferrer" target="_blank">
                  <img
                    alt={sponsor.name}
                    height={group.height}
                    loading="lazy"
                    src={sponsor.image}
                  />
                </a>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
