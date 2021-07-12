import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './home/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Navbar from './home/Navbar'
import Dashboard from './user/Dashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/category/AddCategory'
import AddProduct from './admin/product/AddProduct'
import Shop from './home/Shop'
import Product from './home/Product'
import Cart from './home/Cart'
import ListOrders from './admin/order/ListOrders'

function Routes() {
    return (
        <BrowserRouter>
        <Navbar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/category/create' exact component={AddCategory} />
                <AdminRoute path='/product/create' exact component={AddProduct} />
                <AdminRoute path='/admin/order' exact component={ListOrders} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/product/:id' exact component={Product} />
                <Route path='/cart' exact component={Cart} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
