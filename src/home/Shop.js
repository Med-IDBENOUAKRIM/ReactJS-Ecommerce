import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getCategories, filterProducts} from './ApiProduct'
import FilterByCategory from './FilterByCategory'
import FilterByPrice from './FilterByPrice'
import Card from './Card'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [limit, setLimit] = useState(3)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [productFiltred, setProductFiltred] = useState([])

    const [myFilters, setMyFilters] = useState({
        category: [],
        price: []
    })

    useEffect(()=>{
        getCategories()
            .then(res=> setCategories(res))

        filterProducts(skip, limit, myFilters)
            .then(res => {
                setProductFiltred(res)
                setSkip(0)
                setSize(res.length)
            }    
            )

    },[myFilters])

    const handleFiters = (data, filterBy) => {
        setMyFilters({...myFilters, [filterBy]: data})
    }

    const loadMore = () => {

        const toSkip = skip + limit

        filterProducts(toSkip, limit, myFilters)
            .then(res => {
                setProductFiltred([...productFiltred, ...res])
                setSize(res.length)
                setSkip(toSkip)
            })
            
    }

    return (
        <div>
            <Layout
            title='Shop Page'
            description='Choice your favorite product in our store'
            className='container'
          >
              <div className="row">
                  <div className="col-md-3">
                        <FilterByCategory
                            categories={categories}
                            handleFiters={(data)=>handleFiters(data, 'category')}
                         />
                      <hr/>
                      <FilterByPrice 
                         handleFiters={(data)=>handleFiters(data, 'price')} 
                      />
                  </div>
                  <div className="col-md-9">
                  <h1>Best Sellers</h1>
                    <div className="row mt-3 mb-5">
                        {productFiltred.map((product,i)=>(
                            <div key={product._id} className='col-md-4'>
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                      {
                          size > 0 && 
                          size >= limit &&
                          (
                              <div className="text-center">
                                    <button onClick={loadMore} className="btn btn-outline-success">
                                        Load More
                                    </button>
                              </div>
                          )
                      }
                  </div>
              </div>
          </Layout>
        </div>
    )
}

export default Shop
