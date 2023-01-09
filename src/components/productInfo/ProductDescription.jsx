import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import './styles/productDescription.css'


const ProductDescription = ({ product }) => {

  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch()

  const [counter, setCounter] = useState(1)

  const navigate = useNavigate()

  const handleMinus = () => {
    if (counter - 1 > 0) {
      setCounter(counter - 1)
    }
  }

  const handlePlus = () => {
    setCounter(counter + 1)
  }

  const handlecart = () => {
    const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'

    const data = {
      id: product.id,
      quantity: counter
    }


    axios.post(URL, data, getConfig())
      .then(res => {
        console.log(res.data)
        dispatch(getUserCart())
      })
      .catch(err => {
        if (err.response.status === 400) {
          //update
          const URLPatch = 'https://e-commerce-api.academlo.tech/api/v1/cart'
          const prevQuantity = cart.filter(e => e.id === product.id)[0].productsInCart.quantity
          const data = {
            id: product.id,
            newQuantity: prevQuantity + counter
          }
          axios.patch(URLPatch, data, getConfig())
            .then(res => {
              console.log(res.data)
              dispatch(getUserCart())
              navigate(`/Cart`)
            })
            .catch(err => console.log(err))
        } else if (err.response.status === 401) {
          navigate('/Login')
        }
      })
  }

  return (
    <article className='products'>
      <h2 className='products__title'>{product?.title}</h2>
      <p className='products__description' >{product?.description}</p>
      <section className='products__section-price' >
        <span className='products__price-title'>Price:</span>
        <h3 className='products__price-h3'>&#36;{product?.price * counter}</h3>
      </section>
      <section className='products__section-quantity' >
        <h3 className='products__quantity-h3'>Quantity</h3>
        <div className='products__quantity-minus' onClick={handleMinus} >-</div>
        <div className='products__quantity-counter'>{counter}</div>
        <div className='products__quantity-plus' onClick={handlePlus} >+</div>
      </section>
      <button className='products__addToCart-btn' onClick={handlecart} >add to cart <i className="fa-solid fa-cart-arrow-down"></i></button>
    </article>
  )
}

export default ProductDescription