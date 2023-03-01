import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import CheckBoxList from "@/components/CheckBoxList";
import Header from "@/components/Header";
import { getPopulationByPrefCode } from "@/hooks/usePrefectures";
import { Population, PopulationData, Prefecture } from "@/types/home";

const Home: NextPage = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Prefecture[]>([]);
  const onCheckedChanged = (checkedState: Prefecture[]) => {
    setCheckedPrefCodes(checkedState);
  };

  const [populations, setPopulations] = useState<PopulationData[]>([]);

  useEffect(() => {
    let populationList: PopulationData[] = [];
    checkedPrefCodes.map((pref) => {
      getPopulationByPrefCode(pref.prefCode)
        .then((res) => {
          const apiPopulations: Population[] = res.result.data[0].data;
          populationList.push({
            prefName: pref.prefName,
            populations: apiPopulations,
          });

          console.log(apiPopulations);
        })
        .catch((err) => {
          console.error("ERROR, Please Check API KEY", err);
        });
    });
    setPopulations(populationList);
  }, [checkedPrefCodes]);

  return (
    <div className={styles.container}>
      <Header />
      <CheckBoxList onCheckedChange={onCheckedChanged} />
      <div>
        {populations.map((p) => (
          <div key={p.prefName}></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
