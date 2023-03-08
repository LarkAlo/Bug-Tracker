import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Sidebar />
          </Route>
        </Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/user/tickets">
          <TicketsPage />
        </Route>
        <Route exact path="/user/assigned">
          <AssignedPage />
        </Route>
        <Route exact path="/organizations">
          <OrganizationsPage />
        </Route>
        <Route exact path="/tickets/:id" />
      </Router>
    </div>
  );
}
