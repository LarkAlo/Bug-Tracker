import React, { useEffect } from "react";
import "./OneTicketPage.css";

import { useDispatch, useSelector } from "react-redux";
import * as TicketAction from "../../Redux/Actions/TicketAction";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function OneTicketPage({ match }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const colorPriority = (priority) => {
    if (priority === "High") {
      return { backgroundColor: "rgba(214, 69,65, 1" };
    } else if (priority === "Medium") {
      return { backgroundColor: "#FDDA0D" };
    } else if (priority === "Low") {
      return { backgroundColor: "#0E26B1" };
    } else if (priority === "No-Priority") {
      return { backgroundColor: "green" };
    } else {
      return { backgroundColor: "grey" };
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate.pushState("/login");
      return;
    }

    dispatch(TicketAction.getTicketById(match.params.id));
    navigate.pushState("/tickets/${match.params.id");
  }, [navigate, dispatch, match.params.id]);

  const { loadingTicket } = useSelector((state) => state.ticket);
  const { ticket } = useSelector((state) => state.ticket);
  const { message } = useSelector((state) => state.ticket);

  var content;
  if (loadingTicket === "loading" || loadingTicket === "idle") {
    content = <Loading />;
  } else if (loadingTicket === "success") {
    content = ticket.creator && (
      <div className="OneTicketPage">
        <div className="TicketCard" key={match.params._id}>
          <div className="TicketCard__left">
            <h3>{ticket.title}</h3>
            <p style={{ marginTop: "5px" }}>Opened by {ticket.creator.email}</p>
            <p>
              <span
                onClick={() =>
                  navigate.push("/organizations/${ticket.organization._id")
                }
              >
                {ticket.organization.name}
              </span>{" "}
              | Status: {ticket.status} | {ticket.date.slice(0, 10)}
            </p>
          </div>
          <div className="TicketCard__right">
            <p>{ticket.priority && ticket.priority}</p>
            <p
              className="priority-circle"
              style={colorPriority(ticket.priority)}
            ></p>
          </div>
        </div>
      </div>
    );
  } else if (loadingTicket === "fail") {
    content = (
      <div className="OneTicketPage">
        <h2>{message}</h2>
      </div>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
}
