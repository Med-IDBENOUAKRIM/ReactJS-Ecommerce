import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Layout from './Layout'
import ShowImage from './ShowImage'
import {incProductCount, decrProductCount, removeProduct} from '../actions/cartAction'
import Checkout from './Checkout'

const Cart = () => {

    let productInCart = useSelector(state => state.cart.products)
    let dispatch = useDispatch()

    return (
        <div>
            <Layout
            title='Cart'
            description='List of products in cart'
            className='container-fluid'
          >
              <div className="row">
                  <div className="col-md-9">
                      <h3>Your cart</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productInCart.map((product, i)=>(
                                <tr key={product._id}>
                                    <td width='100px'>
                                    <ShowImage item={product} url='product/photo' className='card-img-top' />
                                    </td>
                                    <td>
                                        <h5>{product.name}</h5>
                                        <p className='well'>{product.description}</p>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>
                                        <div className="input-group">
                                            <button onClick={()=>dispatch(incProductCount(product))} className="btn btn-sm btn-info">
                                                <i className="material-icons">add</i>
                                            </button>
                                            <h3>
                                            <span className="mx-1 span span-success">{product.count}</span>
                                        </h3>
                                            {product.count>1 && (
                                                <button onClick={()=>dispatch(decrProductCount(product))} className="btn btn-sm btn-secondary">
                                                <i className="material-icons">remove</i>
                                            </button>
                                            )}
                                        </div>
                                        
                                    </td>
                                    <td>${product.price * product.count}</td>
                                    <td className='text-right'>
                                        <button onClick={()=> dispatch(removeProduct(product._id))} className="btn btn-sm btn-dark">
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                  </div>
                  <div className="col-md-3">
                    <Checkout products={productInCart} />
                  </div>
              </div>
          </Layout>
        </div>
    )
}

export default Cart
