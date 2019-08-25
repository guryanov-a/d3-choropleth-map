import { GeoJSON } from 'geojson';

export type IUsaState = 
  "AL"
  | "AK"
  | "AS"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "DC"
  | "FM"
  | "FL"
  | "GA"
  | "GU"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MH"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "MP"
  | "OH"
  | "OK"
  | "OR"
  | "PW"
  | "PA"
  | "PR"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VI"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

export interface ICountyEducation {
  area_name: string;
  bachelorsOrHigher: number;
​​​  fips: number
​​​  state: IUsaState;
}

export type IEducation = Array<ICountyEducation>;

export interface UsaGeopath {
  countiesGeopath: GeoJSON;
  statesGeopath: GeoJSON;
  nationGeopath: GeoJSON;
};

