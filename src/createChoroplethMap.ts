import * as d3 from 'd3';

import { ICountyEducation, UsaGeopath } from './types';

const CHART_WIDTH = 1200;
const CHART_HEIGHT = 700;

function createChoroplethMap(countiesEducation: Array<ICountyEducation>, { countiesGeopath, statesGeopath, nationGeopath }: UsaGeopath) {
  const svg = d3
    .select('#usa-education-map')
    .append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

  const COUNTIES_SHAPE = 'path';
  const countiesD3 = svg
    .selectAll(COUNTIES_SHAPE)
    .data(countiesGeopath.features)
    .enter()
    .append(COUNTIES_SHAPE)
    .attr('d', d3.geoPath())
    .attr('fill', 'green')
    .attr('stroke', 'black')
    .attr('stroke-width', 0.25);
}

export default createChoroplethMap;