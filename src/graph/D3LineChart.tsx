import { useEffect } from "react";
import {
  select,
  scaleLinear,
  min,
  max,
  scaleTime,
  line,
  axisLeft,
  axisBottom,
} from "d3";
import convertDataToArray, { ReturnData } from "../utils/convertDataToArray";
import { TimeSeries } from "../interfaces/TimeSeries.interface";

import styles from "./d3-line-chart.module.css";

interface Props {
  data: TimeSeries;
  currency: string;
  svgWidth: number;
  svgHeight: number;
}

export const D3LineChart = ({ data, currency, svgWidth, svgHeight }: Props) => {
  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const chartData = convertDataToArray(data, currency);
    const svg = select("#svg");

    svg.selectAll("*").remove();

    const xValue = (d: ReturnData) => d.date;
    const xAxisLabel = "Time";

    const yValue = (d: ReturnData) => d.value;
    const yAxisLabel = "Exchange Rate Against Euro";

    svg.attr("width", svgWidth);
    svg.attr("height", svgHeight);
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const minDate = min(chartData.map((d) => d.date));
    const maxDate = max(chartData.map((d) => d.date));

    const maxValue = max(chartData.map((d) => d.value));

    if (
      minDate === undefined ||
      maxDate === undefined ||
      maxValue === undefined
    ) {
      return;
    }

    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
      .domain([0, maxValue])
      .range([innerHeight, 0])
      .nice();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);
    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.append("g").call(yAxis).attr("class", styles.yAxisG);

    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", styles.axisLabel)
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("class", styles.xAxisG)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.selectAll(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", styles.axisLabel)
      .attr("y", 80)
      .attr("x", innerWidth / 2)
      .text(xAxisLabel);

    const lineGenerator = line<ReturnData>()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)));

    const path = lineGenerator(chartData);

    if (!path) return;

    g.append("path").attr("class", styles.linePath).attr("d", path);
  }, [data, currency, svgWidth, svgHeight]);

  return <svg id="svg"></svg>;
};
