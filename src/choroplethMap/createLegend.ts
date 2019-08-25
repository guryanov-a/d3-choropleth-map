import * as d3 from 'd3';

import usaEducationMapStore from '../stores/UsaEducationMapStore';

const sizes = {
  width: 400,
  height: 110,
  padding: 60,
};

function createEducationRangeScales() {
  const { countiesEducation } = usaEducationMapStore;
  const { width, padding } = sizes;
  const minVariance = 0;
  const maxVariance = 100;
  let xScale = d3
    .scaleLinear()
    .domain([
      minVariance,
      maxVariance,
    ])
    .range([padding, width - padding]);

  let colorScale = d3
    .scaleLinear()
    .domain([
      minVariance,
      maxVariance,
    ])
    .range(['rgb(229, 245, 224)', 'rgb(0, 68, 27)']);

  return {
    xScale,
    colorScale,
  };
}

function createEducationRangeAxes(svg, { xScale }) {
  const { height, padding } = sizes;
  let xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  svg
    .append('g')
    .attr('id', 'legend-x-axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  return { xAxis };
}

interface EducationRange {
  svg: any;
  scales: any;
  axes: any;
}

function createEducationRange(): EducationRange {
  const { countiesEducation } = usaEducationMapStore;

  let svg = d3
    .select('#legend')
    .append('svg')
    .attr('width', sizes.width)
    .attr('height', sizes.height);

  let scales = createEducationRangeScales();
  let axes = createEducationRangeAxes(svg, scales);

  let minEducationLevel = 0;
  let maxEducationLevel = 100;
  let educationLevelStep = (maxEducationLevel - minEducationLevel) / sizes.width;
  let educationLevelRange = Array.from({length: sizes.width}).map((_, i) => minEducationLevel + i * educationLevelStep);

  svg
    .selectAll('rect')
    .data(educationLevelRange)
    .enter()
    .append('rect')
    .attr('x', (d) => scales.xScale(d))
    .attr('y', 0)
    .attr('width', 5)
    .attr('height', sizes.height - sizes.padding)
    .attr('fill', (d) => scales.colorScale(d));

  return {
    svg,
    scales,
    axes,
  };
}

export default createEducationRange;