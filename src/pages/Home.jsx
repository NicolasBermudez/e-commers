// Import React
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Import Components
import CardProduct from '../components/Home/CardProduct'
import FilterCategory from '../components/Home/FilterCategory'
import FilterPrice from '../components/Home/FilterPrice'
import ToOrderProducts from '../components/Home/ToOrderProducts'
import { getAllProducts } from '../store/slices/products.slice'


// Import Css
import './styles/home.css'

// Principal Page to E-commers

const Home = ({ setHandleOpening, handleOpening, setVisualFilter, visualFilter }) => {

  const dispatch = useDispatch()

  const [productsFilter, setProductsFilter] = useState()

  const [showClearFilter, setShowClearFilter] = useState(false)

  const products = useSelector(state => state.products)

  const [inputValue, setInputValue] = useState("")

  const [inputPrice, setInputPrice] = useState({
    from: 0,
    to: Infinity
  })

  // filter for products
  useEffect(() => {
    if (products) {
      setProductsFilter(products)
      setVisualFilter(visualFilter = true)
    }
  }, [products])

  // filtering of products in real time
  const handleChange = e => {

    const inputValue = e.target.value.toLowerCase().trim()

    const filter = products?.filter(prod => prod.title.toLowerCase().includes(inputValue))
    setProductsFilter(filter)
    setInputValue(e.target.value)

  }

  const clearFilter = () => {
    dispatch(getAllProducts())
    setInputPrice({
      from: 0,
      to: Infinity
    })
    setShowClearFilter(!showClearFilter)
  }

  const filterCallBack = prod => +prod.price >= inputPrice.from && +prod.price <= inputPrice.to

  // Render
  return (
    <div className='body'>
      <input className='search' value={inputValue} onChange={handleChange} type="text"
        placeholder='Search' />
      {showClearFilter ? <button className='filter__clearBnt' onClick={clearFilter}>ClearFilter</button> : ""}
      <section className={`filter__container ${handleOpening ? 'filter__open' : ''}`}>
        <FilterPrice
          className='search__price'
          setInputPrice={setInputPrice}
          setHandleOpening={setHandleOpening}
          handleOpening={handleOpening}
          setShowClearFilter={setShowClearFilter}
          showClearFilter={showClearFilter}
        />
        <FilterCategory
          className='search__catedories'
          setInputValue={setInputValue}
          setHandleOpening={setHandleOpening}
          handleOpening={handleOpening}
          setShowClearFilter={setShowClearFilter}
          showClearFilter={showClearFilter}
        />
        <ToOrderProducts
          className='orderProducts'
          setHandleOpening={setHandleOpening}
          handleOpening={handleOpening}
          setShowClearFilter={setShowClearFilter}
          showClearFilter={showClearFilter}
        />
      </section>
      <div className='products-container'>
        {
          productsFilter?.filter(filterCallBack).length !== 0 ?
            productsFilter?.filter(filterCallBack).map(product =>
              <CardProduct
                key={product.id}
                product={product}
              />
            )
            :
            <h1>There are no products that match your search</h1>
        }
      </div>
    </div>

  )
}

export default Home
