import React, { useEffect, useState } from 'react'
import {getCategories, getProduct} from './ApiProduct'
import Card from './Card'


const Search = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [searchData, setSearchData] = useState({
        search: '',
        category: ''
    })

    const handlChange = (e) => {
        setSearchData({...searchData, [e.target.id]: e.target.value})
    }

    const searchSubmit = e => {
        e.preventDefault()
        let {search, category} = searchData;
        if(search || category){
        getProduct({search: search || undefined, category})
            .then(res => setProducts(res))
        }else{
            setProducts([])
        }
    }

    useEffect(()=>{
        getCategories()
            .then(categories => setCategories(categories))
    },[])

    return (
        <div>
            <form onSubmit={searchSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <select onChange={handlChange} id='category' className="btn">
                                <option value="">Select a category</option>
                                {categories.map((category, i)=>(
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                            </select>
                        </div>
                        
                        <input onChange={handlChange} id='search' type="search" className="form-control mx-4"/>
                        <div className="input-group-apprend">
                            <button className="btn btn-outline-success">Search</button>
                        </div>
                    </div>
                </form>
                <hr/>

                {products && products.length>0 && (
                    <h3>Found {products.length} product(s)</h3>
                )}

                <div className="row">
                    {products.map((item, i)=>(

                    <div key={i} className="col-md-4">
                        <Card product={item} />
                    </div>
                    ))}
                </div>
        </div>
    )
}

export default Search
