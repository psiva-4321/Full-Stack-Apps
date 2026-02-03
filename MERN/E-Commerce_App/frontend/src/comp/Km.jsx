import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Ct from "./Ct.jsx"
const Km = () => {
  let {id}=useParams()
  let [data,setData]=useState(null)
  let obj=useContext(Ct);
  let [text,setText]=useState("")
  let [value,setValue]=useState(5)
  useEffect(()=>{
    axios.get(`http://localhost:5000/getprodbyid/${id}`).then((res)=>{
      setData(res.data)
    } )
  },[])
  let sub=()=>{
    let pdata={"pid":id,"uid":obj.state.uid,"text":text,"rt":value} 
    console.log(pdata)
  }
  return (<>
    {data!=null&&<div>
      <img src={`http://localhost:5000/pimgs/${data.img}`} alt="Product Image" />
      <p>Tile:{data.title}</p>
      <p>Desc:{data.desc}</p>
      <p>Category:{data.cat}</p>
      <p>Price:{data.price}</p>
      <button>Add to Cart</button>
    </div>}
    {data==null&&<h2 style={{"color":"orangered"}}>Loading...</h2>}




    {
      obj.state.token!=""&&<div>
        <input type="text" placeholder="Enter Review"  onChange={(e)=>setText(e.target.value)} value={text}/>
         <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
        <button onClick={sub}>Submit Review</button>
      </div>

    }
 </> )
}

export default Km