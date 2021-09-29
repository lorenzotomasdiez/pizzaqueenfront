import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import OrderManagement from "./components/home/orderManagement/OrderManagement";
import StockManagement from "./components/home/stockManagement/StockManagement";
import SummaryManagement from "./components/home/summaryManagement/SummaryManagement";
import HistoryManagement from "./components/home/historyManagement/HistoryManagement";
function App() {
  return (
      <Router className="app">
        <Header />
        <Switch>
          <Route path="/" exact><Redirect to="/home"/></Route>
          <Route path="/home" exact component={Home} />
          <Route path="/ordermanagement" component={OrderManagement} exact/>
          <Route path="/stock" exact component={StockManagement} />
          <Route path="/summary" exact component={SummaryManagement} />
          <Route path="/history" exact component={HistoryManagement} />
        </Switch>
      </Router>
  );
}
/* PRUEBA */
export default App;
