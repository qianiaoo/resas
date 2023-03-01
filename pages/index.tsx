import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import CheckBoxList from "@/components/CheckBoxList";
import Header from "@/components/Header";

const Home: NextPage = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const onCheckedChanged = (checkedState: number[]) => {
    setCheckedPrefCodes(checkedState);
  };

  return (
    <div className={styles.container}>
      <Header />
      <CheckBoxList onCheckedChange={onCheckedChanged} />
    </div>
  );
};

export default Home;
