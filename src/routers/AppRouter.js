import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from '../components/login/Login'
import OrdersRoutes from './components/OrdersRoutes'
import DashboardRoutes from './DashboardRoutes'
const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/orders" component={OrdersRoutes} />
                    <Route path="/" component={DashboardRoutes}  />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
