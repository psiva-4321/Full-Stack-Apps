import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Reg.css';


const Reg = () => {
  let [data, setData] = useState({ "name": "", "_id": "", "pwd": "" ,"phno":""})
  let [msg, setMsg] = useState("")
  let navigate = useNavigate()
  let fun = (e) => {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  let reg = async () => {
    try {
      let res = await axios.post("http://localhost:5000/reg", data)
      setMsg(res.data.msg)
      if(res.data.msg=="account created successfully"){
        navigate("/login")
      }
      else{
        setMsg(res.data.msg)
      }
    } catch (err) {
      setMsg("Error in registration")
    }
  }
  return (
    <div className='form'>
      <h2 style={{ color: "red" }}>{msg}</h2>
      <input type='text' placeholder='Enter name' name='name' value={data.name} onChange={fun} /> 
      <input type='text' placeholder='Enter email' name='_id' value={data._id} onChange={fun} />
      <input type='password' placeholder='Enter password' name='pwd' value={data.pwd} onChange={fun} />
      <input type='text' placeholder='Enter phone number' name='phno' value={data.phno} onChange={fun} />
      <button onClick={reg}>Register</button>
    </div>
  )
}
export default Reg
