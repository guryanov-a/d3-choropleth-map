import ky from 'ky';

import { ITopology } from '../types';

const COUNTY_ENDPOINT = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

async function getCountyData(): Promise<ITopology> {
  return await ky.get(COUNTY_ENDPOINT).json();
}

export default getCountyData;