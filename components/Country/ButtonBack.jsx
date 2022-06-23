import Link from 'next/link'
import styles from '../../styles/Country/Button.module.css'

const ButtonBack = () => {
  return (
    <div className={styles.btn_back}>
      <Link href={'/'}>
        <button>Back to overview</button>
      </Link>
    </div>
  )
}

export default ButtonBack
