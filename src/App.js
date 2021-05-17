import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Login } from "./containers/login/login";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import "./App.less";
import Device from "./containers/devices/device";
import AddDevice from "./containers/devices/adddevice";

function App() {
  return (
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PrivateRoute path = "/devices" component = {Device}/>
          <PrivateRoute path = "/addnewdevice" component = {AddDevice}/>
        </Switch>
      </Router>
  );
}

export default App;
