import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import PopUp from '../orderManagement/PopUp'
import AddProduct from './AddProduct'
import List from './List'
import "./style.css"
const StockManagement = () => {
    const [openAddProduct, setOpenAddProduct] = useState(false)
    return (
        <div>
            <div className="stock_header">
                <Button
                    variant="contained"
                    onClick={()=>{setOpenAddProduct(true)}}
                >Agregar Producto
                </Button> 
            </div>
            <div className="stock_content">
                <List />
            </div>
            <PopUp
                openPopup={openAddProduct}
                setOpenPopup={setOpenAddProduct}
                title="Agregar Pedido"
                className="popup"
            >
                <AddProduct setOpenPopup={setOpenAddProduct} />
            </PopUp>
        </div>
    )
}

export default StockManagement
