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
}

export default initUsaEducationMap;