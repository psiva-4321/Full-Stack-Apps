import axios from 'axios'
import Ct from './Ct.jsx'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {

  let [data, setData] = useState({ "_id": "", "pwd": "" })
  let [msg, setMsg] = useState("")
  let obj = useContext(Ct)
  let navigate = useNavigate()

  let fun = (e) => {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  let login = async () => {
    try {
      let res = await axios.post("http://localhost:5000/login", data)

      if (res.data.token !== undefined) {
        Cookies.set("logininfo", JSON.stringify(res.data), { expires: 2 })
        obj.updstate(res.data)
        navigate("/")
      } else {
        setMsg(res.data.msg)
      }

    } catch (error) {
      setMsg("Server Error")
    }
  }

  return (
    <div className='form'>
      <h2 style={{ color: "red" }}>{msg}</h2>

      <input
        type='text'
        placeholder='Enter email'
        name='_id'
        value={data._id}
        onChange={fun}
      />

      <input
        type='password'
        placeholder='Enter password'
        name='pwd'
        value={data.pwd}
        onChange={fun}
      />

      <button onClick={login}>Login</button>
      <Link to="/resetpwd">Forgot Password?</Link>
    </div>
  )
}

export default Login
