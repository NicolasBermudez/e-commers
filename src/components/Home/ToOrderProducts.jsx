// Import React Utilities
import React from 'react'
import { useDispatch } from 'react-redux'

// Import Slices
import { ascendingOrderProducts, descendingOrderProducts } from '../../store/slices/products.slice'
import './style/toOrderProduct.css'

// Filter Ascendent and Descendent Order Products

const ToOrderProducts = ({ setHandleOpening, handleOpening, setShowClearFilter, showClearFilter }) => {

  const dispatch = useDispatch()

  const handleAscending = () => {
    dispatch(ascendingOrderProducts())
    setHandleOpening(handleOpening = false)
    setShowClearFilter(showClearFilter = true)
  }

  const handleDescending = () => {
    dispatch(descendingOrderProducts())
    setHandleOpening(handleOpening = false)
    setShowClearFilter(showClearFilter = true)
  }

  return (
    <div className='orderProduct__container' >
      <button className='orderProduct__ascending-btn' onClick={handleAscending} >Ascending Order</button>
      <button className='orderProduct__descending-btn' onClick={handleDescending} >Descending Order</button>
    </div>
  )
}

export default ToOrderProducts