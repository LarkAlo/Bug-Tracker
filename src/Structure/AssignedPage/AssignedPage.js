import React, { useEffect, useState } from "react";
import "./AssignedPage.css";

import TicketCardList from "../../Features/TicketCardList/TicketCardList";

import { useDispatch, useSelector } from "react-redux";
import * as TicketAction from "../../Redux/Actions/TicketAction";

import { useNavigate } from "react-router-dom";
import SearchFilter from "../../Features/SearchFilter/SearchFilter";

export default function AssignedPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [priorityActive, setPriorityActive] = useState("All");

  const clickPriority = (input) => {
    setPriorityActive(input);
  };

  useEffect(() => {
    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("bttn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("activePriority");
        current[0].className = current[0].className.replace(
          "activePriority",
          ""
        );
        this.className += " activePriority";
      });
    }

    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate.push("/login");
      return;
    }

    try {
      const email = window.localStorage.getItem("useremail");
      dispatch(TicketAction.getAssignedTickets(email));
      navigate.push("/user/assigned");
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
    }
  }, [dispatch, navigate]);

  const { assignedTickets } = useSelector((state) => state.ticket);

  return (
    <div className="assignedPage">
      <h1 style={{ marginBottom: "20px" }}> Tickets Assigned to Me</h1>
      <SearchFilter />
      <div className="dashboardCard">
        <div className="priority-navigator-container" id="myDIV">
          <div
            className="bttn activePriority"
            onClick={() => clickPriority("All")}
          >
            <h4>All</h4>
          </div>
          <div className="bttn" onClick={() => clickPriority("High")}>
            <h4>High</h4>
          </div>
          <div className="bttn" onClick={() => clickPriority("Medium")}>
            <h4>Medium</h4>
          </div>
          <div className="bttn" onClick={() => clickPriority("Low")}>
            <h4>Low</h4>
          </div>
          <div
            className="bttn"
            onClick={() => clickPriority("No-Priority")}
          ></div>
          <h4>No Priority</h4>
        </div>
        <div className="bttn" onClick={() => clickPriority("Done")}>
          <h4>Done</h4>
        </div>
      </div>

      <TicketCardList
        tickers={assignedTickets}
        priorityActive={priorityActive}
      />
    </div>
  );
}
