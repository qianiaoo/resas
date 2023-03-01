const API_KEY = process.env.API_KEY || "";

//都道府県データ取得
export const getPrefectures = async () => {
  const data = await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
    headers: { "X-API-KEY": API_KEY },
  });
  return data.json();
};

//都道府県idから人口構成データを取得
export const getPopulationByPrefCode = async (prefCode: number) => {
  const data = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: { "X-API-KEY": API_KEY },
    }
  );
  return data.json();
};
