// import React 
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

// import Slices
import { getAllProducts } from './store/slices/products.slice'

// import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProductInfo from './pages/ProductInfo'
import Cart from './pages/Cart'

// import Components
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import ProtectedRoutes from './components/shared/ProtectedRoutes'

// import Css
import './App.css'

function App() {

  // Loading

  const [loading, setLoading] = useState(true)

  const [handleOpening, setHandleOpening] = useState(false)

  useEffect(() => {
    setLoading(false)
    setTimeout(() =>
      setLoading(true), [2000])
  }, [])


  // Load Products

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  // Code new User

  // useEffect(() => {
  //   const URL = 'https://e-commerce-api.academlo.tech/api/v1/users'
  //   const data = {
  //     firstName: "Barbara",
  //     lastName: "Contrera",
  //     email: "barbara@outlook.com",
  //     password: "1234567890A",
  //     phone: "1234567890",
  //     role: "admin"
  //   }
  //   axios.post(URL, data)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <div className="App">
      <div className={`App__loading ${loading && 'App__loadin-close'}`}  ></div>
      <Header setHandleOpening={setHandleOpening} handleOpening={handleOpening} />
      <div className='routes'>
        <Routes >
          <Route path='/' element={<Home handleOpening={handleOpening} />} />
          <Route path='/product/:id' element={<ProductInfo />} />
          <Route className='login' path='/login/' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/cart/' element={<Cart />} />
            <Route path='/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </div>
      <Footer className='footer' />
    </div>
  )
}

export default App
