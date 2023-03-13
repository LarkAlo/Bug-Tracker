import React from "react";
import "../Loading/Loading.css";
import larkicon from "../../lark.png";

export default function Loading() {
  return (
    <div className="LoadingPage">
      <div className="icon-container">
        <img src={larkicon} alt="icon" />
      </div>
    </div>
  );
}
