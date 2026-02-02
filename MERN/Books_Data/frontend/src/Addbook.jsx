import React from 'react'
import { useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const Addbook = () => {
  let [data,setData]=useState({"_id":"","title":"","desc":"","price":"","rating":"4","cat":"","pub":""})
  let [msg,setMsg]=useState("")
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})

  }
  let add=()=>{
axios.post("http://localhost:5000/add",data).then((res)=>{
  setMsg(res.data.msg)
  setData({"_id":"","title":"","desc":"","price":"","rating":"4","cat":"","pub":""})
})
  }
  return (
    <div className='form'>
      <div style={{"color":"red"}}>{msg}</div>
      <input type='text' onChange={fun} value={data._id} name='_id' placeholder='Enter book id'/>
      <input type='text' onChange={fun} value={data.title} name="title" placeholder='Enter book title'/>
      <textarea name='desc' value={data.desc} onChange={fun} rows={3} cols={20}>

      </textarea>
       <input type='text' onChange={fun} value={data.price} name="price" placeholder='Enter book price'/>
       <select name='cat' onChange={fun} value={data.cat}>
        <option value="" disabled>---select cat---</option>
        <option value="programming">Programming</option>
        <option value="engg">Engg..</option>
        <option value="his">History</option>
        <option value="novels">Novels</option>

       </select>

        <select name='pub' onChange={fun} value={data.pub}>
        <option value="" disabled>---select pub---</option>
        <option value="dreamtech">Dreamtech</option>
        <option value="vgs">VGS</option>
        <option value="vikram">Vikram</option>
        <option value="oxford">oxford</option>

       </select>
        <Rating
        name="hover-feedback"
        value={data.rating}
        precision={0.5}
        onChange={(event, newValue) => {
          setData({...data,"rating":newValue});
        }}
         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
         <button onClick={add}>Addbook</button>
    </div>
  )
}

export default Addbook