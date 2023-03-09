import axios from 'axios'


const searchBaseUrl = 'https://geocoding-api.open-meteo.com/v1/'
const forecastBaseUrl = 'https://api.open-meteo.com/v1/'

export const searchCity = async(search:String) =>{
        const url = searchBaseUrl+`search?name=${search}`

        return axios.get(url)
}

export const getForecastData = async(lat:string, long:string, temp:string, startDate?:string, endDate?:string)=>{
    let url = forecastBaseUrl+`forecast?timeformat=unixtime`
    if (lat){
        url += `&latitude=${lat}`
    }
    if (long){
        url += `&longitude=${long}`
    }
    if (temp){
        url += `&hourly=${temp}`
    }
    if (startDate){
        url += `&start_date=${startDate}`
    }
    if (endDate){
        url += `&end_date=${endDate}`
    }
    return axios.get(url)

}