import { Button } from '@material-ui/core'
import React from 'react'

const DeleteOrder = ({data, setDeleteOrder, render, setRender}) => {
    const URLDELETE = "http://localhost:8080/orders/delete/"
    const handleConfirmDeleteOrder = () => {
        fetchDeleteOrder(data, URLDELETE)
        setDeleteOrder(false)
        setRender([0,0])
    }
    const handleCancelDeleteOrder = () => {
        setDeleteOrder(false)
    }
    return (
        <div className="deleteorder_buttons">
            <div>
                <Button color="primary" onClick={handleConfirmDeleteOrder}>
                    Confirmar
                </Button>
            </div>
            <div>
                <Button color="primary" onClick={handleCancelDeleteOrder}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}
const fetchDeleteOrder = (data, url) => {
    const URLDELETE = url+data.orderId
    const options = {
        method:'DELETE'
    }
    fetch(URLDELETE,options)
    .then(res => console.log("RESPONSE: ",res))
    .catch(error => console.error('Error', error))
}

export default DeleteOrder
