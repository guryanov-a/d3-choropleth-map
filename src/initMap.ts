import getEducationData from './api/getEducationData';
import getCountyData from './api/getCountyData';

async function initMap() {
  const educationData = await getEducationData();
  console.log(educationData);
  const countyData = await getCountyData();
  console.log(countyData);
}

export default initMap;