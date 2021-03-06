import React from 'react'
import {API_URL} from './../Config_API'

const ShowImage = ({item, url, className}) => {
    return (
        <div>
            <img className={className} src={`${API_URL}/${url}/${item._id}`} alt={`${item.name}`} />
        </div>
    )
}

export default ShowImage
