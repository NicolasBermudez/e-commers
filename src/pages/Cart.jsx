import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/Cart/CartProduct'
import { getUserCart } from '../store/slices/cart.slice'
import getConfig from '../utils/getConfig'
import './styles/cart.css'

const Cart = () => {

  const dispatch = useDispatch()

  const cartProducts = useSelector(state => state.cart)

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
      </section>
    </section>
  )
}

export default Cart