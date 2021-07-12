import React, { Fragment } from 'react'
import Layout from './../home/Layout'
import {isAuth} from './../auth/helpers'
import {Link} from 'react-router-dom'

const Dashboard = () => {
    const {user: {name, email, role}} = isAuth()
    return (
        <Fragment>
            <Layout
                title='Dashboard'
                description={`Welcom ${name}`}
                className='container'
            >
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-header">User Links</h5>
                                <ul className="list-group list-group-flush"></ul>
                                    <li className="list-group-item">
                                       <Link className='nav-link' to='/cart'>My Cart</Link>
                                    </li>
                                    <li className="list-group-item">
                                       <Link className='nav-link' to='/profile'>Profile</Link>
                                    </li>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                    <div className="card">
                            <div className="card-body">
                                <h5 className="card-header">User INFORMATION</h5>
                                <ul className="list-group list-group-flush"></ul>
                                    <li className="list-group-item">{name}</li>
                                    <li className="list-group-item">{email}</li>
                                    <li className="list-group-item">{role ? 'Admin' : 'Visitor'}</li>
                            </div>
                        </div>
                        <hr/>
                        <div className="card mb-5">
                            <div className="card-body">
                                <h5 className="card-header">Purshase HISTORY</h5>
                                <ul className="list-group list-group-flush"></ul>
                                    <li className="list-group-item">Histroy</li>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Dashboard
