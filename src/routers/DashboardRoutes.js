import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import History from '../components/history/History'
import Home from '../components/home/Home'
import Messages from '../components/messages/Messages'
import List from '../components/list/List'
import Navbar from '../components/ui/Navbar'

const DashboardRoutes = () => {
    return (
        <>
            <Navbar/>
            <div className="m-2">
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/history" component={History}/>
                    <Route exact path="/messages" component={Messages}/>
                    <Route exact path="/list" component={List}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>   
        </>
    )
}

export default DashboardRoutes
