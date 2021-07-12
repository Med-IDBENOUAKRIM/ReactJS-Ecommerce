import React, { useState } from 'react'
import Layout from './../../home/Layout'
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import {isAuth} from './../../auth/helpers'
import {API_URL} from './../../Config_API'

const AddCategory = () => {

    const [name, setName] = useState('')

    const handleChange = e => {
        setName(e.target.value)
    }

    const submitCategory = e => {
        e.preventDefault()

        const {user , token} = isAuth()

        fetch(`${API_URL}/category/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please check your form!!', { positionClass: "toast-bottom-left", })
            }else{
                toastr.info(`Category ${name} created`, 'New category',{ positionClass: "toast-top-center",})

                setName('')
            }
        })
        .catch(err => toastr.error(err, 'Error 404', {positionClass:"toast-bottom-left", })
        )
    }
    return (
        <div>
            <Layout
                title='Category'
                description='New category'
                className='container'
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submitCategory}>
                            <div className="form-group">
                                <label htmlFor="" className='text-muted'></label>
                                <input value={name} required placeholder='Enter name of new category' autoFocus type="text" onChange={handleChange} name="" className='form-control'/>
                            </div>
                            <button className="btn btn-outline-success">New Category</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddCategory
