import Select from 'react-select'
import styles from '../../styles/Home/Filter.module.css'

const Filter = (props) => {
  const { regions, setRegion, setCountry } = props

  return (
    <div className={styles.filter}>
      <div>
        <input
          type="search"
          name="country"
          placeholder="Search for country..."
          onChange={(e) => setCountry(e.target.value.toLowerCase())}
        />
      </div>
      <div>
        <Select
          getOptionLabel={(option) => option.region}
          getOptionValue={(option) => option.region}
          options={regions}
          isClearable={true}
          placeholder="Filter by region.."
          onChange={(value) => setRegion(value ? value.region : null)}
        />
      </div>
    </div>
  )
}

export default Filter
