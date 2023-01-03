import axios from 'axios'
import React from 'react'
import getConfig from '../../utils/getConfig'
import { useNavigate } from 'react-router-dom'
import { getUserCart } from '../../store/slices/cart.slice'
import { useDispatch } from 'react-redux'



const CardProduct = ({ product }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleBtnClick = e => {
    e.stopPropagation()

    const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'

    const data = {
      id: product.id,
      quantity: 1
    }

    axios.post(URL, data, getConfig())
      .then(res => {
        console.log(res.data)
        dispatch(getUserCart())
      })
      .catch(err => console.log(err))
  }

  return (
    <article onClick={handleClick}>
      <header>
        <img src={product.productImgs[0]} alt="" />
      </header>
      <section>
        <h3>{product.title}</h3>
        <article>
          <span>Price</span>
          <h4>{product.price}</h4>
        </article>
        <button><i className="fa-solid fa-cart-arrow-down" onClick={handleBtnClick} ></i></button>
      </section>
    </article>
  )
}

export default CardProduct