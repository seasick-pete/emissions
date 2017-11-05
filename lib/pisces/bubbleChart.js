import * as d3 from 'd3';
import { tsvParse } from 'd3-dsv';
import chartFactory, {colorScale as color} from '../common/index'; 

/**
 * Data munging routine
 * @param {*} data the data to be munged
 */
const getDataByYearTypeSize = function(data) {
  const nested = d3.nest()
    .key((d) => d.year)
    .key((d) => d.type_bin)
    .key((d) => d.size_bin)
    .rollup((d) => {
      return {
        sog: d3.mean(d, (v) => v.mean_sog),
        co2: d3.sum(d, (v) => v.total_co2_million_tonnes),
      };
    })
    .map(data);

  const outData = [];
  nested.keys().forEach((year) => {
    nested.get(year).keys().forEach((typeBin) => {
      nested.get(year).get(typeBin).keys().forEach((sizeBin) => {
        outData.push({
          year: year,
          typeBin: typeBin,
          sizeBin: sizeBin,
          co2: nested.get(year).get(typeBin).get(sizeBin).co2,
          sog: nested.get(year).get(typeBin).get(sizeBin).sog,
        });
      });
    });
  });
  return outData;
};

export const bubbleChart = chartFactory({
  margin: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
  },
  padding: {
      left: 10,
      right: 10,
      top: 50,
      bottom: 50,
  },
  transitionSpeed: 500,
});

bubbleChart.loadData = async function loadData(uri) {
  if (uri.match(/.csv$/)) {
      this.data = d3.tsvParse(await (await fetch(uri)).text());
  } else if (uri.match(/.json$/)) {
      this.data = await (await fetch(uri)).json();
  }
  return this.data;
};

bubbleChart.init = function initChart(chartType, dataUri, ...args) {

  this.loadData(dataUri).then((data) => this[chartType].call(this, data, ...args));

  this.innerHeight = this.height - 
    this.margin.top -
    this.margin.bottom -
    this.padding.top -
    this.padding.bottom;

  this.innerWidth = this.width -
    this.margin.left -
    this.margin.right -
    this.padding.left -
    this.padding.right;
};

bubbleChart.nextSequence = function() {
  this.sequence.push(
    this.sequence.shift()
  );
};

bubbleChart.scatterByYearTypeSize = function ScatterByYearTypeSize(_data) {
  this.data = getDataByYearTypeSize(_data);
  
  this.sequence = d3.map(this.data, d => d.year).keys();

  const chart = this.container;

  this.x = d3.scaleLinear()
    .range([0, this.innerWidth])
    .domain(d3.extent(this.data, d => d.sog));

  this.y = d3.scaleLinear()
    .range([this.innerHeight, 0])
    .domain(d3.extent(this.data, d => d.co2));
  
  const xAxis = d3.axisBottom().scale(this.x);

  const yAxis = d3.axisLeft().scale(this.y);

  const xAxisElement = chart.append('g')
      .classed('axis x', true)
      .attr('transform', `translate(0, ${this.innerHeight})`)
      .call(xAxis);

  const yAxisElement = chart.append('g')
      .classed('axis y', true)
      .call(yAxis);

  const miniData = this.data.filter(
    (d) => d.year === this.sequence[0]);

  this.container.selectAll(".dot")
    .data(miniData)
  .enter().append("circle")
    .attr("r", (d) => d.sizeBin * 2)
    .attr("cx", (d) => this.x(d.sog))
    .attr("cy", (d) => this.y(d.co2))
    .attr("fill", (d) => color(d.typeBin))
    .attr("fill-opacity", 0.5)
    .classed('dot', true);

};

bubbleChart.update = function update(_data) {
  const data = _data || this.data;
  const TRANSITION_SPEED = this.transitionSpeed;
  

    // move this bit to a update function
  const bars = this.container.selectAll('.dot')
    .data(data)
    .transition()
    .duration(TRANSITION_SPEED)
    .attr("cx", (d) => this.x(d.sog))
    .attr("cy", (d) => this.y(d.co2));
};

export default bubbleChart;

