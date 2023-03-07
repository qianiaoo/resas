import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import ChartJsGraph from "@/components/ChartJsGraph";
import CheckBoxList from "@/components/CheckBoxList";
import Header from "@/components/Header";
import { fetchPopulation } from "@/lib/apiClient";
import { PopulationData, Prefecture } from "@/types/home";

const Home: NextPage = () => {
  // 現在チェックされている都道府県のID list
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  // グラフ表示用人口データリスト
  const [populations, setPopulations] = useState<PopulationData[]>([]);

  //グラフのラベル用
  const [years, setYears] = useState<string[]>([]);

  // CheckBoxListのチェックされたCallback関数、ここで人口データを増減する。
  const onCheckedChanged = async (pref: Prefecture) => {
    //  check外す場合
    if (checkedPrefCodes.includes(pref.prefCode)) {
      setCheckedPrefCodes(checkedPrefCodes.filter((c) => c !== pref.prefCode));
      setPopulations(populations.filter((p) => p.prefName !== pref.prefName));
    } else {
      // 新しくチェックされた場合
      const result = await fetchPopulation(pref.prefCode, pref.prefName);
      setCheckedPrefCodes([...checkedPrefCodes, pref.prefCode]);
      setPopulations([...populations, result.populationData]);
    }
  };

  useMemo(() => {
    //最初に取得した人口構造データから、年の推移ラベルを設定する。
    if (populations.length && !years.length) {
      setYears(populations[0].populations.map((p) => p.year.toString()));
    }
  }, [populations]);

  return (
    <div>
      <Header />
      <CheckBoxList onCheckedChange={onCheckedChanged} />
      <div className={styles.graphBox}>
        {populations.length ? (
          <ChartJsGraph title={"都道府県人口推移"} dataset={populations} labels={years} />
        ) : (
          //  まだチェックしていないときの文言
          <h4>上の都道府県を選択したらグラフが出てきます。</h4>
        )}
      </div>
    </div>
  );
};

export default Home;
