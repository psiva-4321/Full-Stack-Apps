import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  let obj = useContext(Ct)
  return (
    <div className='nav'>
      {obj.state.token == "" && <Link to="/">Login</Link>}
      {obj.state.token == "" && <Link to="/reg">Register</Link>}
      {obj.state.token != "" && <Link to="/search">Search Result</Link>}
      {obj.state.role == "admin" && <Link to="/disp">Display</Link>}
      {obj.state.role == "admin" && <Link to="/addres">Add Result</Link>}
      {obj.state.role == "user" && <Link to="/ht">Hall-ticket</Link>}
      {obj.state.token != "" && <Link to="/logout">Logout</Link>}
    </div>
  )
}

export default Nav