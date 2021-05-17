import { BrowserRouter as Router, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import { Login } from "./containers/login/login";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

// import "./App.less";
import Device from "./containers/devices/device";
import AddDevice from "./containers/devices/adddevice";
import Layout, { Content } from "antd/lib/layout/layout";

function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <Content>
            <PublicRoute exact path="/" component={Login} />
            <PrivateRoute path="/devices" component={Device} />
            <PrivateRoute path="/addnewdevice" component={AddDevice} />
          </Content>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
