import React, { useEffect } from 'react'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'

import Nav from './comp/Nav.jsx'
import Home from './comp/Home.jsx'
import Mens from './comp/Mens.jsx'
import Womens from './comp/Womens.jsx'
import Kids from './comp/Kids.jsx'
import Books from './comp/Books.jsx'
import Toys from './comp/Toys.jsx'
import All from './comp/All.jsx'
import Other from './comp/Other.jsx'
import Cart from './comp/Cart'
import Login from './comp/Login'
import Reg from './comp/Reg'
import Km from './comp/Km'
import Logout from './comp/Logout'
import Addprod from './comp/Addprod.jsx'
import Updprod from './comp/Updprod.jsx'
import Pwdreset from './comp/Pwdreset.jsx'
import Search from './comp/Search.jsx'
import Ct from './comp/Ct.jsx'
import Cookies from 'js-cookie'


const App = () => {
  let[state, setState] = React.useState({"name":"", "token":"", "role":"","uid":"", })
  let updstate = (obj) => {
    setState({...state,...obj})
  }
  useEffect(()=>{
    let t=Cookies.get("logininfo")
    if(t!=undefined){
      let info=JSON.parse(t)
      updstate(info)
    }},[])
  let obj={"state":state, "updstate":updstate}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
        <Nav/>
        <Routes>
            <Route path='/' element={<Home/>}>
            <Route path='/mens' element={<Mens/>}/>
            <Route path='/womens' element={<Womens/>}/>
            <Route path='/kids' element={<Kids/>}/>
            <Route path='/books' element={<Books/>}/>
            <Route path='/toys' element={<Toys/>}/>
            <Route path='/' element={<All/>}/>
            <Route path='/other' element={<Other/>}/>
            <Route path='search' element={<Search/>}/>
            </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/reg' element={<Reg/>}/>
            <Route path='/km/:id' element={<Km/>}/>
            <Route path='/addproduct' element={<Addprod/>}/>
            <Route path='/updateprod/:id' element={<Updprod/>}/>
            <Route path='resetpwd' element={<Pwdreset/>}/>
         




            
     </Routes>
        

    </Ct.Provider>
    </BrowserRouter>

  )
}

export default App