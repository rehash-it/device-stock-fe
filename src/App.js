import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={CustomerLayout} />
            <PublicRoute path="/admin/orgservice/:id" component= {OrganizationService}/>
            <PublicRoute path="/admin/organizations" component={Organization} />
        </Switch>
      </Router>
  );
}

export default App;
