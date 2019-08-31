import { min, max } from 'd3';
import { IEducation, IUsaGeopath } from "../types";

class UsaEducationMapStore {
  get minEducationLevel() {
    return min(this.countiesEducation, (d) => d.bachelorsOrHigher);
  }

  get minEducationLevelInt() {
    return Math.floor(this.minEducationLevel);
  }

  get maxEducationLevel() {
    return max(this.countiesEducation, (d) => d.bachelorsOrHigher);
  }

  get maxEducationLevelInt() {
    return Math.ceil(this.maxEducationLevel);
  }

  countiesEducation: IEducation;
  usaGeopath: IUsaGeopath;
}

const usaEducationMapStore = new UsaEducationMapStore();

export default usaEducationMapStore;