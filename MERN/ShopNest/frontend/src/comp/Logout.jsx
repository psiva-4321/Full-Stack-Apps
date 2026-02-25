import React, { useContext, useEffect } from 'react';
import ct from './Ct.jsx';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

let Logout=()=>{
    let navigate=useNavigate()
    Cookies.remove("logininfo")
    let obj=useContext(ct)
    useEffect(()=>{
    obj.updstate({"name":"", "token":"", "role":""})
    navigate("/login")
},[])
return(
    <div> Logout </div>
)
}
export default Logout


