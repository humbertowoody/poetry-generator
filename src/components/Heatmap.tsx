// @ts-nocheck
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = ({ matrix }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 50, left: 50 };

    // Get the width of the parent container
    const width =
      svgRef.current.parentElement.clientWidth - margin.left - margin.right;

    const height = 600 - margin.top - margin.bottom;

    // Clear the SVG
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const states = Object.keys(matrix);
    const n = states.length;

    const x = d3.scaleBand().range([0, width]).domain(states).padding(0.01);
    const y = d3.scaleBand().range([height, 0]).domain(states).padding(0.01);
    const color = d3.scaleLinear().range(["white", "blue"]).domain([0, 1]);

    // Add X axis
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Rotate X axis ticks
    xAxis
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y));

    const data = [];
    states.forEach((from, i) => {
      states.forEach((to, j) => {
        data.push({ from, to, value: matrix[from][to] || 0 });
      });
    });

    svg
      .selectAll()
      .data(data, (d) => `${d.from}:${d.to}`)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.to))
      .attr("y", (d) => y(d.from))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => color(d.value))
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8);

    svg
      .selectAll()
      .data(data, (d) => `${d.from}:${d.to}`)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.to) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.from) + y.bandwidth() / 2)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text((d) => d.value);
  }, [matrix]);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;
