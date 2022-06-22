import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import Select from 'react-select'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'

/////// Get filtered data with react-query
const fetchFilteredCountries = async ({ queryKey }) => {
  const [_key, { country, region }] = queryKey

  if (country) {
    const res = await fetch(`https://restcountries.com/v3.1/all`)
    const data = await res.json()

    if (region) {
      return data.filter(
        (c) =>
          c.name.common.toLowerCase().includes(`${country}`) &&
          c.region == `${region}`,
      )
    }
    return data.filter((c) =>
      c.name.common.toLowerCase().includes(`${country}`),
    )
  }

  if (region) {
    const res = await fetch(`https://restcountries.com/v3.1/all`)
    const data = await res.json()

    return data.filter((r) => r.region == `${region}`)
  }

  const res = await fetch(`https://restcountries.com/v3.1/all`)
  return res.json()
}

export default function Home({ countries, regions }) {
  // const queryClient = useQueryClient()

  const [country, setCountry] = useState('')
  const [region, setRegion] = useState(null)

  const { data, status, isFetching } = useQuery(
    ['countries', { country, region }],
    fetchFilteredCountries,
    {
      initialData: countries,
    },
  )

  return (
    <>
      <Head>
        <title>Country App</title>
        <meta name="description" content="country app,react,nextjs,api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <div className={styles.grid}>
        {(isFetching || status === 'loading') && <Loader />}
        {status === 'success' &&
          !isFetching &&
          data.map((item, index) => (
            <Link
              key={index}
              href={`/${encodeURIComponent(item.name.common.toLowerCase())}`}
            >
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
          ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  /*********
  Fetch all countries
  *********/
  const res = await fetch(`https://restcountries.com/v3.1/all`)
  const countries = await res.json()

  /*********
  Fetch all regions and filter them to get unique regions
  *********/
  const resRegion = await fetch(
    `https://restcountries.com/v3/all?fields=region`,
  )
  const regionData = await resRegion.json()

  const regions = regionData.map((r) => r.region)
  const uniqueRegions = regionData.filter(
    ({ region }, index) => !regions.includes(region, index + 1),
  )

  return { props: { countries: countries, regions: uniqueRegions } }
}
