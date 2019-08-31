import * as d3 from 'd3';
import usaEducationMapStore from '../stores/UsaEducationMapStore';

interface EducationRangeScales {
  xScale: d3.ScaleLinear<number, number>;
  colorScale: d3.ScaleLinear<number, number>;
}

const legendScale = {
  width: 400,
  height: 50,
  padding: {
    horizontal: 10,
    vertical: 25,
  },
  parts: 4,
};

function createEducationRangeScales(): EducationRangeScales {
  const { width } = legendScale;
  const { minEducationLevelInt, maxEducationLevelInt } = usaEducationMapStore;
  let xScale = d3
    .scaleLinear()
    .domain([
      minEducationLevelInt,
      maxEducationLevelInt,
    ])
    .range([0, width]);

  let colorScale = d3
    .scaleQuantize()
    .domain([
      minEducationLevelInt,
      maxEducationLevelInt,
    ])
    .range([
      'rgb(229, 245, 224)', 
      'rgb(172, 201, 175)',
      'rgb(115, 157, 126)',
      'rgb(0, 68, 27)'
    ]);

  return {
    xScale,
    colorScale,
  };
}

function createEducationRangeAxes(svg, { xScale }) {
  const { height, padding: { horizontal: paddingHorizontal } } = legendScale;
  const { minEducationLevelInt, maxEducationLevelInt } = usaEducationMapStore;
  const educationStep = (maxEducationLevelInt - minEducationLevelInt) / legendScale.parts;
  const xAxisTickValues = Array
    .from({ length: legendScale.parts + 1})
    .map((_, i) => minEducationLevelInt + educationStep * i);
  let xAxis = d3
    .axisBottom(xScale)
    .ticks(1, "s")
    .tickValues(xAxisTickValues);

  svg
    .append('g')
    .attr('id', 'legend-x-axis')
    .attr('transform', `translate(${paddingHorizontal}, ${height})`)
    .call(xAxis);

  return { xAxis };
}

interface EducationRange {
  svg: any;
  scales: EducationRangeScales;
  axes: any;
}

function createEducationRange(): EducationRange {
  const {
    width,
    height,
    padding: {
      horizontal: paddingHorizontal,
      vertical: paddingVertical,
    },
    parts: legendScaleParts
  } = legendScale;

  let svg = d3
    .select('#legend')
    .append('svg')
    .attr('width', width + paddingHorizontal * 2)
    .attr('height', height + paddingVertical);

  let scales = createEducationRangeScales();
  let axes = createEducationRangeAxes(svg, scales);
  const { minEducationLevelInt, maxEducationLevelInt } = usaEducationMapStore;
  let educationLevelStep = (maxEducationLevelInt - minEducationLevelInt) / legendScaleParts;
  let educationLevelRange = Array.from({length: legendScaleParts}).map((_, i) => minEducationLevelInt + i * educationLevelStep);

  svg
    .selectAll('rect')
    .data(educationLevelRange)
    .enter()
    .append('rect')
    .attr('x', (d) => paddingHorizontal + scales.xScale(d))
    .attr('y', 0)
    .attr('width', width / legendScaleParts)
    .attr('height', legendScale.height)
    .attr('fill', (d) => scales.colorScale(d));

  return {
    svg,
    scales,
    axes,
  };
}

export default createEducationRange;