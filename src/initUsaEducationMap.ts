import { IEducationMap } from './types';

import getEducationData from './api/getEducationData';
import getCountyData from './api/getCountyData';

import createChoroplethMap from './createChoroplethMap';

async function initUsaEducationApp() {
  const data: IEducationMap = await Promise.all([getEducationData(), getCountyData()]);
  console.log(data[0]);
  console.log(data[1]);

  createChoroplethMap(data);
}

export default initUsaEducationApp;