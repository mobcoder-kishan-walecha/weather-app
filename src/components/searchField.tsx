import { useEffect, useState } from 'react'
import { CountryList } from './home'
import { searchCity } from '../service'

export default function SearchField(props: any) {

  const [search, setSearch] = useState<string>('')
  const [countryList, setCountryList] = useState<CountryList[]>([])

  useEffect(() => {
    if (search !== '') {
      getCountryData()
    }
  }, [search])

  const getCountryData = async () => {

    try {
      const response = await searchCity(search)
      setCountryList(response.data.results)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSelect = (value: any, index: number) => {
    props.handleCallBack(value, index);
    setCountryList([])
  }

  const onChangeSearch = (e: any) => {
    handleSelect(e.target.value, props.index)
    setSearch(e.target.value)
  }

  return (
    <div>
      <div className='latitude_div'>
        <label className='latitude_heading'>City</label>
        <div className='cityIcon'>
          <input name='city' list="suggestions" style={{ width: "100%" }} value={props.Value ? props.Value : search} onChange={(e) => onChangeSearch(e)} />
        </div>
        {countryList?.length > 0 &&
          <div className='country_div'>
            {countryList && countryList.map((value, i) => {
              return (
                <p onClick={() => handleSelect(value, props.index)} key={i}>{value.name}</p>
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}
