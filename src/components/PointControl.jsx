import React from "react";
import { useState } from "react";
import NewPoint from "./NewPoint";
const PointControl = () => {
  const [arrNewPointComponent, setArrNewPointComponent] = useState([
    <NewPoint />,
  ]);
  return <div>{arrNewPointComponent.map((u) => u)}</div>;
};

export default PointControl;
