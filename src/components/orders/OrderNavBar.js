import React from 'react'
import {NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-collapse">
                <div className="navbar-nav col-6 text-uppercase">
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link m-auto"  
                        exact
                        to="/orders/pendings"
                    >
                        Pendientes
                    </NavLink>
                </div>
                |
                <div className="navbar-nav col-6 text-uppercase">
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link m-auto" 
                        exact
                        to="/orders/done"
                    >
                        Entregados
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
