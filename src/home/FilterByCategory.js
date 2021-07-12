import React, { useState } from 'react'

const FilterByCategory = ({categories, handleFiters}) => {

    const [checked] = useState(new Set())

    const handleCategory = (category) => {

        if(checked.has(category._id)) {
            checked.delete(category._id)
        }else{
            checked.add(category._id)
        }
        handleFiters(Array.from(checked))
    }

    return (
        <div>
            <h4>Filter by categories</h4>
            <ul>
                {
                    categories && categories.map((category, i)=>(
                        <li key={i} className="list-unstyled my-3">

                            <input onClick={() => handleCategory(category)} type="checkbox" name="" id={i} 
                            value={category._id}   className='form-check-input' />
                            <label htmlFor={i} className="form-check-label ml-3">{category.name}</label>
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}

export default FilterByCategory
