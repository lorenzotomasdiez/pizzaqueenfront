import React from 'react'
//import ItemsManagement from './home/ItemsManagement'
//import StockManagement from './home/StockManagement'
import OrderManagement from './home/OrderManagement'
//import Summary from './home/Summary'
import '../styles/Home.css' 
const Home = () => {
    return (
        <div className="home">
            <OrderManagement />
        </div>
    )
}

export default Home
