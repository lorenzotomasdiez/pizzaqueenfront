import React, { useEffect, useState } from 'react'
import { Button, Chip, FormControl, MenuItem, TextField, Select, Checkbox, FormControlLabel } from '@material-ui/core' 
import { useForm } from 'react-hook-form'

const AddOrder = ({setOpenPopup, setRerender, rerender}) => {
    //-----------------Local variables---------------------
    const URLPRODUCTS = "http://localhost:8080/products/all"
    const URLPOST = "http://localhost:8080/orders/save"
    //-----------------Instances---------------------------
    const [product, setProduct] = useState([])
    const {register, formState: { errors }, handleSubmit , setValue} = useForm()
    const [time, setTime] = useState(getTimeNow)
    const [orderProducts, setOrderProducts] = useState([])
    const [discount, setDiscount] = useState(false)
    //-------------------Methods---------------------------
    register('orderProducts', {required: true})
    setValue('orderTimeNow', time)
    const onSubmit = (data, e) => {
        e.target.reset()
        setOrderProducts([...[]])
        fetchSendData(data, URLPOST)
        setOpenPopup(false)
        setRerender([...rerender])
    }
    const onProductsChange = (e) => {
        let array = orderProducts
        let productObject = product.find(element=>element.productName===e.target.value)
        let object = {
            key:array.length,
            productName:productObject.productName,
            productPrice:productObject.productPrice
        }
        array.push(object)
        setOrderProducts([...array])
        //-----------------------------------------------
        let totalPrice = (getDeliveryCost()+getProductPrice(orderProducts))-getDiscount()
        setValue('orderPrice', totalPrice)
        setValue('orderProducts', getProducts(orderProducts))
    }
    const onClickDelivery = (e) => {
        let checked = e.target.checked
        let element = document.querySelector('#orderAddress')
        let deliveryElement = document.querySelector('#orderDeliveryCost')
        let divDeliveryElement = document.querySelector('#orderDeliveryCost-label')
        let div = document.querySelector('#orderAddress-label')
        if(checked){
            setValue("orderAddress","Retira en local")
            setValue("orderDeliveryCost", 0)
            setValue("orderPrice", (getProductPrice(orderProducts)-getDiscount()))
            element.setAttribute('disabled', 'true')
            deliveryElement.setAttribute('disabled', 'true')
            div.classList.add('MuiInputLabel-shrink')
            div.classList.add('Mui-focused')
            divDeliveryElement.classList.add('MuiInputLabel-shrink')
            divDeliveryElement.classList.add('Mui-focused')
        }else{
            element.removeAttribute('disabled')
            deliveryElement.removeAttribute('disabled')
            setValue("orderAddress","")
            setValue("orderDeliveryCost", null)
            div.classList.remove('MuiInputLabel-shrink')
            div.classList.remove('Mui-focused')
            divDeliveryElement.classList.remove('MuiInputLabel-shrink')
            divDeliveryElement.classList.remove('Mui-focused')
        }
    }
    const onBlurDeliveryCost = (e) => {
        let totalPrice = (getDeliveryCost()+getProductPrice(orderProducts))-getDiscount()
        setValue('orderPrice', totalPrice)
    }
    const onChangeDiscount = (e) => {
        let active = e.target.checked ? true : false
        if(active){
            setDiscount(true)
        }else{
            setDiscount(false)
        }
    }
    const onBlurDiscountMount = () => {
        let totalPrice = (getDeliveryCost()+getProductPrice(orderProducts))-getDiscount()
        setValue('orderPrice', totalPrice)
    }
    const onDeleteChip = (data) => {
        let array = orderProducts.filter(e=>{
            return e.key!==data.key
        })
        setOrderProducts([...array])
        let totalPrice = (getDeliveryCost()+getProductPrice(array))-getDiscount()
        setValue('orderPrice', totalPrice)
        setValue('orderProducts', getProducts(array))
    }
    useEffect(() => {
        fetchApi(URLPRODUCTS, setProduct)
    },[])
    useEffect(()=>{
        setTime(getTimeNow)
    },[orderProducts])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ao__form" >
            <div className="ao__wrapper">
                {/* CONTAINER 1 */}
                <div className="ao__container">
                    <div>
                        <TextField 
                            {...register('orderName',{ required: true})} 
                            label="Nombre"
                            
                        />
                       <p className="ao_validerror">{errors.orderName && "Debe Ingresar Nombre"}</p>
                    </div>
                    <div className="ao_addressdiv">
                        <div>
                            <TextField id="orderAddress"
                                {...register('orderAddress',{ required: true})} 
                                label="Direccion"
                                
                            />
                            <p className="ao_validerror">{errors.orderAddress && "Debe ingresar direccion"}</p>
                        </div>
                        <div>
                            <FormControlLabel
                                className="formControl"
                                control={<Checkbox label="retira" name="delivery" onClick={onClickDelivery}/>}
                                label="Retira"
                            />
                        </div>
                    </div>
                    <FormControl>
                        <Select value="0" onChange={onProductsChange} className="ao_selectproduct">
                            <MenuItem key="0" value="0">Productos...</MenuItem>
                            {
                                product?.map(e=>(
                                    <MenuItem key={e.idProduct} value={e.productName}>{e.productName}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {discount
                        ?
                        <div className="ao__discountdiv">
                            <TextField id="discountMount" 
                                label="Descuento"
                                type="number"
                                onBlur={onBlurDiscountMount}
                            />
                        </div>
                        //No renderiza nada
                        :null
                    }
                    <div className="ao_timediv">
                        <TextField //tiempo actual
                            {...register('orderTimeNow')}
                            className="inputTime"
                            label="Pedido"
                            type="time"
                            value={time}
                            
                            disabled
                            
                        />
                    </div>
                </div>
                {/* CONTAINER 2 */}
                <div className="ao__container">
                    <div>
                        <TextField 
                            {...register('orderPhone')} 
                            type="number" 
                            label="Telefono" 
                        />
                    </div>
                    <div className="ao_totalpricediv">
                        <div>
                            <TextField
                                id="orderDeliveryCost"
                                {...register('orderDeliveryCost', {required:true})} 
                                type="number" 
                                label="Costo Envio"
                                onBlur={onBlurDeliveryCost}
                                
                            />
                            <p className="ao_validerror">{errors.orderDeliveryCost && "Debe ingresar costo de envio"}</p>
                        </div>
                        <div>
                            <FormControlLabel
                                className="formControl"
                                control={<Checkbox label="discount" name="delivery" onChange={onChangeDiscount}/>}
                                label="Descuento"
                            />
                        </div>
                    </div>
                    <div>
                        <TextField
                            id="orderPrice" 
                            {...register('orderPrice')}
                            type="number" 
                            label="Precio Total"
                            defaultValue="0"
                            disabled
                            />
                    </div>
                    {discount
                        ?
                        <div className="ao__discountdiv">
                            <TextField 
                                id="discountMount"
                                {...register("orderDiscountReason")}
                                label="Motivo"
                                type="Text"
                            />
                        </div>
                        //No renderiza nada
                        :null
                    }
                    <div className="ao_timediv">
                        <TextField
                            {...register('orderTimeDelivery')}
                            label="Entrega"
                            type="time"
                            defaultValue={getTimeNow()}
                            className="inputTime"
                        />
                    </div>
                </div>
            </div>
            <div id="addOrder_chips">
            {
                orderProducts.length===0
                ? <p className="ao_validerror">{errors.orderProducts && "Debe ingresar al menos 1 producto"}</p>
                : null
            }
                {   
                
                    orderProducts.map(data=>{
                        return(
                            <Chip
                                key={data.key}
                                label={data.productName}
                                className="aoChips"
                                size="small"
                                onDelete={()=>{
                                    onDeleteChip(data)
                                }}/>
                    )})
                }
            </div>
            <div>
                <Button type="submit" variant="contained" className="button__color">Agregar Pedido</Button>
            </div>
        </form>
    )
}
const fetchSendData = async (data, URLPOST) =>{
    data.orderDate=getDateNow()
    data.orderIsPending = true
    const options = {
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(data)
    }
    //console.log(JSON.stringify(data))
    fetch(URLPOST,options)
    .then(res => console.log("RESPONSE: ",res))
    .catch(error => console.error('Error', error))
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
const getProducts = (products) => {
    let string = ""
    products.forEach(e=>{
        string += e.productName + ", "
    })
    string=string.substring(0,(string.length-2))
    return string
}
const getProductPrice = (products) => {
    let price = 0
    products.forEach(e=>{
        price+=e.productPrice
    })
    return price
}
const getDeliveryCost = () => {
    let deliveryCost = document.querySelector('#orderDeliveryCost').value ? parseInt(document.querySelector('#orderDeliveryCost').value) : 0
    return deliveryCost
}
const getDiscount = () =>{
    let discountMount = 0 
    if(document.querySelector('#discountMount')!=null){
        let discountMount = document.querySelector('#discountMount').value ? parseInt(document.querySelector('#discountMount').value) : 0
        return discountMount    
    }else{
        return discountMount
    }   
}
const getDateNow = () => {
    let day = new Date();
    let time = 
            day.getFullYear().toString() 
            + "-" 
            + ((day.getMonth()+1).toString().length === 1 
                ? '0' + (day.getMonth()+1).toString()
                : (day.getMonth()+1).toString()
            )
            + "-"
            + (day.getDate().toString().length=== 1
                ? '0'+ day.getDate().toString()
                : day.getDate().toString()
            )
            //2021-09-02
    return time
}
export default AddOrder