import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import AddOrder from './AddOrder'
import OrderList from './OrderList'
import "./orderManagement.css"
import PopUp from './PopUp'
const OrderManagement = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [rerender, setRerender] = useState([])
    return (
        <div>
            <div className="omHeader">
                <h3>Sector Pedidos</h3>
            </div>
            <div className="omContent">
                <div className="omChild" id="orderList">
                    <div id="om_divbutton">
                        <div>
                            <Link to="/home" className="link-buttons">
                                <Button
                                    variant="contained"
                                    className="button__color"
                                >VOLVER</Button>
                            </Link>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={()=>{setOpenPopup(true)}}
                                className="button__color"
                                >
                                AGREGAR PEDIDO
                            </Button>
                        </div>
                    </div>
                    <div>
                        <OrderList rerender={rerender} setRerender={setRerender} title="Lista Pendientes" isPending={true}/>
                    </div>
                    <div>
                        <OrderList rerender={rerender} setRerender={setRerender} title="Lista Enviados" isPending={false}/>
                    </div>
                </div>
                
            </div>


            <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Agregar Pedido"
                className="popup"
            >
                <AddOrder setOpenPopup={setOpenPopup} rerender={rerender} setRerender={setRerender}/>
            </PopUp>
        </div>
    )
}

export default OrderManagement
