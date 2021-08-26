import React, { useEffect, useState } from 'react'

const AddOrder = () => {
    const URLPRODUCTS = "http://localhost:8080/products/all"
    const [product, setProduct] = useState([])
    const fetchProduct = async (url) => {
        let res
        let json
        try{
            res = await fetch(url)
            json = await res.json()
            
            setProduct([...json])
        }catch(error){
            console.log("error",error)
        }
        return json
    }
    useEffect(() => {
        fetchProduct(URLPRODUCTS)
        console.log(product)
    }, [])
    return (
        <form>
            <p>
                {JSON.stringify(product)}
            </p>
        </form>
    )
}
export default AddOrder