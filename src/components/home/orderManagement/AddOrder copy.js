import {Button, Chip, FormControl, IconButton, MenuItem, Select, TextField } from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached';
import React, { useEffect, useState } from 'react'

const AddOrder = () => {
    const URLPRODUCTS = "http://localhost:8080/products/all"
    const [time, setTime] = useState(getTimeNow)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [deliveryCost, setDeliveryCost] = useState(0)
    const handleAdd = (e) => {
        let array = products
        let prod = product.filter(product=>{
            return product.productName===e.target.value
        })
        prod=prod[0]
        array.push(prod)
        setProducts([...array])
        let price = getTotal(array)+deliveryCost
        setTotalPrice(price)
    }
    const handleTime = () => {
        setTime(getTimeNow)
        let e = document.querySelector('#orderTimeNow')
        e.value=time
    }
    const handleSendOrder = () => {
        var productString = getProducts(products)
        const order = {
            order_products:productString,
            order_timenow:document.querySelector("#orderTimeNow").value,
            order_timedelivery:document.querySelector("#orderTimeDelivery").value,
            order_address: document.querySelector("#orderAddress").value,
            order_date: new Date().toLocaleDateString(),
            order_delivery_cost:document.querySelector("#orderDeliveryCost").value,
            order_name:document.querySelector("#orderName").value,
            order_phone:document.querySelector("#orderPhone").value,
            order_final_price:document.querySelector("#orderFinalPrice").value
        }
        console.log(order)
    }
    const handleDelete = (data) => {
        let array = products.filter(e=>{
            return e.productName!==data.productName
        })
        setProducts([...array])
        let price = getTotal(array)+deliveryCost
        setTotalPrice(price)    
    }
    const handleDeliveryCost = (e) =>{
        let price = e.target.value?parseInt(e.target.value):0
        setDeliveryCost(price)
    }
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
    }, [])
    setInterval(()=>{
        let price = getTotal(products)+deliveryCost
        if(price!==totalPrice){
            setTotalPrice(price)
        }
    },1000)
    return (
        <div className="orderWrapper">
            <p>AGREGAR PEDIDO</p>
            <form className="orderForm">
                <div className="addOrderWrapper">
                    <div className="aoParent">
                        <div className="aoChild">
                            <TextField id="orderName" className="inputClass" placeholder="Nombre" required/>
                        </div>
                        <div className="aoChild">
                            <TextField id="orderAddress" type="text" placeholder="Domicilio" />
                        </div>
                        <FormControl className="aoChild" id="orderSelect"> 
                            <Select value="0" onChange={handleAdd}>
                                <MenuItem value="0">Producto</MenuItem>
                                {
                                    product?.map(e=>(
                                        <MenuItem key={e.idProduct} value={e.productName}>{e.productName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <div className="aoChild aoTime">
                            <TextField
                                id="orderTimeNow"
                                label="Pedido"
                                type="time"
                                defaultValue={time}
                                className="inputTime"
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                disabled
                                />
                            <IconButton onClick={handleTime}>
                                <CachedIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="aoParent">
                        <div className="aoChild">
                            <TextField id="orderPhone" type="phone" placeholder="Telefono" />
                        </div> 
                        <div className="aoChild">
                            <TextField id="orderDeliveryCost" onBlur={handleDeliveryCost} type="number" placeholder="Costo Envio" required/>
                        </div>
                        <div className="aoChild">
                            <TextField 
                                id="orderFinalPrice"
                                type="number" 
                                placeholder="Precio Total"
                                value={totalPrice}
                                disabled
                            >
                                {30*2.5}
                            </TextField>
                        </div>
                        <div className="aoChild">
                            <TextField
                                id="orderTimeDelivery"
                                label="Entrega"
                                type="time"
                                defaultValue={getTimeDelivery()}
                                className="inputTime"
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </div>   
                    </div>
                </div>
                <div id="addOrder_chips">
                    {
                        products.map(data=>(
                            <Chip
                                key={Math.random(10,2000)} 
                                size="small" 
                                className="aoChips"
                                onDelete={()=>{
                                    handleDelete(data)
                                }}
                                label={data.productName}
                            />
                        ))
                    }
                </div>
                <div className="aoSend">
                        <Button type="Submit" variant="contained" onClick={handleSendOrder}>Agregar Pedido</Button>
                </div>
            </form>
        </div>
    )
}

const getTimeNow = () => {
    const day = new Date();
    let time = 
            (day.getHours().toString().length === 1 
                ? '0' + day.getHours()
                : day.getHours()
            ) 
            + ":" 
            + (day.getMinutes().toString().length === 1 
                ? '0' + day.getMinutes()
                : day.getMinutes()
            ) 
    return time
}
const getTimeDelivery = () => {
    const day = new Date();
    let time = 
            (day.getHours().toString().length === 1 
                ? '0' + day.getHours()
                : day.getHours()
            ) 
            + ":" 
            + (day.getMinutes().toString().length === 1 
                ? '0' + day.getMinutes()
                : day.getMinutes()
            ) 
    return time
}
const getProducts = (products) => {
    let string = ""
    products.forEach(e=>{
        string += e.productName + ", "
    })
    string=string.substring(0,(string.length-2))
    return string
}
const getTotal = (products) => {
    let total = 0
    products.forEach(e=>{
        total+=e.productPrice
    })
    return total
}
export default AddOrder