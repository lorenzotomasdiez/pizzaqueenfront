import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React from 'react'
import pizzas from '../../jsons/pizza.json'
const OrderAdd = ({open, onClose}) => {
    const [items, setItems] = React.useState([])
    const [state, setState] = React.useState('')
    const handleChange = (e) => {
        setState(e.target.value)
        console.log("STATE :" + e.target.value)
        setItems([...items, {id: e.target.value, cantidad:1}])
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Pedido</DialogTitle>
            <DialogContent >
                <Box style={{display: 'flex'}}>
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="address"
                            label="Domicilio"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Producto"
                                onChange={handleChange}
                                value={state}
                            >
                                {pizzas?.map((e)=><MenuItem key={e.id} value={e.id}>{e.productName}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className="ml-3">
                        <TextField 
                            margin="dense"
                            id="deliveryTime"
                            label="Entrega"
                            type="time"
                            fullWidth
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            margin="dense"
                            id="total"
                            label="Total"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </Box>
                </Box>
                <Box>
                    {items?.map((e)=>(
                        <Box style={{display: 'flex', alignItems: 'center', textAlign: 'center'}} key={e.id}>
                            <Typography variant="h6" component="h6">{e.id}</Typography>
                            <TextField type="number" label="Cantidad" value={e.cantidad} style={{width: '10'}}/>
                        </Box> 
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderAdd
