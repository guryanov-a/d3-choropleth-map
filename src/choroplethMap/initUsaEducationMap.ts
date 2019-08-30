import { feature as topoJsonToGeoJson } from 'topojson';

import { IUsaGeopath } from '../types';

import usaEducationMapStore from '../stores/UsaEducationMapStore';

import getEducationData from '../api/getEducationData';
import getCountiesTopology from '../api/getCountiesTopology';

import createChoroplethMap from './createChoroplethMap';

async function initUsaEducationMap() {
  const [countiesEducation, countiesTopology] = await Promise.all([getEducationData(), getCountiesTopology()]);
  console.log('education data');
  console.log(countiesEducation);

  const usaGeopath: IUsaGeopath = {
    countiesGeopath: topoJsonToGeoJson(countiesTopology, countiesTopology.objects.counties),
    statesGeopath: topoJsonToGeoJson(countiesTopology, countiesTopology.objects.states),
    nationGeopath: topoJsonToGeoJson(countiesTopology, countiesTopology.objects.nation),
  };

  console.log('geopath data');
  console.log(usaGeopath);

  usaEducationMapStore.countiesEducation = countiesEducation;
  usaEducationMapStore.usaGeopath = usaGeopath;

  createChoroplethMap();

    // tooltip
    const heatMapEl = document.querySelector('#usa-education-map');
    const tooltip = document.querySelector('#tooltip') as HTMLElement;
    const countyEl = tooltip.querySelector('.tooltip__county');
    const countyEducationEl = tooltip.querySelector('.tooltip__county-education');
  
    heatMapEl.addEventListener("mouseover", (event): void => {
      const eventTarget = event.target as SVGElement | HTMLElement;
      if (!eventTarget.classList.contains('county')) return;
      const targetCoords = eventTarget.getBoundingClientRect();
  
      // set data attributes
      tooltip.dataset.education = eventTarget.dataset.education;
  
      // county text
      countyEl.textContent = `${eventTarget.dataset.areaName}, ${eventTarget.dataset.state}`;
  
      // county education text
      countyEducationEl.textContent = `${eventTarget.dataset.education}%`;
  
      // show tooltip
      tooltip.classList.add('tooltip_visibility_visible');
      tooltip.style.top = `${targetCoords.top - tooltip.offsetHeight - targetCoords.width}px`;
      tooltip.style.left = `${targetCoords.left + targetCoords.width * 2 - tooltip.offsetWidth / 2}px`;
    });
  
    heatMapEl.addEventListener("mouseout", (event): void => {
      const eventTarget = event.target as SVGElement | HTMLElement;
      if (!eventTarget.classList.contains('county')) return;
  
      eventTarget.style.top = null;
      eventTarget.style.left = null;
      tooltip.classList.remove('tooltip_visibility_visible');
    });
}

export default initUsaEducationMap;