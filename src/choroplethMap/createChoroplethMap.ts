import * as d3 from 'd3';

import usaEducationMapStore from '../stores/UsaEducationMapStore';

import createLegend from './createLegend'

const usaEducationMapSizes = {
  width: 1200,
  height: 700,
};

function createChoroplethMap() {
  const { countiesEducation, usaGeopath: { countiesGeopath } } = usaEducationMapStore;
  // init svg
  const svg = d3
    .select('#usa-education-map')
    .append('svg')
    .attr('width', usaEducationMapSizes.width)
    .attr('height', usaEducationMapSizes.height);
  
  const { scales: { colorScale }} = createLegend();

  // create choropleth map
  const COUNTIES_SHAPE = 'path';
  svg
    .selectAll(COUNTIES_SHAPE)
    .data(countiesGeopath.features)
    .enter()
    .append(COUNTIES_SHAPE)
    .attr('d', d3.geoPath())
    .attr('fill', (d) => {
      const currentCounty = usaEducationMapStore.countiesEducation.find((countryEducation) => countryEducation.fips === d.id)
      return colorScale(currentCounty.bachelorsOrHigher);
    })
    .attr('stroke', 'black')
    .attr('stroke-width', 0.2)
    .classed('county', true)
    .attr('data-fips', d => d.id)
    .attr('data-education', (d) => {
      const currentCounty = countiesEducation.find(countyEducation => countyEducation.fips === d.id);
      return currentCounty.bachelorsOrHigher;
    })
    .attr('data-area-name', (d) => {
      const currentCounty = countiesEducation.find(countyEducation => countyEducation.fips === d.id);
      return currentCounty.area_name;
    })
    .attr('data-state', (d) => {
      const currentCounty = countiesEducation.find(countyEducation => countyEducation.fips === d.id);
      return currentCounty.state;
    });
}

export default createChoroplethMap;