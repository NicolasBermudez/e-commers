import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductInfo from './pages/ProductInfo'
import Header from './components/shared/Header'
import { getUserCart } from './store/slices/cart.slice'
import { getAllProducts } from './store/slices/products.slice'
import Cart from './pages/Cart'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getUserCart())
  }, [])

  // codigo para crear un usuario

  // useEffect(() => {
  // const URL = 'https://e-commerce-api.academlo.tech/api/v1/users'
  // const data = {
  // firstName: "Nicolas",
  // lastName: "bermudez",
  // email: "ngbermudez@outlook.com",
  // password: "1234567890A",
  // phone: "1234567890",
  // role: "admin"
  // }
  // axios.post(URL, data)
  // .then(res => console.log(res))
  // .catch(err => console.log(err))
  // }, [])

  // aqui termina

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductInfo />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/cart/' element={<Cart />} />

      </Routes>
    </div>
  )
}

export default App
