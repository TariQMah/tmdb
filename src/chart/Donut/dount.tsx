import React, { useEffect, useRef } from "react";
import drawChart from "../Donut/drawChart";

const DonutChart = ({ data }: any) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      drawChart(ref.current, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, data[0]?.value]);

  return (
    <div>
      <div className="graph" ref={ref} />
    </div>
  );
};

export default React.memo(DonutChart);
