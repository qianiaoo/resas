// 都道府県
export type Prefecture = {
  prefCode: number;
  prefName: string;
};

// 一年分の人口データ
export type Population = {
  year: number;
  value: number;
};

// 1都道府県のデータ
export type PopulationData = {
  prefName: string;
  populations: Population[];
};
