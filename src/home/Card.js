import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addToCart} from './../actions/cartAction'
import {useDispatch} from 'react-redux'

const Card = ({product, showViewBtn = true}) => {

    let dispatch = useDispatch( )

    return (
        <div>
            <div className="card bg-dark text-white mb-2 px-2">
                <div className="card-header">
                    <h4 className='display-6 text-center'>{product.name}</h4>
                    <ShowImage item={product} url='product/photo' className='card-img-top' />

                </div>
                    <div className="card-body">
                        <div className='d-flex justify-content-around align-items-center my-3'>
                            <span style={{fontSize: '25px'}} className='px-4 badge badge-info '>${product.price}</span>
                            <span className='ml-5 badge-pill badge-dark '>{product.category.name}</span>
                        </div>
                        <div className="container">
                            <p>{product.description.substring(0, 50)}...</p>
                        </div>
                        <div className="d-flex container justify-content-between well">
                            <h5>{product.quantity > 0 ? (
                                <span className='badge badge-primary'>{product.quantity} in stock</span>) : (<span className='badge badge-danger'> Out of stock</span>)
                             }</h5>
                            <span>Added {moment(product.createdAt).fromNow()}</span>
                        </div>
                        <div className='d-flex justify-content-around align-items-center mt-3'>
                        {showViewBtn && (
                            <Link to={`/product/${product._id}`}>
                                <button className="btn btn-info mr-1">View</button>
                            </Link>
                        )}
                        {product.quantity > 0 && (

                        <button onClick={() => dispatch(addToCart(product))} className="btn btn-success">Add to Cart</button>
                        )}
                        </div>
                    </div>
            </div>

        </div>
    )
}

export default Card
