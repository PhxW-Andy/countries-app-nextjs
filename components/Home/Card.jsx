import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home/Card.module.css'

const Card = ({ item }) => {
  return (
    <Link href={`/${encodeURIComponent(item.name.common.toLowerCase())}`}>
      <div className={styles.card}>
        <div className={styles.img__wrapper}>
          <Image src={item.flags.svg} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.content}>
          <h4>{item.name.common}</h4>
          <ul>
            <li>
              <strong>Population:</strong>
              {item.population.toLocaleString() ?? '-'}
            </li>
            <li>
              <strong>Region:</strong>
              {item.region ?? '-'}
            </li>
            <li>
              <strong>Capital:</strong>
              {item.capital ?? '-'}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}

export default Card
