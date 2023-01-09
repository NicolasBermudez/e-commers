// Import React
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Import axios for API Rest
import axios from 'axios'

// Import Components
import CartProduct from '../components/Cart/CartProduct'

// Import Slices
import { getUserCart } from '../store/slices/cart.slice'

// Import Utilities
import getConfig from '../utils/getConfig'

// Import Css
import './styles/cart.css'

// Shopping Cart 

const Cart = ({ setVisualFilter, visualFilter }) => {

  const dispatch = useDispatch()

  const cartProducts = useSelector(state => state.cart)

  const navigate = useNavigate()

  const handleCheckOut = () => {
    const URL = 'https://e-commerce-api.academlo.tech/api/v1/purchases'

    const data = {
      street: "Green St. 1456",
      colony: "Southwest",
      zipCode: "12345",
      city: "USA",
      references: "Some references"
    }
    axios.post(URL, data, getConfig())
      .then(res => {
        console.log(res.data)
        dispatch(getUserCart())
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    dispatch(getUserCart())
    setVisualFilter(visualFilter = false)
  }, [])

  const handleCheckContinue = () => {
    navigate(`/`)
  }

  return (
    <section className='cart'>
      {/* <h2 className='cart__h2'>Cart</h2> */}
      <div className='cart__cartProduct'>
        {
          cartProducts?.map(product => (
            <CartProduct
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
      <section className='cart__section'>
        <span className='section__total'>
          <span>Total:</span>
          <p className='section__total-price'>&#36;{
            cartProducts ?
              cartProducts.reduce((acc, cv) => cv.price * cv.productsInCart.quantity + acc, 0) : 0
          }</p>
        </span>
        <button className='section__btn' onClick={handleCheckOut} >CheckOut</button>
        <button className='section__btn' onClick={handleCheckContinue} >Continue buying</button>
      </section>
    </section>
  )
}

export default Cart