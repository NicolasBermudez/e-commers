import { useEffect, useState } from 'react'
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
import Footer from './components/shared/Footer'

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    setTimeout(() =>
      setLoading(true), [2000])
  }, [])

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
      <div className={`App__loading ${loading && 'App__loadin-close'}`}  ></div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductInfo />} />
        <Route className='login' path='/login/' element={<Login />} />
        <Route path='/cart/' element={<Cart />} />

      </Routes>
      <Footer className='footer' />
    </div>
  )
}

export default App
