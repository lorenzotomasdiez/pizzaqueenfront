import React, { forwardRef } from 'react';
import {Box, CircularProgress} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import MaterialTable from 'material-table'
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
import { useFetchProducts } from '../../hooks/useFetchProducts';
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
const columns = [
    {title:"ID", field:'idProduct'},
    {title:"Nombre", field:'productName'},
    {title:"Categoria", field:'productCategory'},
    {title:"Precio", field:'productPrice'},
    {title:"Stock", field:'productStock'},
]
const List = ({category}) => {
    const {data, loading} = useFetchProducts(category)
    return (
        <div className="material_table">
            {loading
                ?   
                    <Box className="loading"><CircularProgress /></Box>
                : 
                    <MaterialTable className="material_table_root"
                        icons={tableIcons}
                        title="Productos"
                        data={data}
                        columns={columns}
                        actions={[
                            {
                                icon:()=><Edit />,
                                tooltip:'Editar item',
                                onClick:(event, rowData) => alert('voy a editar a: ' + rowData.productName)
                            },
                            {
                                icon:()=><Delete />,
                                tooltip:'Borrar item',      
                                onClick:(event, rowData) => alert('voy a borrar a: ' + rowData.productName)
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
            }
        </div>
    )
}
export default List
