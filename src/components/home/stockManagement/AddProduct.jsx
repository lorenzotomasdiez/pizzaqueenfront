import { Button, InputLabel, NativeSelect, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import React from 'react'
import { postProduct } from '../../helpers/postProduct'

const AddProduct = ({setOpenPopup}) => {
    const {register, formState: { errors }, handleSubmit , setValue} = useForm()
    
    const onSubmit = (data, e) => {
        e.target.reset()
        postProduct(data)
        setOpenPopup(false)
    }

    const onChangeSelect = (data) => {
        setValue('productCategory', data.target.value)
    }
    setValue('productCategory', 'Pizza')
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="addproduct_form">
                <div className="addproduct_child">
                    <div className="addproduct_fields">
                        <TextField
                            {...register('productName',{ required: true})}
                            label="Nombre"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            />
                        <p className="validerror">{errors.productName && "Debe ingresar nombre"}</p>
                    </div>
                    <div className="addproduct_fields">
                        <InputLabel htmlFor="select">Categoria</InputLabel>
                        <NativeSelect id="select" onChange={onChangeSelect} >
                            <option value="Pizza">Pizza</option>
                            <option value="Bebida">Bebida</option>
                            <option value="Insumos">Insumos</option>
                            <option value="Otros">Otros</option>
                        </NativeSelect>
                    </div>
                </div>
                <div className="addproduct_child">
                    <div className="addproduct_fields">
                        <TextField
                            {...register('productPrice',{ required: true})}
                            label="Precio"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            />
                        <p className="validerror">{errors.productPrice && "Debe ingresar Precio"}</p>
                    </div>
                    <div className="addproduct_fields">
                        <TextField
                            {...register('productStock',{ required: true})}
                            label="Stock"
                            type="number"
                            defaultValue={0}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            />
                        <p className="validerror">{errors.productStock && "Debe ingresar Stock"}</p>
                    </div>
                </div>
                <div>
                    <Button type="submit" variant="contained" className="add_product_button">Agregar Producto</Button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct
