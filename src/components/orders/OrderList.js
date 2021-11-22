import { IconButton } from '@material-ui/core'
import { Delete, Done, Edit } from '@material-ui/icons'
import React from 'react'

const OrderList = ({object}) => {
    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Entrega</th>
                        <th scope="col">Domicilio</th>
                        <th scope="col">Articulos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" className="col-1">{object.id}</th>
                        <td className="col-2">{object.name}</td>
                        <td className="col-1">{object.time}</td>
                        <td className="col-2">{object.address}</td>
                        <td className="col-4">{object.products}</td>
                        <td className="col-2">
                            <IconButton><Delete /></IconButton>
                            <IconButton><Edit /></IconButton>
                            <IconButton><Done /></IconButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderList
