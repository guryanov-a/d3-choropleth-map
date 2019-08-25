import { IEducation, IUsaGeopath } from "../types";

class UsaEducationMapStore {
  countiesEducation: IEducation;
  usaGeopath: IUsaGeopath;
}

const usaEducationMapStore = new UsaEducationMapStore();

export default usaEducationMapStore;