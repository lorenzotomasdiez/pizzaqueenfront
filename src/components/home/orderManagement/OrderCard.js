import { TextField } from '@material-ui/core'
import React from 'react'

const OrderCard = ({data}) => {
    return (
        <div className="ol__card">
            <TextField
                className="cardFields"
                value={data.orderName}
                size="small" 
                label="Nombre"
                variant="outlined" 
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly:true
                }}
                disabled
                />
            <TextField
                className="cardFields"
                value={data.orderTimeDelivery}
                size="small" 
                label="Entrega"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly:true
                }}
                disabled
                />
            <TextField
                className="cardFields"
                value={data.orderAddress}
                size="small" 
                label="Direccion"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly:true
                }}
                disabled  
                />
            <TextField
                className="cardFields"
                value={data.orderPrice}
                size="small" 
                label="Precio total"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly:true
                }}
                disabled  
                />
        </div>
    )
}

export default OrderCard
