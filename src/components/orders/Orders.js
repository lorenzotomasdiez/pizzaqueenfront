import React, { useState } from 'react'
import OrderAdd from './OrderAdd'
import OrderNavBar from './OrderNavBar'
const Orders = ({titulo}) => {
const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <div>
            <div className="row text-center">
                <div className="col-10 mt-2">
                    <h2 className="text-uppercase">{titulo}</h2>
                </div>
                <div className="col-2 m-auto">
                    <button className="btn btn-dark" onClick={handleClickOpen}>Agrega pedido</button>
                </div>
            </div>
            <OrderNavBar />
            <OrderAdd open={open} onClose={handleClose} />
        </div>
    )
}

export default Orders
