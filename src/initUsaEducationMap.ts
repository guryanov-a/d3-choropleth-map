import { feature as topoJsonToGeoJson } from 'topojson';

import getEducationData from './api/getEducationData';
import getCountiesTopology from './api/getCountiesTopology';

import createChoroplethMap from './createChoroplethMap';

async function initUsaEducationMap() {
  const [countiesEducation, countiesTopology] = await Promise.all([getEducationData(), getCountiesTopology()]);
  console.log('api data');
  console.log(countiesEducation);
  console.log(countiesTopology);

  const usaGeopath = {
    countiesGeopath: topoJsonToGeoJson(countiesTopology, countiesTopology.objects.counties),
    statesGeopath: topoJsonToGeoJson(countiesTopology, countiesTopology.objects.states),
    nationGeopath: topoJsonToGeoJson(countiesTopology, countiesTopology.objects.nation),
  };
  
  console.log('geopath data');
  console.log(usaGeopath);

  createChoroplethMap(countiesEducation, usaGeopath);
}

export default initUsaEducationMap;