import React from "react";
import "./logo.css";
import larkicon from "../../lark.png";

export default function Logo() {
  return (
    <div className="logoFeature">
      <div className="logoFeatureContainer">
        <img src={larkicon} alt="logo" />
      </div>
    </div>
  );
}
