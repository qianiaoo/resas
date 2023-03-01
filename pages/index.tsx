import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ChartJsGraph from "@/components/ChartJsGraph";
import CheckBoxList from "@/components/CheckBoxList";
import Header from "@/components/Header";
import { getPopulationByPrefCode } from "@/hooks/usePrefectures";
import { Population, PopulationData, Prefecture } from "@/types/home";

enum PopulationApiDataIndex {
  allPopulation = 0, //総人口
  YoungPopulation = 1, //年少人口
  WorkingAgePopulation = 2, //生産年齢人口
  ElderlyPopulation = 3, //老年人口
}

const Home: NextPage = () => {
  // 現在チェックされている都道府県のID list
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  // グラフ表示用人口データリスト
  const [populations, setPopulations] = useState<PopulationData[]>([]);
  //実績値と推計値の区切り年
  const untilYear = 2020;

  //グラフのラベル用
  const [years, setYears] = useState<string[]>([]);

  // CheckBoxListのチェックされたCallback関数、ここで人口データを増減する。
  const onCheckedChanged = (pref: Prefecture) => {
    //  check外す場合
    if (checkedPrefCodes.includes(pref.prefCode)) {
      setCheckedPrefCodes(checkedPrefCodes.filter((c) => c !== pref.prefCode));
      setPopulations(populations.filter((p) => p.prefName !== pref.prefName));
    } else {
      // 新しくチェックされた場合
      getPopulationByPrefCode(pref.prefCode)
        .then((res) => {
          const apiPopulations: Population[] = res.result.data[PopulationApiDataIndex.allPopulation].data;
          const populationData = {
            prefName: pref.prefName,
            populations: apiPopulations.filter((a) => a.year <= untilYear),
          };
          setCheckedPrefCodes([...checkedPrefCodes, pref.prefCode]);
          setPopulations([...populations, populationData]);
        })
        .catch((err) => {
          console.error("ERROR, Please Check API KEY", err);
        });
    }
  };

  useEffect(() => {
    //最初に取得した人口構造データから、年の推移ラベルを設定する。
    if (populations.length && !years.length) {
      setYears(populations[0].populations.map((p) => p.year.toString()));
    }
  }, [populations]);

  return (
    <div className={styles.container}>
      <Header />
      <CheckBoxList onCheckedChange={onCheckedChanged} />
      {populations.length ? (
        <ChartJsGraph title={"都道府県人口推移"} dataset={populations} labels={years} />
      ) : (
        //  まだチェックしていないときの文言
        <h4>上の都道府県を選択したらグラフが出てきます。</h4>
      )}
    </div>
  );
};

export default Home;
