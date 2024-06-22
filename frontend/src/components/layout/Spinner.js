import React, { Fragment } from "react";
import spinner from "./spinner-white.svg";

export default () => (
  <Fragment>
    <img
      src={spinner}
      className="animate-spin"
      style={{ width: "100px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
