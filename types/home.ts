export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Population = {
  year: number;
  value: number;
};

export type PopulationData = {
  prefName: string;
  populations: Population[];
};
