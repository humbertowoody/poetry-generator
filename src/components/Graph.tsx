// @ts-nocheck
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Graph = ({ data }: { data: any }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const height = 600;

    // Get the width of the parent container
    const width = svgRef?.current?.parentElement?.clientWidth || 200;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("height", height);

    // Clear the SVG
    svg.selectAll("*").remove();

    const nodes = Array.from(
      new Set([
        ...Object.keys(data),
        ...Object.values(data).flatMap((d: any) => Object.keys(d)),
      ]),
    ).map((id) => ({ id }));

    const links = Object.keys(data).flatMap((source) =>
      Object.entries(data[source]).map(([target, value]) => ({
        source,
        target,
        value,
      })),
    );

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(50),
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value))
      .attr("stroke", "#999");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    // Change the color of the first and last nodes.
    node
      .filter((d, i) => i === 0 || i === nodes.length - 1)
      .attr("fill", "red");

    const text = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text((d) => d.id || "(end of input poem)");

    simulation.nodes(nodes).on("tick", ticked);

    simulation.force("link").links(links);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      text.attr("x", (d) => d.x).attr("y", (d) => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Graph;
