import React, { Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {API_URL} from '../Config_API'
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import {isAuth} from './../auth/helpers'
import {useSelector} from 'react-redux'

const isActive = (history, path) => {
    if(history?.location.pathname === path) {
        return { color: '#fa0'}
    }else{
        return { color: '#fff' }
    }
}

const Navbar = ({history}) => {

    let countItem = useSelector(state => state.cart.count)

    const signout = () => {
        fetch(`${API_URL}/signout`)
            .then(() => {
                toastr.info('User Signout', 'See you next time', {
                    positionClass: "toast-top-center",
                })
                localStorage.removeItem('jwt_info')
                history.push('/signin')
            })
            .catch()
    }

    
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Ecommerce</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link style={isActive(history, '/')} className="nav-link" to="/">Home <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link style={isActive(history, '/shop')} className="nav-link" to="/shop">Shop 
                            </Link>
                        </li>
                        {/* { isAuth() && ( */}
                            <li className="nav-item active">
                                <Link 
                                style={isActive(history, '/dashboard')} className="nav-link" 
                                to={`${isAuth() && isAuth().user.role ? '/admin':''}/dashboard`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {/* )} */}

                        <li>

                        </li>
                        
                        {
                            !isAuth() &&
                        (
                            <Fragment>
                                <li className="nav-item">
                            <Link style={isActive(history, '/signin')} className="nav-link" to="/signin">SignIn</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link style={isActive(history, '/signup')}  className="nav-link disabled" to="signup">SignUp
                            </Link>
                        </li>
                            </Fragment>
                        )
                        }
                        <li className="nav-item">
                            <Link to='/cart' style={{cursor: 'pointer'}} className="nav-link">
                                                Cart 
                                <span style={{fontSize: '15px' }} className="mx-1 badge badge-info">{countItem}</span>
                            </Link>
                        </li>
                        {

                            isAuth() && (
                                        
                                        <li className="nav-item">
                                            <span className="nav-link disabled" style={{cursor: 'pointer', color: 'red'}} onClick={signout}>SignOut</span>
                                        </li>
                                
                            )
                        }
                    </ul>
                </div>
                </nav>
        </div>
    )
}

export default withRouter(Navbar)
