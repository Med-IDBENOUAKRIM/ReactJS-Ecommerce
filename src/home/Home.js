import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getProduct} from './ApiProduct'
import Card from './Card'
import Search from './Search'

const Home = () => {

  const [productBestSell, setProductBestSell] = useState([])
  const [productArival, setProductArival] = useState([])

  const loadBestSell = () => {

    getProduct({sortBy: 'sold',order: 'desc',limit: 6})
      .then(products => setProductBestSell(products))
      
  }

  const loadArrivals = () => {

    getProduct({sortBy: 'createdAt',order: 'desc',limit: 3})
      .then(products => setProductArival(products))
      
  }

  useEffect(() => {
    loadArrivals()
    loadBestSell()
  },[])

    return (
        <div>
          <Layout
            title='Home Page'
            description='Ecommerce App'
            className='container'
          >
            <Search />
            <hr/>
            <h1>Arrivals Products</h1>
            <div className="row mt-3 mb-5">
              {productArival.map(product=>(
                <div className='col-md-4'>
                  <Card product={product} />
                </div>
              ))}
            </div>

            <h1>Best Sellers</h1>
            <div className="row mt-3 mb-5">
              {productBestSell.map(product=>(
                <div className='col-md-4'>
                  <Card product={product} />
                </div>
              ))}
            </div>
          </Layout>
        </div>
    )
}

export default Home
