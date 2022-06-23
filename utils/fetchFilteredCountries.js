/////// Get filtered data with react-query
export const fetchFilteredCountries = async ({ queryKey }) => {
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
