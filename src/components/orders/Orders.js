import React, { useState } from 'react'
import OrderNavBar from './OrderNavBar'
const Orders = ({titulo}) => {
    const [state, setState] = useState(false)
    const handleAdd = (e) => {
        console.log(state)
    }
    return (
        <div>
            <div className="row text-center">
                <div className="col-10 mt-2">
                    <h2 className="text-uppercase">{titulo}</h2>
                </div>
                <div className="col-2 m-auto">
                    <button className="btn btn-dark" onClick={handleAdd}>Agrega pedido</button>
                </div>
            </div>
            <OrderNavBar />
        </div>
    )
}

export default Orders
