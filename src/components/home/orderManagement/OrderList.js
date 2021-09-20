import React, { useState, useEffect } from 'react'
import { Button, IconButton, TextField } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PopUp from './PopUp';
import OrderCard from './OrderCard';
import DescriptionCard from './DescriptionCard';
import DeleteOrder from './DeleteOrder';
import UpdateOrder from './UpdateOrder';

const URLPENDING="http://localhost:8080/orders/all/pending"
const URLDONE="http://localhost:8080/orders/all/done"

const OrderList = (props) => {
    const {rerender, setRerender, title, isPending} = props
    const [orders, setOrders] = useState([]) //use state de pedidos que se van a mostrar
    const [openOrder, setOpenOrder] = useState(false)
    const [deleteOrder, setDeleteOrder] = useState(false)
    const [updateOrder, setUpdateOrder] = useState(false)
    const [orden, setOrden] = useState()
    const [deleteComponent, setDeleteComponent] = useState() 
    const [updateComponent, setUpdateComponent] = useState()
    const handleOpenOrder = (e) => {
        setOrden(<DescriptionCard data={e} />)
        setOpenOrder(true)
    }
    const handleDeleteOrder = (e) => {
        setDeleteComponent(<DeleteOrder data={e} setDeleteOrder={setDeleteOrder} render={rerender} setRender={setRerender}/>)
        setDeleteOrder(true)
    }
    const handleDoneOrder = (e) => {
        setUpdateComponent(<UpdateOrder data={e} setUpdateOrder={setUpdateOrder} render={rerender} setRender={setRerender} />)
        setUpdateOrder(true)
    }
    useEffect(() => {
        fetchApi(URLPENDING, URLDONE, setOrders, isPending)
    },[rerender])
    return (
        <div className="orderListContainer">
            <div id="ol__header">
                <div id="ol__title">
                    <h3>{title}</h3>
                </div>
                <div id="ol__time">
                    <TextField 
                        type="date" 
                        label="Time" 
                        size="small" 
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            console.log(e.target.value)
                        }}
                        value={getTimeNow()}
                    />
                </div>
            </div>
            <div className="ol__content">
                {
                    orders?.map(e=>(
                        <div className="ol__div" key={e.orderId}>
                            <Button onClick={()=>{handleOpenOrder(e)}} >
                                <OrderCard data={e} />
                            </Button>
                            {isPending
                                ?   <IconButton onClick={()=>{handleDoneOrder(e)}}>
                                        <CheckCircleIcon className="ol_button" color="primary"/>
                                    </IconButton>
                                :   null    
                            }
                            {isPending
                                ?
                                    <IconButton onClick={()=>{handleDeleteOrder(e)}}>
                                        <DeleteIcon className="ol_button" color="primary"/>
                                    </IconButton>
                                :   
                                    null
                            }
                        </div>
                    ))
                }
            </div>
            <PopUp
                openPopup={openOrder}
                setOpenPopup={setOpenOrder}
                title="Pedido"
                className="popup"
            >
                {orden}
            </PopUp>
            <PopUp
                openPopup={deleteOrder}
                setOpenPopup={setDeleteOrder}
                title="Desea eliminar el pedido?"
                className="popup"
            >
                {deleteComponent}
            </PopUp>
            <PopUp
                openPopup={updateOrder}
                setOpenPopup={setUpdateOrder}
                title="Desea marcar como entregado el pedido ?"
                className="popup"
            >
                {updateComponent}
            </PopUp>
            
        </div>
        )
}
const fetchApi = async (URLPENDING, URLDONE, setState, isPending) => {
    let url
    if(isPending){
        url = URLPENDING
    }else{
        url = URLDONE
    }
    let res
    let json
    let array
    let arrayByTime
    try{
        res = await fetch(url) 
        json = await res.json()
        array = filterOrder(json)
        arrayByTime = orderByTime(array)
        setState([...arrayByTime])
        //setState([...json]) metodo viejo
    }catch(error){
        console.log("error",error)
    }
    return json
}
const getTimeNow = () => {
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
            //2021-09-05
    return time
}
const filterOrder = (data) => {
    let day = getTimeNow()
    let res = data.filter(element => {
        let substring = element.orderDate.substring(0,10)
        if(substring===day){
            return true
        }else{
            return false
        }
    })
    return res
}
const orderByTime = (array) => {
    let times = []
    let arrayByTime = []
    array.forEach(element=>{
        let formattedTime = parseInt(element.orderTimeDelivery.replace(":",""))
        let object = {
            id:element.orderId,
            time: formattedTime
        }
        times.push(object)
    })
    times=times.sort((a,b)=>a.time-b.time)
    times.forEach(element=>{
        let object = array.find(e=>e.orderId===element.id)
        arrayByTime.push(object)
    })
    return arrayByTime
}
export default OrderList
