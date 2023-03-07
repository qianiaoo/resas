import type { NextApiRequest, NextApiResponse } from "next";
import { getPrefectures } from "@/hooks/usePrefectures";
import { HTTP_BAD_REQUEST_CODE, HTTP_OK_CODE, HTTP_UNAUTHORIZED_CODE } from "@/pages/api/http-codes";
import { Prefecture } from "@/types/home";

type Data = {
  prefectures: Prefecture[];
  message?: string;
};

// ブラウザでなく、バックエンド経由で都道府県データを取得（headerにapi keyが見えなくなるので安全)
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET") {
    res.status(HTTP_BAD_REQUEST_CODE).json({ prefectures: [], message: "Please use GET." });
    return;
  }
  let data: Prefecture[];
  getPrefectures()
    .then((response) => {
      data = response.result;
      res.status(HTTP_OK_CODE).json({ prefectures: data, message: "ok" });
    })
    .catch((err) => {
      console.error("ERROR, Please Check API KEY", err);
      res.status(HTTP_UNAUTHORIZED_CODE).json({ prefectures: [], message: "Please Check API KEY" });
    });
}
