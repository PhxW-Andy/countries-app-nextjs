import styles from '../../styles/Country/Country.module.css'

const Details = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={item.flags.svg} alt={item.name.common} />
      </div>
      <div className={styles.content}>
        <h1>{item.name.common}</h1>
        <ul className={styles.list}>
          <li>
            <strong>Population: </strong>
            {item.population.toLocaleString() ?? '-'}
          </li>
          <li>
            <strong>Top Level Domain: </strong>
            {item.tld
              ? item.tld.map((item) => (item ? item : '-')).join(', ')
              : '-'}
          </li>
          <li>
            <strong>Region: </strong>
            {item.region ?? '-'}
          </li>
          <li>
            <strong>Subregion: </strong>
            {item.subregion ?? '-'}
          </li>
          <li>
            <strong>Capital: </strong>
            {item.capital ?? '-'}
          </li>
          <li>
            <strong>Currencies: </strong>
            {item.currencies
              ? Object.keys(item.currencies)
                  .map((value) => item.currencies[value].name)
                  .join(', ')
              : '-'}
          </li>
          <li>
            <strong>Languages: </strong>
            {item.languages
              ? Object.keys(item.languages)
                  .map((lang) => item.languages[lang])
                  .join(', ')
              : '-'}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Details
