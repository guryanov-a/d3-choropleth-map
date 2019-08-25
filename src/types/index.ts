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

export type IArc = Array<number>;

export type IArcs = Array<IArc>;

export type IBBox = [number, number, number, number];

export interface IGeometry {
  arcs: IArcs;
  id: number;
  type: string;
}

export interface IGeometryCollection {
  geometries: Array<IGeometry>;
  type: "GeometryCollection";
}

export interface ICountiesGeometry {
  counties: IGeometryCollection;
  nation: IGeometryCollection;
  states: IGeometryCollection;
};

export interface ITransform {
  scale: Array<number>;
  translate: Array<number>;
}

export interface ITopology {
  arcs: Array<IArcs>;
  bbox: IBBox;
  objects: ICountiesGeometry;
  transform: Object;
  type: "Topology";
}

export type IEducationMap = [IEducation, ITopology];