import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import CheckBoxList from "@/components/CheckBoxList";
import Header from "@/components/Header";
import { getPopulationByPrefCode } from "@/hooks/usePrefectures";
import { Population, PopulationData, Prefecture } from "@/types/home";

const Home: NextPage = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const [populations, setPopulations] = useState<PopulationData[]>([]);

  const onCheckedChanged = (pref: Prefecture) => {
    if (checkedPrefCodes.includes(pref.prefCode)) {
      setCheckedPrefCodes(checkedPrefCodes.filter((c) => c !== pref.prefCode));
      setPopulations(populations.filter((p) => p.prefName !== pref.prefName));
    } else {
      getPopulationByPrefCode(pref.prefCode)
        .then((res) => {
          const apiPopulations: Population[] = res.result.data[0].data;
          const populationData = {
            prefName: pref.prefName,
            populations: apiPopulations,
          };
          setCheckedPrefCodes([...checkedPrefCodes, pref.prefCode]);
          setPopulations([...populations, populationData]);
          console.log(apiPopulations);
        })
        .catch((err) => {
          console.error("ERROR, Please Check API KEY", err);
        });
    }
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
