import ky from 'ky';

import { IEducation } from '../types';

const EDUCATION_ENDPOINT = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';

async function getEducationData(): Promise<IEducation> {
  return await ky.get(EDUCATION_ENDPOINT).json();
}

export default getEducationData;