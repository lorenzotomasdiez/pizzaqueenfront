import { Button } from '@material-ui/core'
import React from 'react'

const UpdateOrder = ({data, setUpdateOrder, render, setRender}) => {
    const URLUPDATE="http://localhost:8080/orders/update"
    const handleConfirm = () => {
        fetchUpdate(URLUPDATE,data)
        setUpdateOrder(false)
        setRender([0,1])
    }
    const handleCancel = () => {
        setUpdateOrder(false)
    }
    return (
        <div className="deleteorder_buttons">
            <div>
                <Button color="primary" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </div>
            <div>
                <Button color="primary" onClick={handleCancel}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}
const fetchUpdate = async (URLUPDATE, data) => {
    data.orderIsPending = false
    const options = {
        method:'PUT',
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(data)
    }
    console.log(JSON.stringify(data))
    fetch(URLUPDATE,options)
    .then(res => console.log("RESPONSE: ",res))
    .catch(error => console.error('Error', error))
}
export default UpdateOrder
