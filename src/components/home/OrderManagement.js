import React from 'react'
import AddOrder from './orderManagement/AddOrder'
import "./orderManagement/orderManagement.css"
const OrderManagement = () => {

    return (
        <div>
            <div className="omHeader">
                <h3>ORDER MANAGEMENT</h3>
            </div>
            <div className="omContent">
                <div className="omChild">
                    <AddOrder />
                </div>
            </div>
        </div>
    )
}

export default OrderManagement
