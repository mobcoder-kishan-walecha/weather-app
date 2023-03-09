import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Graph from '../graph'
import { CountryList, data } from '../home';

export default function Index() {

    let { id } = useParams();
    const [countryList, setCountryList] = useState<CountryList[]>([])
    const [tempArray, setTempArray] = useState<string[]>([])
    const [dataState, setDataState] = useState<data[]>([])

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("saveData") || '')
        const arr = data.filter((item: any) => item.id === id)
        setDataState(arr);
        console.log(arr);
        setTempArray(arr[0].incluedData);
    }, [id])

    const handleSelect = (value: any, index: number) => {
        let newArr = dataState.map((item, i) => {
            if (index == i) {
                setCountryList([])
                return { ...item, city: value.name, Latitude: value.latitude, Longitude: value.longitude }
            }
            else {
                return item;
            }
        })
        setDataState(newArr)
    }

    const handleCheck = (value: string) => {
        let newArr = [...tempArray]
        newArr.includes(value) ? newArr.splice(newArr.indexOf(value), 1) : newArr.push(value);
        setTempArray(newArr);
    }

    return (
        <div style={{ margin: "auto" }}>
            <h2 className='Main_heading'>Weather Page</h2>
            <section >
                <div >
                    <Container>
                        <h6 className='Select_section'>Select Coordinates Or City</h6>
                        {dataState && dataState.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        <div className='latitude_div'>
                                            <span className='latitude_heading'>Latitude</span>
                                            <input type="number" name='Latitude' id='latitude' className='latitude_input' value={item?.Latitude}  ></input>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>Longitude</label>
                                            <input type="number" name='Longitude' id='latitude' className='latitude_input' value={item?.Longitude}  ></input>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>City</label>
                                            <div className='cityIcon'>
                                                <input autoComplete="on" name='city' list="suggestions" style={{ width: "100%" }} value={item?.city} />
                                            </div>
                                            {
                                                countryList?.length > 0 &&
                                                <div className='country_div'>
                                                    {countryList && countryList.map((value, i) => {
                                                        return (
                                                            <p onClick={() => handleSelect(value, index)} key={i}>{value.name}</p>
                                                        )
                                                    })}</div>
                                            }

                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>Start Date</label>
                                            <input id="date" type="date" className="Date_Range'" name="startDate" value={item.startDate} style={{ width: '100%', marginTop: "4px", padding: "1px" }} />
                                        </div>

                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>End Date</label>
                                            <input id="date" type="date" className="Date_Range'" name="endDate" value={item.endDate} min={item.startDate} max={item.maxDate} disabled={!item.maxDate.length} style={{ width: '100%', marginTop: "4px", padding: "1px" }} />
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <label style={{ display: "flex", gap: "10px" }}>
                                        <input type="Checkbox" id="Checkbox" name="Checkbox" value="temperature_2m" checked={tempArray.includes("temperature_2m")} className='radio_input' onClick={() => handleCheck("temperature_2m")} />
                                        <span>Temperature</span>
                                    </label>
                                </div>
                            </Col>
                            <Col>
                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <label style={{ display: "flex", gap: "10px" }}>
                                        <input type="Checkbox" id="Checkbox" name="Checkbox" value="relativehumidity_2m" checked={tempArray.includes("relativehumidity_2m")} className='radio_input' onClick={() => handleCheck("relativehumidity_2m")} />
                                        <span>Relative Humidity</span>
                                    </label>
                                </div>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    <Row style={{ paddingTop: "50px" }} >
                        {dataState && dataState.map((item, i) => {
                            return (
                                <Col key={i}>
                                    <Graph temp={tempArray} data={item} />
                                </Col>
                            )
                        })}</Row>
                </div>
            </section>
        </div>
    )
}
