import ky from 'ky';

import { UsAtlas } from 'topojson';

const COUNTY_ENDPOINT = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

async function getCountiesTopology(): Promise<UsAtlas> {
  return await ky.get(COUNTY_ENDPOINT).json();
}

export default getCountiesTopology;