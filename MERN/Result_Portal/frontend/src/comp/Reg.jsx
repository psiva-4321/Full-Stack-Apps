import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
  let [data, setData] = useState({ "_id": "", "name": "", "pwd": "", "phno": "" })
  let [msg, setMsg] = useState("")
  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate()
  let add = () => {
    axios.post("http://localhost:5000/reg", data).then((res) => {
      if (res.data.msg == "account created") {
        navigate("/")
      }
      else {
        setMsg(res.data.msg)
      }
    })
  }
  return (
    <div className='form'>
      <h2 style={{ "color": "blue" }}>{msg}</h2>
      <input type='text' placeholder='Enter email' name="_id" value={data._id} onChange={fun} />
      <input type='text' placeholder='Enter Name' name="name" value={data.name} onChange={fun} />
      <input type='password' placeholder='Enter password' name="pwd" value={data.pwd} onChange={fun} />
      <input type='text' placeholder='Enter phno' name="phno" value={data.phno} onChange={fun} />
      <button onClick={add}>Register</button>
    </div>
  )
}

export default Reg