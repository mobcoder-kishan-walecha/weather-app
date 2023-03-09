import { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {getForecastData} from '../service'

interface dataType {
  name: string,
  data: number[]
}

export default function Graph(props: any) {
  const [data, setData] = useState<dataType[]>([]);
  const [graphResponse, setGraphResponse] = useState<any>()

  useEffect(() => {
    console.log(props);
    if (props.temp.length) {
      getTempData()
    }
  }, [props.data.Latitude, props.data.Longitude, props.temp, props.data.endDate])

  useEffect(() => {
    getSeries();
  }, [graphResponse])

  const options = {
    title: {
      text: ``
    },
    yAxis: {
      title: {
        text: `${graphResponse?.hourly_units?.temperature_2m}`
      }
    },
    series: data,
    xAxis: {}


  }

  const getSeries = () => {
    if (graphResponse?.hourly?.temperature_2m && graphResponse?.hourly?.relativehumidity_2m) {
      setData([{
        name: 'temperature_2m',
        data: graphResponse?.hourly?.temperature_2m
      },
      {
        name: 'relativehumidity_2m',
        data: graphResponse?.hourly?.relativehumidity_2m
      }
      ])
    }
    else if (graphResponse?.hourly?.temperature_2m && !graphResponse?.hourly?.relativehumidity_2m) {
      setData([{
        name: 'temperature_2m',
        data: graphResponse?.hourly?.temperature_2m
      }]
      )

    } else if (!graphResponse?.hourly?.temperature_2m && graphResponse?.hourly?.relativehumidity_2m) {
      setData([{
        name: 'relativehumidity_2m',
        data: graphResponse?.hourly?.relativehumidity_2m
      }]
      )
    }
  }

  const getTempData = async () => {

    try {
      if (props.data.startDate.length == 0) {
        const response = await getForecastData(props.data.Latitude, props.data.Longitude, props.temp)
        setGraphResponse(response.data)

      }
      else {
        const response = await getForecastData(props.data.Latitude, props.data.Longitude, props.temp,props.data.startDate, props.data.endDate )
        setGraphResponse(response.data)
      }
    }
    catch (err) {
      console.log(err);

    }
  }
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}
