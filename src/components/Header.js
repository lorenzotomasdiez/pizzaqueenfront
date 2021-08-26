import React from 'react'
import "../styles/Header.css"
import { IconButton } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import logo from "../images/PizzaQueen6.png"
const Header = () => {
    return (
        <div className="header">
            <IconButton>
                <PersonIcon fontSize="large" className="headerIcon"/>
            </IconButton>
            <IconButton>
                <img className="headerLogo"
                    src={logo}
                    alt=""
                />
            </IconButton>
            <IconButton>
                <SettingsIcon fontSize="large" className="headerIcon" />
            </IconButton>
        </div>
    )
}

export default Header
