import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    let [data, setData] = useState({ "_id": "", "pwd": "" })
    let [msg, setMsg] = useState("")
    let obj = useContext(Ct)
    let navigate = useNavigate()
    let fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    let login = () => {
        axios.post("http://localhost:5000/login", data).then((res) => {
            if (res.data.token != undefined) {
                obj.updstate(res.data)
                navigate("/search")
            }
            else {
                setMsg(res.data.msg)
            }
        })
    }
    return (
        <div className='form'>
            <h2 style={{ "color": "red" }}>{msg}</h2>
            <input type='text' placeholder='Enter email' name='_id' onChange={fun} value={data._id} />
            <input type='password' placeholder='Enter password' name='pwd' onChange={fun} value={data.pwd} />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login