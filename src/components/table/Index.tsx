import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import './Index.css';
import { data } from '../home';
import { Link, useNavigate } from 'react-router-dom';

export default function Index() {

    const navigate = useNavigate()
    const [tableData, setTableData] = useState<data[]>([])

    useEffect(() => {
        if (typeof window !== undefined && localStorage.getItem("saveData") !== null) {
            console.log(typeof localStorage.getItem("saveData"));

            setTableData(JSON.parse(localStorage.getItem("saveData") || ''))
        }
    }, [])

    const handleDelete = (id: number) => {
        let data = JSON.parse(localStorage.getItem("saveData") || '')
        const indexToDelete = data.findIndex((item: any) => item.id === id)
        if (indexToDelete !== -1) {
            const newData = [...data];
            newData.splice(indexToDelete, 1);
            setTableData(newData);
            localStorage.setItem("saveData", JSON.stringify(newData))
        }
    }

    const handleRoute = (props: string) => {
        navigate(`/edit/${props}`)
    }

    return (
        <div>
            <div className='container'>
                <h2 className='reportPage'>Reports page</h2>
                <h6 className='saved_Reports'>Saved Reports</h6>
                <Table responsive>
                    <thead className='table_head'>
                        <tr>
                            <th></th>
                            <th>Cities</th>
                            <th>Included Data</th>
                            <th>Longitude & Latitude</th>
                            <th>Data Range</th>
                            <th>Creation Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData && tableData.map((item, i) => {
                            return (
                                <tr>
                                    <td><input type="Checkbox" id="Checkbox" name="Checkbox" value="Checkbox" className='radio_input' /></td>
                                    <td>{item.city}</td>
                                    <td>{item.incluedData}</td>
                                    <td>{item.Latitude}, {item.Longitude}</td>
                                    <td>{item.startDate}- {item.endDate}</td>
                                    <td>{item.creationDate}</td>
                                    <td><div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <Link to={`${item.id}`}><AiOutlineEye style={{cursor:'pointer'}}  /></Link>
                                        <MdOutlineModeEdit style={{cursor:'pointer'}} onClick={() => handleRoute(item.id)} />
                                        <AiOutlineDelete style={{cursor:'pointer'}} onClick={() => handleDelete(item.id)} />
                                    </div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
