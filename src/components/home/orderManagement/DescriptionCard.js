import { List, ListItem, ListItemText, TextField} from '@material-ui/core'
import React from 'react'

const DescriptionCard = ({data}) => {
    const getProducts = () => {
        let array = []
        let products = data.orderProducts
        let arrayProducts = products.split(", ");
        arrayProducts.forEach(element => {
            let objeto = {
                key: array.length,
                product:element
            }
            array.push(objeto)
        });
        return array
    }

    return (
        <div className="description__card">
            <div className="card_div">
                <div className="description_field">
                    <TextField /* COSTO DE DELIVERY */
                        value={data.orderDeliveryCost}
                        size="small" 
                        label="Precio Delivery"
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
                <div className="description_field">
                    <TextField /* HORA DE PEDIDO */
                        value={data.orderTimeDelivery}
                        size="small" 
                        label="Hora Pedido"
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
                <div className="description_field">
                    <TextField 
                        value={data.orderComment} 
                        label="Comentario"
                        variant="outlined"
                        disabled
                    />
                </div>
            </div>
            <div className="divider"></div>
            <div className="card_div">
                <div className="card_productsdiv" /* PRODUCTO PEDIDO */>
                    <h3>Productos</h3>
                    <List component="nav">
                        {
                            getProducts()?.map(e=>(
                                <ListItem button key={e.key}>
                                    <ListItemText primary={e.product} className="productsdiv_item" />
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </div>
        </div>
    )
}

export default DescriptionCard
