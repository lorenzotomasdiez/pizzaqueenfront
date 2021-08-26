import React, { useEffect, useState } from 'react'
import Content from './itemsManagement/Content'

const ItemsManagement = () => {
    const [product, setProduct] = useState([])
    const URL="http://localhost:8080/products/all"
    useEffect(() => {
        fetchData(URL)
    }, [])

    const fetchData = async (url) => {
        let data = null
        try{
            const res = await fetch(url)
            data = await res.json()
            setProduct(data)
            console.log('hola',product)
        } catch(error){
            console.log("ERROR: ", error)
        }
        return data
    }
    return (
        <div>
            <Content />
            <ul>
                {
                    product.map(e=>(
                        <li>{e.productName}</li>
                ))
                }
            </ul>
        </div>
    )
}

export default ItemsManagement
