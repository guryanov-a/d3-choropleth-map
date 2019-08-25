import ky from 'ky';

const EDUCATION_ENDPOINT = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';

async function getEducationData() {
  return await ky.get(EDUCATION_ENDPOINT).json();
}

export default getEducationData;