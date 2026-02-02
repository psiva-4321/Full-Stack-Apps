import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
const Edit = () => {
    let {bid}=useParams()
    let navigate=useNavigate()
    let [data,setData]=useState({"_id":"","title":"","desc":"","price":"","rating":"4","cat":"","pub":""})
    useEffect(()=>{
        axios.get(`http://localhost:5000/getbybid/${bid}`).then((res)=>{
            setData(res.data)
        })
    },[])
     let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})

  }
  let upd=()=>{
axios.put("http://localhost:5000/upd",data).then(()=>{
    navigate("/")

})
  }
  return (
    <div className='form'>
    
      <input type='text' onChange={fun} value={data._id} name='_id' placeholder='Enter book id' readOnly/>
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
         <button onClick={upd}>Update</button>
       
       



    </div>
  )
}

export default Edit