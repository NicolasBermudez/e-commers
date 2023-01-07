// Import React
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Import Components
import CardProduct from '../components/Home/CardProduct'
import FilterCategory from '../components/Home/FilterCategory'
import FilterPrice from '../components/Home/FilterPrice'
import ToOrderProducts from '../components/Home/ToOrderProducts'


// Import Css
import './styles/home.css'

// Principal Page to E-commers

const Home = ({ handleOpening }) => {

  const [productsFilter, setProductsFilter] = useState()

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
    }
  }, [products])

  // filtering of products in real time
  const handleChange = e => {

    const inputValue = e.target.value.toLowerCase().trim()

    const filter = products?.filter(prod => prod.title.toLowerCase().includes(inputValue))
    setProductsFilter(filter)
    setInputValue(e.target.value)

  }

  const filterCallBack = prod => +prod.price >= inputPrice.from && +prod.price <= inputPrice.to

  // Render
  return (
    <div className='body'>
      <input className='search' value={inputValue} onChange={handleChange} type="text"
        placeholder='Search' />
      <section className={`filter__container ${handleOpening ? 'filter__open' : ''}`}>
        <FilterPrice className='search__price' setInputPrice={setInputPrice} />
        <FilterCategory setInputValue={setInputValue} className='search__catedories' />
        <ToOrderProducts className='orderProducts' />
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


// className={`filter__open ${handleOpening && 'filter__close'}`}