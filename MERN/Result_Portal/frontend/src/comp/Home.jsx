import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  let [data, setData] = useState("")
  let [msg, setMsg] = useState("")
  let [user, setUser] = useState({})
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(() => {
    if (obj.state.token == "") {
      navigate("/")
    }

  }, [])
  let search = () => {
    axios.get(`http://localhost:5000/search/${data}`).then((res) => {
      if (res.data.length == 0) {
        setMsg("No record found check details")
        setUser({})
      }
      else {
        setUser(res.data[0])
        setMsg("")
      }
      setData("")
    })
  }
  return (
    <div className="search-card">
      {msg != "" && <h2 style={{ "color": "red" }}>{msg}</h2>}
      <input type='text' onChange={(e) => setData(e.target.value)} value={data} placeholder='Enter Hallticket No/email/phno' />
      <button onClick={search}>Search</button>
      {
        user._id != undefined && <div className="result-card">
          <p>Hall ticket no : {user.hno}</p>
          <p>Name : {user.name}</p>
          <p>Phone no : {user.phno}</p>
          <p>E-mail : {user._id}</p>
          {user.marks != undefined ? <p>Marks : {user.marks}</p> : <p>Res not added</p>}
        </div>
      }

    </div>
  )
}

export default Home