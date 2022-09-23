import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles.scss";
const BarChartComponent = ({ obj }: any) => {
  const colors = [
    "#B20D0A",
    "#8D6F09",
    "#419B99",
    "#E7757C",
    "#8BDAFE",
    "#FE8777",
    "#D0F2E0",
    "#FA9640",
    "#E5CC6F",
    "#7E65A6",
  ];
  const svgRef = useRef<any>();
  const container = useRef<any>();

  const [width, setWidth] = useState(400);

  const [height, setHeight] = useState(100);

  const getSvgContainerSize = () => {
    const newWidth = container.current.clientWidth - 150;
    setWidth(newWidth);
    const newHeight = container.current.clientHeight;
    setHeight(newHeight);
  };

  useEffect(() => {
    getSvgContainerSize();
    window.addEventListener("resize", getSvgContainerSize);
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  useEffect(() => {
    const w = width;
    const h = 300;
    var margin = { top: 10, right: 20, bottom: 50, left: 80 };

    const xScale = d3
      .scaleBand()
      .domain(obj.map((val: any, i: any) => val.label))
      .range([0, w])
      .padding(0.5);

    const svg = d3
      .select(svgRef.current)
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .classed("svg-container", true)

      .style("overflow", "visible")
      .style("margin-top", "75px")
      .style("margin-left", `${margin.left}px`);

    const everything = svg.selectAll("*");
    everything.remove();
    const yScale: any = d3
      .scaleLinear()
      .domain([0, d3.max(obj, (d: any) => d.value) as any])
      .range([h, 0]);

    const xAxis: any = d3.axisBottom(xScale).ticks([obj.length]);

    const yAxis: any = d3.axisLeft(yScale).ticks([obj.length]);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${h})`)
      .style("font-size", xScale.bandwidth() + "%");

    svg.append("g").call(yAxis);

    svg
      .selectAll(".bar")
      .data(obj)
      .join("rect")
      .attr("fill", function (d, i, j) {
        return colors[i];
      })

      .attr("width", xScale.bandwidth())
      .attr("y", yScale(0) as any)
      .attr("height", 0)
      .attr("x", (v: any, i: any) => xScale(v.label) as any)

      .transition()
      .duration(500)

      .attr("y", (v: any, i: any) => yScale(v.value) as any)
      .attr("height", (val: any) => h - yScale(val.value))
      .attr("width", xScale.bandwidth());
  }, [obj, colors, width]);

  return (
    <div ref={container} className="graphChart">
      <svg ref={svgRef} className="graphChart"></svg>
    </div>
  );
};

export default BarChartComponent;
