import { Button, NativeSelect } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PopUp from '../orderManagement/PopUp'
import AddProduct from './AddProduct'
import List from './List'
import "./stockStyle.css"
const StockManagement = () => {
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [display, setDisplay] = useState(true)
    const [filter, setFilter] = useState("All")

    useEffect(()=>{
        setDisplay(true)
    },[display])
    return (
        <div>
            <div className="stock_header">
                <Link to="/home" className="link-buttons">
                    <Button
                        variant="contained"
                        className="button__color"
                    >VOLVER</Button>
                </Link>
                <Button
                    variant="contained"
                    onClick={()=>{setOpenAddProduct(true)}}
                    className="stock_addProduct"
                >Agregar Producto
                </Button>
                <div className="stock_filter">
                    <h3>Categoria</h3>
                    <ListSelect setFilter={setFilter} setDisplay={setDisplay}/>
                </div> 
            </div>
            <div className="stock_content">
                {display&&<List category={filter}/>}
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
const ListSelect = ({setFilter, setDisplay}) => {
    const handleFilter = (e) => {
        setDisplay(false)
        setFilter(e.target.value)
    }
    return (
        <NativeSelect className="stock_select" onChange={handleFilter}>
            <option value="All">Todas</option>
            <option value="Pizza">Pizzas</option>
            <option value="Bebida">Bebidas</option>
            <option value="Insumos">Insumos</option>
        </NativeSelect>
    )
}
export default StockManagement
