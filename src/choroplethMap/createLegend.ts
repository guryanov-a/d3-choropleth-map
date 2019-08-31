import * as d3 from 'd3';
import usaEducationMapStore from '../stores/UsaEducationMapStore';

const scaleSizes = {
  width: 400,
  height: 110,
  padding: 60,
  parts: 4,
};

interface EducationRangeScales {
  xScale: d3.ScaleLinear<number, number>;
  colorScale: d3.ScaleLinear<number, number>;
}

function createEducationRangeScales(): EducationRangeScales {
  const { width } = scaleSizes;
  const { countiesEducation } = usaEducationMapStore;
  let minEducationLevel = d3.min(countiesEducation, (d) => d.bachelorsOrHigher);
  let maxEducationLevel = d3.max(countiesEducation, (d) => d.bachelorsOrHigher);
  let xScale = d3
    .scaleLinear()
    .domain([
      minEducationLevel,
      maxEducationLevel,
    ])
    .range([0, width]);

  let colorScale = d3
    .scaleQuantize()
    .domain([
      minEducationLevel,
      maxEducationLevel,
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
  const { height, padding } = scaleSizes;
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
  scales: EducationRangeScales;
  axes: any;
}

function createEducationRange(): EducationRange {
  let svg = d3
    .select('#legend')
    .append('svg')
    .attr('width', scaleSizes.width)
    .attr('height', scaleSizes.height);

  let scales = createEducationRangeScales();
  let axes = createEducationRangeAxes(svg, scales);

  let minEducationLevel = d3.min(usaEducationMapStore.countiesEducation, (d) => d.bachelorsOrHigher);
  let maxEducationLevel = d3.max(usaEducationMapStore.countiesEducation, (d) => d.bachelorsOrHigher);
  let educationLevelStep = (maxEducationLevel - minEducationLevel) / scaleSizes.parts;
  let educationLevelRange = Array.from({length: scaleSizes.parts}).map((_, i) => minEducationLevel + i * educationLevelStep);

  svg
    .selectAll('rect')
    .data(educationLevelRange)
    .enter()
    .append('rect')
    .attr('x', (d) => scales.xScale(d))
    .attr('y', 0)
    .attr('width', scaleSizes.width / scaleSizes.parts)
    .attr('height', scaleSizes.height - scaleSizes.padding)
    .attr('fill', (d) => scales.colorScale(d));

  return {
    svg,
    scales,
    axes,
  };
}

export default createEducationRange;