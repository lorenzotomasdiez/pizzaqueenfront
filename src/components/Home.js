import React from 'react'
import '../styles/Home.css' 
import { Link } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'
import BarChart from './home/main/BarChart'
const Home = () => {
    return (
        <div className="home">
            <Grid container spacing={0} className="root">
                    <Grid item xs={3} className="grid-wrap">
                        <Link to="/ordermanagement" className="link-buttons">
                            <Paper className="paper">Pedidos</Paper>
                        </Link>
                    </Grid>
                <Grid item xs={3} className="grid-wrap" >
                    <Link to="/stock" className="link-buttons">
                        <Paper className="paper">Stock</Paper>
                    </Link>
                </Grid>
                <Grid item xs={3} className="grid-wrap" >
                    <Link to="/summary" className="link-buttons">
                        <Paper className="paper">Resumen</Paper>
                    </Link>
                </Grid>
                <Grid item xs={3} className="grid-wrap" >
                    <Link to="/history" className="link-buttons">
                        <Paper className="paper">Historial</Paper>
                    </Link>
                </Grid>
            </Grid>
            <Grid container spacing={1} className="root">
                <Grid item xs={12} className="grid-wrap">
                    <Paper className="paper-status">
                        <BarChart />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
