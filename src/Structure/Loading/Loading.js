import React from "react";
import ".Loading.css";
import larkicon from "./lark.png";

export default function Loading() {
  return (
    <div className="LoadingPage">
      <div className="icon-container">
        <img src={larkicon} />
      </div>
    </div>
  );
}
