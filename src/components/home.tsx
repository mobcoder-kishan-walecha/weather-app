import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './weatherpage.css';
import Graph from './graph';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SearchField from './searchField';
import PlusButton from './plusButton';

export type CountryList = {

    admin1: string,
    admin1_id: number,
    country: string,
    country_code: string,
    country_id: number,
    elevation: number,
    feature_code: string,
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    population: number,
    timezone: string
}

export interface data {
    id: any,
    Latitude: any,
    Longitude: any,
    city: string,
    startDate: string,
    endDate: string,
    maxDate: string,
    creationDate: string,
    incluedData: string[],
}

export default function Home() {

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    const navigate = useNavigate();

    const data: data =
    {
        id: small_id,
        Latitude: '',
        Longitude: '',
        city: '',
        startDate: '',
        endDate: '',
        maxDate: '',
        creationDate: new Date().toDateString(),
        incluedData: []
    }

    const [tempArray, setTempArray] = useState<string[]>([])
    const [dataState, setDataState] = useState<data[]>([data])


    const handleCheck = (value: string) => {
        let newArr = [...tempArray]
        newArr.includes(value) ? newArr.splice(newArr.indexOf(value), 1) : newArr.push(value);
        setTempArray(newArr);
    }

    const handlePlus = () => {
        setDataState((prev) => [...prev, data])
    }

    const handleChange = (index: number) => (e: any) => {
        let newArr = dataState.map((item, i) => {
            if (index == i) {
                if (e.target.name == 'startDate') {
                    let modifiedDate = e.target.value.split('-');
                    modifiedDate[2] = Number(modifiedDate[2]) + 7
                    item.maxDate = modifiedDate.join('-');
                }
                return { ...item, [e.target.name]: e.target.value }
            }
            else {
                return item;
            }
        })
        setDataState(newArr)
    }

    const handleSelect = (value: any, index: number) => {
        let newArr = dataState.map((item, i) => {
            if (index == i) {

                return { ...item, city: value.name ? value.name : value, Latitude: value.latitude, Longitude: value.longitude }
            }
            else {
                return item;
            }
        })
        setDataState(newArr)
    }

    const handleClick = () => {
        if (tempArray.length) {
            if (localStorage.getItem('saveData') !== null) {
                let localArr: data[] = JSON.parse(localStorage.getItem('saveData') || "")
                let newArr: any[] = [...dataState]
                let newArr2: any[] = newArr.map(obj => {
                    return { ...obj, incluedData: tempArray }
                })
                localArr.push(...newArr2)
                localStorage.setItem('saveData', JSON.stringify(localArr))
                toast.success("saved!!");
                navigate('/viewtable')
            }
            else {
                let newArr2: any[] = dataState.map(obj => {
                    return { ...obj, incluedData: tempArray }
                })
                localStorage.setItem('saveData', JSON.stringify(newArr2));
                navigate('/viewtable')
            }
        }
        else {
            toast.error("please select Temperature or Relative Humidity!!");
        }
    }

    return (
        <div style={{ margin: "auto" }}>
            <h2 className='Main_heading'>Weather Page</h2>
            <section >
                <div >
                    <Container>
                        <div className='flex_div' >
                            <h6 className='Select_section'>Select Coordinates Or City</h6>
                            <button className='save_btn' onClick={() => navigate('/viewtable')}>View List</button>
                        </div>

                        {/* Iterate the data state which consist the incremental rows */}
                        {dataState && dataState.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        <div className='latitude_div'>
                                            <span className='latitude_heading'>Latitude</span>
                                            <input type="number" name='Latitude' id='latitude' className='latitude_input' value={item?.Latitude} onChange={handleChange(index)}></input>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>Longitude</label>
                                            <input type="number" name='Longitude' id='latitude' className='latitude_input' value={item?.Longitude} onChange={handleChange(index)} ></input>
                                        </div>
                                    </Col>

                                    <Col>
                                        <SearchField handleCallBack={handleSelect} index={index} Value={item.city} />
                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>Start Date</label>
                                            <input id="date" type="date" className="Date_Range'" name="startDate" onChange={handleChange(index)} style={{ width: '100%', marginTop: "4px", padding: "1px" }} />
                                        </div>

                                    </Col>
                                    <Col>
                                        <div className='latitude_div'>
                                            <label className='latitude_heading'>End Date</label>
                                            <input id="date" type="date" className="Date_Range'" name="endDate" onChange={handleChange(index)} min={item.startDate} max={item.maxDate} disabled={!item.maxDate.length} style={{ width: '100%', marginTop: "4px", padding: "1px" }} />
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })}

                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <label style={{ display: "flex", gap: "10px" }}>
                                        <input type="Checkbox" id="Checkbox" name="Checkbox" value="Checkbox" className='radio_input' onClick={() => handleCheck("temperature_2m")} />
                                        <span>Temperature</span>
                                    </label>
                                </div>
                            </Col>
                            <Col>
                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <label style={{ display: "flex", gap: "10px" }}>
                                        <input type="Checkbox" id="Checkbox" name="Checkbox" value="Checkbox" className='radio_input' onClick={() => handleCheck("relativehumidity_2m")} />
                                        <span>Relative Humidity</span>
                                    </label>
                                </div>
                            </Col>
                            <Col></Col>
                            <Col style={{ textAlign: "end" }}>
                                <PlusButton handlePlus={handlePlus} />
                            </Col>

                        </Row>
                        <div style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}>
                            <button type="button" className='save_btn' onClick={() => handleClick()} >save</button>
                        </div>
                    </Container>

                    <Row style={{ paddingTop: "50px" }} >
                        {dataState && dataState.map((item, i) => {
                            return (
                                <Col key={i}>
                                    {item.Latitude && item.Longitude ? <Graph temp={tempArray} data={item} /> : ''}
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </section>
        </div>
    )
}
