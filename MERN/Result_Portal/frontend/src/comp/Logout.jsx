import React, { useContext, useEffect } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(() => {
    obj.updstate({ "token": "", "name": "", "role": "" })
    navigate("/")
  }, [])
  return (
    <div>Logout</div>
  )
}

export default Logout