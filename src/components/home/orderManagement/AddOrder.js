import React, { useEffect, useState } from 'react'
import { Button, Chip, FormControl, MenuItem, TextField, Select } from '@material-ui/core' 
import { useForm } from 'react-hook-form'

const AddOrder = () => {
    //-----------------Local variables---------------------
    const URLPRODUCTS = "http://localhost:8080/orderProducts/all"
    //-----------------Instances---------------------------
    const [product, setProduct] = useState([])
    const {register, handleSubmit} = useForm()
    const [order, setOrder] = useState('')
    const [orderProducts, setOrderProducts] = useState([])
    const [time, setTime] = useState(getTimeNow)
    //-------------------Methods---------------------------
    const onSubmit = (data) => {
        setOrder(data)
        console.log(data)
    }
    const onProductsChange = (e) => {
        let array = orderProducts
        let prod = product.filter(product=>{
            return product.productName===e.target.value
        })
        prod=prod[0]
        array.push(prod)
        setOrderProducts([...array])
        console.log(orderProducts)
    }
    useEffect(() => {
        fetchApi(URLPRODUCTS, setProduct)
    }, [])
    const handleDelete = (data) => {
        let array = orderProducts.filter(e=>{
            return e.productName!==data.productName
        })
        setOrderProducts([...array])
        let price = getTotal(array)+deliveryCost
        setTotalPrice(price)    
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register('order_name')} placeholder="Nombre" required/>
            <TextField {...register('order_address')} placeholder="Direccion" required/>
            <FormControl>
                <Select value="0" onChange={onProductsChange}>
                    <MenuItem key="0" value="0">Productos...</MenuItem>
                    {
                        product?.map(e=>(
                            <MenuItem key={e.idProduct} value={e.productName}>{e.productName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <TextField //tiempo actual
                {...register('order_timenow')}
                className="inputTime"
                label="Pedido"
                type="time"
                value={time}
                inputProps={{
                    step: 300, // 5 min
                }}
                
            />
            <TextField {...register('order_phone')} type="number" placeholder="Telefono" />
            <TextField {...register('order_delivery_cost')} type="number" placeholder="Costo Envio" required/>
            <TextField 
                {...register('order_final_price')}
                type="number" 
                placeholder="Precio Total"
               
            />
            <TextField
                {...register('order_timedelivery')}
                label="Entrega"
                type="time"
                defaultValue={getTimeNow()}
                className="inputTime"
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <div id="addOrder_chips">
                    {
                        orderProducts.map(data=>(
                            <Chip
                                key={Math.random(10,2000)} 
                                size="small" 
                                className="aoChips"
                                onDelete={()=>{
                                    onDeleteProduct(data)
                                }}
                                label={data.productName}
                            />
                        ))
                    }
            </div>
            <Button type="submit">Agregar Pedido</Button>
        </form>
    )
}
const fetchApi = async (url, setState) => {
    let res
    let json
    try{
        res = await fetch(url)
        json = await res.json()
        
        setState([...json])
    }catch(error){
        console.log("error",error)
    }
    return json
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
export default AddOrder