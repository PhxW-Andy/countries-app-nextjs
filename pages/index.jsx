import { useState } from 'react'
import { useQuery } from 'react-query'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

////// Import own components
import Loader from '../components/Loader'
import Filter from '../components/Home/Filter'
import Card from '../components/Home/Card'

///// Import utils
import { fetchFilteredCountries } from '../utils/fetchFilteredCountries'

export default function Home({ countries, regions }) {
  //set states for filter -> country, region
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState(null)

  //caching and fetching filtered data
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
        <title>Countries App</title>
        <meta name="description" content="country app,react,nextjs,api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filter regions={regions} setRegion={setRegion} setCountry={setCountry} />
      <div className={styles.grid}>
        {(isFetching || status === 'loading') && <Loader />}
        {status === 'success' &&
          !isFetching &&
          data.map((item, index) => <Card key={index} item={item} />)}
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
