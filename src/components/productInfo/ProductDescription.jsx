import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'


const ProductDescription = ({ product }) => {

  const dispatch = useDispatch()

  const [counter, setcounter] = useState(1)

  const handleMinus = () => {
    if (counter - 1 > 0) {
      setcounter(counter - 1)
    }
  }

  const handlePlus = () => {
    setcounter(counter + 1)
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
      .catch(err => console.log(err))
  }

  return (
    <article>
      <h2>{product?.title}</h2>
      <p>{product?.description}</p>
      <section>
        <span>Price</span>
        <h3>{product?.price}</h3>
      </section>
      <section>
        <h3>Quantity</h3>
        <div onClick={handleMinus} >-</div>
        <div>{counter}</div>
        <div onClick={handlePlus} >+</div>
      </section>
      <button onClick={handlecart} >add to cart<i className="fa-solid fa-cart-arrow-down"></i></button>
    </article>
  )
}

export default ProductDescription