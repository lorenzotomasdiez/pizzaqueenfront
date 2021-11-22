import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import OrderList from '../../components/orders/OrderList'
import Orders from '../../components/orders/Orders'
import Navbar from '../../components/ui/Navbar'
const objeto1 ={
    id:1,
    name:"Tomas",
    time:"23:50",
    address:"Suiza 1460",
    products:"MUZZA, COCA, CRUDO",
}
const objeto2 ={
    id:1,
    name:"Lucia",
    time:"23:20",
    address:"Arenales 1137",
    products:"MUZZA, SPRITE, CRUDO",
}
const OrdersRoutes = () => {
    return (
        <>
            <Navbar />
            <Orders titulo="PEDIDOS"/>
            <div className="m-2">
                <Switch>
                    <Route exact path="/orders/pendings" component={()=>(<OrderList object={objeto1}/>)}/>
                    <Route exact path="/orders/done" component={()=>(<OrderList object={objeto2}/>)}/>
                    <Redirect to="/orders/pendings"/>
                </Switch>
            </div>   
        </>
    )
}

export default OrdersRoutes
