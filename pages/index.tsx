import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
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
    console.log(populations);
  };

  return (
    <div className={styles.container}>
      <Header />
      <CheckBoxList onCheckedChange={onCheckedChanged} />
      <div>{populations.length}</div>
    </div>
  );
};

export default Home;
