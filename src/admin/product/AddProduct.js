import React, { useEffect, useState } from 'react'
import Layout from './../../home/Layout'
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import {isAuth} from './../../auth/helpers'
import {API_URL} from './../../Config_API'

const AddProduct = () => {

    const [product, setProduct] = useState({
        photo: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        shipping: false
    })

    const [formData , setFormData] = useState(new FormData())

    const [categories , setCategories] = useState([])

    useEffect(()=>{
        getCategories()
    },[])

    const getCategories = () => {

        fetch(`${API_URL}/category`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(res => setCategories(res.categories))
        .catch(err => console.error(err))
    }

    const handleChange = e => {

        const valeur = e.target.id === 'photo' ? e.target.files[0] : e.target.value

        formData.set(e.target.id, valeur)

        setProduct({...product, [e.target.id]: valeur})
    }

    const submitProduct = e => {
        e.preventDefault()

        const {user , token} = isAuth()

        fetch(`${API_URL}/product/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please check your form!!', { positionClass: "toast-bottom-left", })
            }else{
                toastr.info(`Category ${product.name} created`, 'New product',{ positionClass: "toast-top-center",})

                setProduct({
                    photo: '',
                    name: '',
                    description: '',
                    quantity: 0,
                    price: 0,
                    category: 0,
                    shipping: false
                })

                setFormData(new FormData())
            }
        })
        .catch(err => toastr.error(err, 'Error 404', {positionClass:"toast-bottom-left", })
        )
    }
    return (
        <div>
            <Layout
                title='Product'
                description='New product'
                className='container'
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submitProduct}>
                            <div className="form-group my-5">
                                <label htmlFor="photo">Upload photo</label>
                                <input onChange={handleChange} type="file" placeholder='Upload photo' name='photo' id='photo' className="form-control-file"/>
                            </div>

                            <div className="form-group my-5">
                                <label htmlFor="name" >name</label>
                                <input value={product.name} onChange={handleChange} required placeholder='Enter name of new product' autoFocus type="text" onChange={handleChange} name="name" id='name' className='form-control'/>
                            </div>

                            <div className="form-group my-5">
                                <label htmlFor="description">description</label>
                                <textarea value={product.description} onChange={handleChange} name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                            </div>

                            <div className="form-group my-5">
                                <label htmlFor="quantity">quantity</label>
                                <input value={product.quantity} onChange={handleChange} type="number" name="quantity" id="quantity" className='form-control' />
                            </div>
                            <div className="form-group my-5">
                                <label htmlFor="price">price</label>
                                <input value={product.price} onChange={handleChange} type="number" name="price" id="price" className='form-control' />
                            </div>

                            <div className="form-group my-5">
                                <label htmlFor="category">category</label>
                                <select value={product.category} onChange={handleChange} name="category" id="category" className="form-control">
                                    <option value="0">Select Category</option>
                                    { categories && categories.map((category, i) => (
                                        <option key={i} value={category._id}>{category.name}</option>
                                    )) }
                                </select>
                            </div>

                            <div class="form-group mt-5">
                                <label for="shipping">shipping</label>
                                <select value={product.shipping} onChange={handleChange} class="form-control" id="shipping">
                                    <option value='false'>No</option>
                                    <option value='true'>Yes</option>
                                </select>
                            </div>
                            { JSON.stringify(product) }
                            <button className="my-2 btn btn-block btn-outline-success">New Product</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddProduct
