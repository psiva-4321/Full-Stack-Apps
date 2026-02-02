import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../App.css"

const Addres = () => {
  let [msg, setMsg] = useState("")
  let [arr, setArr] = useState([])
  let [data, setData] = useState("")
  let [f, setF] = useState(false)
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(() => {
    if (obj.state.token == "") {
      navigate("/")
    }
    else {
      axios.get("http://localhost:5000/gethno").then((res) => {
        setArr(res.data)
      })
    }

  }, [])

  let getdet = (e) => {

    axios.get(`http://localhost:5000/getdet/${e.target.value}`).then((res) => {

      setData(res.data[0])
      setMsg("")
      if (res.data[0].marks != undefined) {
        setF(true)
      }
      else {
        setF(false)
      }
    })

  }
  let updmarks = () => {
    axios.put("http://localhost:5000/updmarks", { "_id": data._id, "marks": data.marks }).then((res) => {
      setMsg(res.data.msg)
    })
  }
  return (
    <div className='card-form'>
      <h2>{msg}</h2>
      <select onChange={getdet}>
        <option value={""} disabled selected>---select HNO---</option>
        {
          arr.map((el) => {
            return (<option value={el.hno}>{el.hno}</option>)
          })
        }
      </select>

      {
        data != "" && <div>
          <p>Name:{data.name}</p>
          <p>phno:{data.phno}</p>
          <p>E-mail:{data._id}</p>
          <label>Marks:<input type='text' placeholder='Enter Marks' value={data.marks == undefined ? "" : data.marks} onChange={(e) => setData({ ...data, "marks": e.target.value })} readOnly={f} /></label>
          <button onClick={updmarks}>UpdateMarks</button>
        </div>
      }

    </div>
  )
}

export default Addres