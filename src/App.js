import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Structure/Login/Login";
import SignUp from "./Structure/SignUp/SignUp";
import Dashboard from "./Structure/Dashboard/Dashboard";
import TicketsPage from "./Structure/TicketPage/TicketPage";
import AssignedPage from "./Structure/AssignedPage/AssignedPage";
import OrganizationsPage from "./Structure/OrganizationsPage/OrganizationsPage";
import OneTicketPage from "./Structure/OneTicketPage/OneTicketPage";
import Sidebar from "./Features/SideBar/SideBar";

export default function App() {
  return (
    <div>
      <Router>
        <Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Sidebar />
          </Route>
        </Route>
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
        <Route exact path="/tickets/:id" component={OneTicketPage} />
      </Router>
    </div>
  );
}
