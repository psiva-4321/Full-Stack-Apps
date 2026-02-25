import axios from "axios"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Ct from "./Ct.jsx"
import { useState,useContext } from "react"

const Addprod = () => {
  let[data,setdata] = useState({"title":"","price":"","category":"","desc":"","img":""})
  let[msg,setmsg] = useState("")
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(()=>{
    let info=Cookies.get("logininfo")
    if(info==undefined)
    {
      navigate("/login")
    }
    else{
      info=JSON.parse(info)
      obj.updstate(info)
      if(info.role!="admin")
{navigate("/") }
}
  },[])
  let fun=(e)=>{
    let {name,value} = e.target
    setdata({...data,[name]:value})
  }
  let fun1=(e)=>{
    setdata({...data,"img":e.target.files[0]})
  }
  let addproduct=async()=>{
    let formdata = new FormData()
    for(let key in data)
    {
      formdata.append(key,data[key])
    }
    try{
      let res= await axios.post("http://localhost:5000/addproduct", formdata, {
        headers:{
          "authorization":obj.state.token
        }
      })
      setmsg(res.data.msg)
    }catch(err){
      setmsg("error in adding product")
    }
  }
  return (
    <div className="form">
      <h2 style={{color:"green"}}>{msg}</h2>
      <input type="text" name="title" placeholder="title" onChange={fun} value={data.title}/>
      <input type="text" name="price" placeholder="price" onChange={fun} value={data.price}/>
      <textarea name='desc' placeholder='description' onChange={fun} value={data.desc}></textarea>
      <select name='category' onChange={fun} value={data.category}>
        <option value=""disabled>select category</option>
        <option value="mens">mens</option>
        <option value="womens">womens</option>
        <option value="kids">kids</option>
        <option value="books">books</option>
        <option value="toys">toys</option>
        <option value="other">other</option>
      </select>
      <input type="file" name="img" onChange={fun1}/>
      <button onClick={addproduct}>Add Product</button>
      
    </div>
  )
}


export default Addprod