import * as d3 from "d3";

const DrawChart = (element: any, data: any) => {
  const colors = ["#37D400"];
  const boxSize = 200;

  d3.select(element).select("svg").remove(); // Remove the old svg

  // Create new svg
  let svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")

    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

  svg
    .append("text")
    .style("fill", "#fff")
    .style("font-size", "50px")
    .style("transform", "translateY(15px)")
    .attr("class", "total")
    .attr("text-anchor", "middle")
    .text(Math.round(data[0]?.value) + "%");

  const arcGenerator: any = d3.arc().innerRadius(100).outerRadius(90);

  const pieGenerator = d3.pie().value((d: any) => d.value);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();
  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", (d: any, i: any) => colors[i % data.length])
    .transition()
    .duration(700)
    .attrTween("d", function (d: any) {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return function (t: any) {
        d.endAngle = i(t);
        return arcGenerator(d);
      };
    });
};

export default DrawChart;
