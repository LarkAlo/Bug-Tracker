import React from "react";
import "./AssignedPage.css";

export default function AssignedPage() {
  return (
    <div className="assignedPage">
      <h1 style={{ marginBottom: "20px" }}> Tickets Assigned to Me</h1>
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
