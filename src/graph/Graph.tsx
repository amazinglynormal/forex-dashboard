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
import { Header } from "../components/Header";
import useAxios from "../hooks/useAxios";
import styles from "./graph.module.css";
import { TimeSeries } from "../interfaces/TimeSeries.interface";
import { BASE_URL } from "../app/constants";
import { useEffect } from "react";
import convertDataToArray, { ReturnData } from "../utils/convertDataToArray";

export const Graph = () => {
  const { status, data } = useAxios<TimeSeries>(
    `${BASE_URL}/2020-01-01..?to=USD`
  );

  useEffect(() => {
    if (status !== "fetched" || !data) {
      return;
    }

    const createLineChart = () => {
      const chartData = convertDataToArray(data, "USD");

      const svg = select("svg").style("border", "1px solid gray");

      const xValue = (d: ReturnData) => d.date;
      const xAxisLabel = "Time";

      const yValue = (d: ReturnData) => d.value;
      const yAxisLabel = "Exchange Rate";

      const width = +svg.attr("width");
      const height = +svg.attr("height");
      const margin = { top: 20, right: 20, bottom: 100, left: 100 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

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

      const yAxisG = g.append("g").call(yAxis);
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
        .attr("transform", `translate(0,${innerHeight})`);

      xAxisG.select(".domain").remove();

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
    };

    createLineChart();
  }, [data, status]);

  return (
    <article className={styles.graph}>
      <Header headingText="Exchange Rates Over Time" headingSize="h2" />
      <svg width="900" height="900"></svg>
    </article>
  );
};
