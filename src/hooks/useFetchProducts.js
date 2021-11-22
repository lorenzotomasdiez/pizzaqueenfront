import { useEffect } from "react"
import { useState } from "react"
import { getProduct } from "../helpers/getProduct"

export const useFetchProducts = (category) => {
    const [state, setState] = useState({
        data:[],
        loading:true
    })

    useEffect(()=>{
        getProduct(category).then(resp=>{
            setTimeout(()=>{
                setState({
                    data:resp,
                    loading:false
                })
            },1000)
        })
    },[])

    return state
}