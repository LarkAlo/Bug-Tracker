import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import DashboardCard from "../../Features/DashboardCard/DashboardCard";

import { useNavigate } from "react-router-dom";

import * as TicketAction from "../../Redux/Actions/TicketAction";
import * as UserAction from "../../Redux/Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

var Buffer = require("buffer/").Buffer;

const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buff = new Buffer(base64, "base64");
  const playloadinit = buff.toString("ascii");
  const payload = JSON.parse(playloadinit);
  return payload;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate.push("/login");
      return;
    }

    const decoded = decodeToken(token);
    setName(decoded.name);
    setEmail(decoded.email);
    setId(decoded._id);
    try {
      window.localStorage.setItem("username", name);
      window.localStorage.setItem("useremail", email);
      window.localStorage.setItem("userid", id);
    } catch (error) {
      console.log(error);
    }
    navigate.push("/");
    dispatch(TicketAction.getAssignedTickets(email));
    dispatch(TicketAction.getUserTickets(email));
    dispatch(UserAction.getUserData(id));
    navigate.push("/");
  }, [dispatch, email, navigate, id, name]);

  const { assignedTickets } = useSelector((state) => state.ticket);
  const { userTickets } = useSelector((state) => state.ticekt);
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="DashboardPage">
      <div>
        <h4> Hello, {name} !</h4>
        <h1 style={{ marginBottom: "0px" }}>
          You've got{" "}
          {assignedTickets.result ? (
            <span>
              {
                assignedTickets.results.filter(
                  (ticks) => ticks.priority !== "Done"
                ).lenght
              }
            </span>
          ) : (
            <span>0 task</span>
          )}
          remaining.
        </h1>
      </div>
      <DashboardCard
        assignedTickets={assignedTickets}
        userTickets={userTickets}
        userData={userData}
      />
    </div>
  );
}
