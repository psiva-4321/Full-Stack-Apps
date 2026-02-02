import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './comp/Nav'
import Login from './comp/Login'
import Reg from './comp/Reg'
import Disp from './comp/Disp'
import Addres from './comp/Addres'
import Logout from './comp/Logout'
import Home from './comp/Home'
import './App.css'
import { useState } from 'react'
import Ct from './comp/Ct'
import Hallticket from './comp/Hallticket'
const App = () => {
  let [state, setState] = useState({ "token": "", "name": "", "role": "", "_id": "" })
  let updstate = (data) => {
    setState({ ...state, ...data })
  }
  let obj = { "state": state, "updstate": updstate }
  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/search' element={<Home />} />
          <Route path='/disp' element={<Disp />} />
          <Route path='/addres' element={<Addres />} />
          <Route path='/ht' element={<Hallticket />} />
          <Route path='/logout' element={<Logout />} />

        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  )
}

export default App