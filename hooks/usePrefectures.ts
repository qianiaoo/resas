const API_KEY = process.env.API_KEY || "";

export const getPrefectures = async () => {
  const data = await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
    headers: { "X-API-KEY": API_KEY },
  });
  return data.json();
};

export const getPopulationByPrefCode = async (prefCode: number) => {
  const data = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: { "X-API-KEY": API_KEY },
    }
  );
  return data.json();
};
