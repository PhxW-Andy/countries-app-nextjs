import Link from 'next/link'
import styles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <Link href={'/'}>
          <h1>Where in the World?</h1>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
