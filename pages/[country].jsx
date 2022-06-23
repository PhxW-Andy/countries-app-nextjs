import Image from 'next/image'

import ButtonBack from '../components/Country/ButtonBack'
import Details from '../components/Country/Details'

const country = ({ data }) => {
  return (
    <>
      <ButtonBack />
      {data.map((item, index) => (
        <Details key={index} item={item} />
      ))}
    </>
  )
}

export default country

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get countries
  const res = await fetch(`https://restcountries.com/v3.1/all`)
  const countries = await res.json()

  // Get the paths we want to pre-render based on country
  const paths = countries.map((country) => ({
    params: { country: country.name.common.toLowerCase() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the country `name`.
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${params.country}`,
  )
  const data = await res.json()

  // Pass post data to the page via props
  return { props: { data } }
}
