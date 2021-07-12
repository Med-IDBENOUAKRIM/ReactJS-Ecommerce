import React, { useState } from 'react'
import Layout from '../home/Layout'
import {API_URL} from '../Config_API'
import toastr from 'toastr';
import 'toastr/build/toastr.css'

const Signup = ({history}) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = e=>{
        setUser({...user, [e.target.id]: e.target.value})
    }

    const submitSignUp = e => {
        e.preventDefault()
        fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please check your form!!', { positionClass: "toast-bottom-left", })
            }else{
                toastr.success('New user is signup', 'New account',{ positionClass: "toast-top-center",})
                history.push('/signin')
            }
        })
        .catch(err => toastr.error(err, 'Error 404', {positionClass:"toast-bottom-left", })
        )
    }

    return (
        <div>
            <Layout
                title='Sign Up'
                description='please, Sign UP'
                className='container'
            >
                <form onSubmit={submitSignUp} className='row' >
                    <div className="col-md-6 mx-auto">
                        <div className="form-group ">
                            <label htmlFor="name" className="text-muted">name</label>
                            <input onChange={handleChange} type="text" className="form-control" id='name' />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="email" className="text-muted">Email</label>
                            <input onChange={handleChange} type="email" className="form-control" id='email' />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="password" className="text-muted">password</label>
                            <input onChange={handleChange} type="password" className="form-control" id='password' />
                        </div>
                        <button className="btn btn-outline-success btn-block my-2">SignUp</button>
                    </div>
                </form>
            </Layout>
        </div>
    )
}

export default Signup
