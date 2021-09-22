import { forwardRef } from 'react';
import { IconButton, NativeSelect } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import "./list.css"
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const List = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState("")
    const dataprueba = [
        {id:1, name:"Nombre prueba", category:"Categoria Prueba"},
        {id:2, name:"Nombre prueba2", category:"Categoria Prueba2"},
        {id:3, name:"Nombre prueba3", category:"Categoria Prueba3"},
        {id:4, name:"Nombre prueba3", category:"Categoria Prueba3"},
        {id:5, name:"Nombre prueba3", category:"Categoria Prueba3"},
        {id:6, name:"Nombre prueba3", category:"Categoria Prueba3"},
        {id:7, name:"Nombre prueba3", category:"Categoria Prueba3"},
        {id:8, name:"Nombre prueba3", category:"Categoria Prueba3"},
    ]
    const columns = [
        {title:"ID", field:'id'},
        {title:"Nombre", field:'name'},
        {title:"Categoria", field:'category'},
        {title:"Precio", field:'price'},
        {title:"Stock", field:'stock'},
    ]
    useEffect(() => {
        alert(filter)
    }, [filter])
    return (
        <div className="material_table">
            <MaterialTable className="material_table_root"
                icons={tableIcons}
                title={<ListSelect setFilter={setFilter}/>}
                data={dataprueba}
                columns={columns}
                actions={[
                    {
                        icon:()=><Edit />,
                        tooltip:'Editar item',
                        onClick:(event, rowData) => alert('voy a editar a: ' + rowData.name)
                    },
                    {
                        icon:()=><Delete />,
                        tooltip:'Borrar item',
                        onClick:(event, rowData) => alert('voy a borrar a: ' + rowData.name)
                    }
                ]}
                options={
                    {
                        headerStyle:{
                            backgroundColor:"#ce5f4a"
                        },
                        actionsColumnIndex:-1,
                        
                    }
                }
                
            />
        </div>
    )
}


const ListSelect = ({setFilter}) => {
    const handleFilter = (e) => {
        setFilter(e.target.value)
    }
    return (
        <NativeSelect onChange={handleFilter}>
            <option value="">Todo</option>
            <option value="Pizza">Pizzas</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Insumos">Insumos</option>
        </NativeSelect>
    )
}
export default List
