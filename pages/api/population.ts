import type { NextApiRequest, NextApiResponse } from "next";
import { getPopulationByPrefCode } from "@/hooks/usePrefectures";
import { HTTP_BAD_REQUEST_CODE, HTTP_METHOD_NOT_ALLOWED_CODE, HTTP_OK_CODE } from "@/pages/api/http-codes";
import { Population, PopulationData } from "@/types/home";

type Data = {
  populationData?: PopulationData;
  message: string;
};

enum PopulationApiDataIndex {
  allPopulation = 0, //総人口
  YoungPopulation = 1, //年少人口
  WorkingAgePopulation = 2, //生産年齢人口
  ElderlyPopulation = 3, //老年人口
}

//実績値と推計値の区切り年
const UNTIL_YEAR = 2020;

// ブラウザでなく、バックエンド経由で人口データを取得（headerにapi keyが見えなくなるので安全)
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const prefCode = Array.isArray(req.query.prefCode) ? req.query.prefCode[0] : req.query.prefCode;
    const prefName = Array.isArray(req.query.prefName) ? req.query.prefName[0] : req.query.prefName;
    console.log(prefCode, prefName);
    if (prefCode && typeof parseInt(prefCode as string) === "number" && prefName) {
      const idNumber = parseInt(prefCode);
      getPopulationByPrefCode(idNumber)
        .then((response) => {
          const apiPopulations: Population[] = response.result.data[PopulationApiDataIndex.allPopulation].data;
          const populationData = {
            prefName: prefName,
            populations: apiPopulations.filter((a) => a.year <= UNTIL_YEAR),
          };
          res.status(HTTP_OK_CODE).json({ populationData: populationData, message: "ok" });
        })
        .catch((err) => {
          console.error("ERROR, Please Check API KEY", err);
        });
    } else {
      res.status(HTTP_BAD_REQUEST_CODE).json({ populationData: undefined, message: "Invalid id parameter" });
    }
  } else {
    res.status(HTTP_METHOD_NOT_ALLOWED_CODE).json({ populationData: undefined, message: "Method Not Allowed" });
  }
}
