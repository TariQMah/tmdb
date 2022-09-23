import React from "react";
import BarChartComponent from "./barChart";
import { IData } from "./types";

interface BarChartProps {
  data: IData[];
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <BarChartComponent obj={data} />
    </div>
  );
};

export default React.memo(BarChart);
