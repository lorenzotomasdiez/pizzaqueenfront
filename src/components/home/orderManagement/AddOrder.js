import React, { useEffect, useState } from 'react'
import { Button, Chip, FormControl, MenuItem, TextField, Select, Checkbox, FormControlLabel } from '@material-ui/core' 
import { useForm } from 'react-hook-form'

const AddOrder = () => {
    //-----------------Local variables---------------------
    const URLPRODUCTS = "http://localhost:8080/orderProducts/all"
    //-----------------Instances---------------------------
    const [product, setProduct] = useState([])
    const {register, formState: { errors }, handleSubmit , setValue} = useForm()
    const [order, setOrder] = useState('')
    const [time, setTime] = useState(getTimeNow)
    const [orderProducts, setOrderProducts] = useState([product])
    //-------------------Methods---------------------------
    const onSubmit = (data) => {
        setOrder(data)
        console.log(data)
    }
    const onProductsChange = (e) => {
        debugger
        let array = orderProducts
        let prod = product.filter(product=>{
            return product.productName===e.target.value
        })
        prod=prod[0]
        array.push(prod)
        setOrderProducts([...array])
        setValue('order_products', orderProducts.toString())
        // hay que agregar los productos y setear al form
        // todos los productos
        // lo mismo en delete de elementos
        console.log(orderProducts)
    }
    const onDeleteChip = (data) => {
        let array = orderProducts.filter(e=>{
            return e.productName!==data.productName
        })
        setOrderProducts([...array])
    }
    const onClickDelivery = (e) => {
        let checked = e.target.checked
        let element = document.querySelector('#order_address')
        let div = document.querySelector('#order_address-label')
        if(checked){
            setValue("order_address","Retira en local")
            element.setAttribute('disabled', 'true')
            div.classList.add('MuiInputLabel-shrink')
            div.classList.add('Mui-focused')
        }else{
            element.removeAttribute('disabled')
            setValue("order_address","")
            div.classList.remove('MuiInputLabel-shrink')
            div.classList.remove('Mui-focused')
        }
    }
    const onBlurDeliveryCost = (e) => {
        let deliveryCost = e.target.value ? parseInt(e.target.value) : 0
        let totalPrice = parseInt(document.querySelector('#order_final_price').value)
        //aca va el precio total de todos los productos elegidos
        // y seria deliveryCost+orderProductsPrice
        setValue('order_final_price', deliveryCost)
    }
    useEffect(() => {
        fetchApi(URLPRODUCTS, setProduct)
        register('order_products', '')
        setInterval( () => {
            setTime(getTimeNow)
          },45000)
    },[getTimeNow])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ao__form" >
            <div className="ao__wrapper">
                {/* CONTAINER 1 */}
                <div className="ao__container">
                    <div>
                        <TextField 
                            {...register('order_name',{ required: true})} 
                            label="Nombre"
                        />
                        <p className="ao_validerror">{errors.order_name && "Debe Ingresar Nombre"}</p>
                    </div>
                    <div className="ao_addressdiv">
                        <div>
                            <TextField id="order_address"
                                {...register('order_address',{ required: true})} 
                                label="Direccion"
                                />
                            <p className="ao_validerror">{errors.order_address && "Debe ingresar direccion"}</p>
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
                    <div className="ao_timediv">
                        <TextField //tiempo actual
                            {...register('order_timenow')}
                            className="inputTime"
                            label="Pedido"
                            type="time"
                            value={time}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            disabled
                            
                        />
                    </div>
                </div>
                {/* CONTAINER 2 */}
                <div className="ao__container">
                    <div>
                        <TextField 
                            {...register('order_phone')} 
                            type="number" 
                            label="Telefono" 
                        />
                    </div>
                    <div>
                        <TextField 
                            {...register('order_delivery_cost')} 
                            type="number" 
                            label="Costo Envio"
                            onBlur={onBlurDeliveryCost}
                        />
                    </div>
                    <div>
                        <TextField
                            id="order_final_price" 
                            {...register('order_final_price')}
                            type="number" 
                            label="Precio Total"
                            defaultValue="0"
                            disabled
                            />
                    </div>
                    <div className="ao_timediv">
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
                    </div>
                    <div id="addOrder_chips">
                            {
                                orderProducts.map(data=>(
                                    <Chip
                                        key={Math.random(10,2000)} 
                                        size="small" 
                                        className="aoChips"
                                        onDelete={()=>{
                                            onDeleteChip(data)
                                        }}
                                        label={data.productName}
                                    />
                                ))
                            }
                    </div>
                </div>
            </div>
            <div>
                <Button type="submit">Agregar Pedido</Button>
            </div>
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