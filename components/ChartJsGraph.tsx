import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import { PopulationData } from "@/types/home";

//　ChartJsの初期化
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartJsGraphProps = {
  title: string;
  dataset: PopulationData[];
  labels: string[];
};

const ChartJsGraph: FC<ChartJsGraphProps> = ({ title, dataset, labels }) => {
  //ランダムの色を取得する。
  const getRandomColor = () => {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  };

  const data = {
    labels,
    //　人口構造データをグラフのデータセットのタイプに変更
    datasets: dataset.map((d) => ({
      label: d.prefName,
      data: d.populations.map((pp) => pp.value),
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(),
    })),
  };

  const options = {
    responsive: true, // レスポンシブ対応させる
    plugins: {
      title: {
        display: true,
        text: title, // タイトルの設定
      },
    },
  };
  return <Line options={options} data={data} />;
};

export default ChartJsGraph;
