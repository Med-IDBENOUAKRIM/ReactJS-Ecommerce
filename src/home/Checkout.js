import React, { Fragment, useEffect, useState } from 'react'
import {isAuth, emptyCart} from './../auth/helpers'
import {Link} from 'react-router-dom'
import {getBrainTreeToken, processPayment, createOrder} from './ApiProduct'
import DropIn from 'braintree-web-drop-in-react'
import toastr from 'toastr';
import 'toastr/build/toastr.css'

const Checkout = ({ products }) => {

    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: {},
        address: ''
    })

    const userId = isAuth() && isAuth().user._id;
    const token = isAuth() && isAuth().token;

    useEffect(() => {
        getBrainTreeToken(userId, token)
            .then(res => setData({...data, braintreeToken: res.token}))
            .catch(err => setData({...data, error: err}))
    },[])

    const totalToCheckout = products => {
        return products.reduce((total, product) => total + (product.count * product.price) , 0)
    }

    const buy = () => {
        const deliveryAddress = data.address
        data.instance.requestPaymentMethod()
            .then(data => {

                let paymentData = {
                    amount: totalToCheckout(products),
                    paymentMethodNonce: data.nonce
                }
                processPayment(userId, token, paymentData)
                    .then(res => {
                        console.log(res)

                        let orderData = {
                            products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: deliveryAddress
                        }

                        createOrder(userId, token, orderData)
                            .then(res => console.log(res))
                            .catch(err => console.error(err))

                        emptyCart(()=>{
                            toastr.success('Valid', 'Thanks, your payment is success',{
                                positionClass: 'toast-bottom-left'
                            })
                        })
                    }
                   )
                    .catch(err => {
                        toastr.error('Invalid', err.message,{
                            positionClass: 'toast-bottom-left'
                        })})

               
            })
            .catch(err => {
                toastr.error('Not valid', err.message,{
                    positionClass: 'toast-bottom-left'
                })})
    }

    const handleInput = e => {
        setData({...data, address: e.target.value})
    }

    return (
        <div>
            <h2>Total: <span className='ml-5 text-center'> ${totalToCheckout(products)}</span> </h2>
            <label htmlFor="address">Delivery Address</label>
            <textarea id='address' className='form-control' onChange={handleInput} rows="2"></textarea>
            {
                isAuth() ? (
                    <Fragment>
{
                        data.braintreeToken !== null && products.length > 0 && (
                            <DropIn 
                                options={{
                                    authorization: data.braintreeToken,
                                    paypal: {
                                        flow: "vault"
                                    }
                                }}
                                onInstance={instance => data.instance = instance}
                            />
                        )
                    }
                        <button onClick={buy} className="btn btn-raised mt-5 btn-success">Pay</button>
                    </Fragment>
                    

                ) : (
                    <Link to='/signin'>
                        <button className="btn btn-raised mt-5 btn-warning btn-block">SignIn to Checkout</button>
                    </Link>
                )
            }

            
        </div>
    )
}

export default Checkout
