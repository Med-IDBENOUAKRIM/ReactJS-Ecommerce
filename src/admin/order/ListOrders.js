import React, { useEffect, useState } from 'react'
import Layout from '../../home/Layout'
import { listOfOredrs, getStatus, updateOrderStatus } from '../ApiAdmin'
import { isAuth } from './../../auth/helpers'
import moment from 'moment'


const ListOrders = () => {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState([])

    const {user, token} = isAuth()

    const loadOrders = (user, token) => {
        listOfOredrs(user._id, token)
            .then(res => setOrders(res))
            .catch(err => console.error(err))
    }

    const loadStatus = (user, token) => {
        getStatus(user._id, token)
            .then(res => setStatus(res.status))
            .catch(err => console.error(err))
    }

    useEffect(()=>{
        loadOrders(user,token)
        loadStatus(user, token)
    },[])

    const notOrders = () => {
        if(orders.length === 0){
            return (
                <div className="alert alert-warning text-center my5 display-3">
                    Not orders yet
                </div>
            )
        }else{
            return (
                <div className="alert alert-info  text-center my5 display-3">
                    Total orders {orders.length}
                </div>
            )
        }
    }

    const showInput = (key, valeur) => {
        return (
            <div className="form-group my-2">
                <label htmlFor={key} >{key} </label>
                <input type="text" id={key} value={valeur} readOnly className="form-control"/>
            </div>
        )
    }

    const handleStatus = (e, order) => {
        updateOrderStatus(user._id,token, order._id, e.target.value)
            .then(res => {
                if(res.error){
                    console.log(res.error)
                }
                loadOrders(user, token)
            })
    }

    const showStatus = (order) => {
        return status.length && (
            <>
                <h4>Status : {order.status}</h4>
                <select onChange={e => handleStatus(e, order)} className="form-control">
                    <option value="">Select status</option>
                    {status.map(item=>(
                    <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </>
        )
    }

    return (
        <div>
            <Layout
            title='Orders'
            description='Orders management'
            className='container'
          >
              <div className="row"> 
                <div className="col-md-6 mx-auto">
                    {notOrders()}
                    { orders.length && orders.map(order => (
                        <div key={order._id} className="my-3">
                            <ul className="list-group">
                                <li className="list-group-item active">
                                    <strong>Transact ID</strong>{order.transaction_id}
                                 </li>
                                <li className="list-group-item">
                                    <strong>Amount</strong>${order.amount}
                                </li>
                                <li className="list-group-item">
                                    {showStatus(order)}
                                </li>
                                <li className="list-group-item">
                                    <strong>Ordered on</strong>{moment(order.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                    <strong>Customer</strong>{order.user.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Delivery address</strong>{order.address}
                                </li>
                            </ul>

                            <div className="my-5">
                                {order.products.map(product => (
                                    <div key={product._id} className="card text-white bg-secondary mb-3" >
                                        <div className="card-header"> {product.name} </div>
                                        <div className="card-body">
                                            {showInput('Product ID', product._id)}
                                            {showInput('Product name', product.name)}
                                            {showInput('Product price','$'+ product.price)}
                                            {showInput('Product quantity', product.count)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) }
                </div>
              </div>
          </Layout>
        </div>
    )
}

export default ListOrders
