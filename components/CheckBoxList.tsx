import React, { FC, useEffect, useState } from "react";
import { getPrefectures } from "@/hooks/usePrefectures";
import styles from "@/styles/Home.module.css";
import { Prefecture } from "@/types/home";
type CheckBoxList = {
  onCheckedChange: (pref: Prefecture) => void;
};

const CheckBoxList: FC<CheckBoxList> = ({ onCheckedChange }) => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const handleOnChange = (prefCode: number) => {
    let newCodes: number[];
    if (checkedPrefCodes.includes(prefCode)) {
      newCodes = checkedPrefCodes.filter((i) => i !== prefCode);
      setCheckedPrefCodes(newCodes);
    } else {
      newCodes = [...checkedPrefCodes, prefCode];
      setCheckedPrefCodes(newCodes);
    }
    const findRes = prefectures.find((p) => p.prefCode === prefCode);
    if (findRes) {
      onCheckedChange(findRes);
    }
  };

  useEffect(() => {
    getPrefectures()
      .then((res) => {
        setPrefectures(res.result);
      })
      .catch((err) => {
        console.error("ERROR, Please Check API KEY", err);
      });
  }, []);
  return (
    <div className={styles.checkBoxListBox}>
      <p>都道府県</p>
      <div className={styles.checkBoxList}>
        {prefectures.map(({ prefCode, prefName }) => {
          return (
            <div key={prefCode}>
              <input
                type="checkbox"
                id={`checkbox-${prefCode}`}
                name={prefName}
                value={prefName}
                checked={checkedPrefCodes.includes(prefCode)}
                onChange={() => handleOnChange(prefCode)}
              />
              <label htmlFor={`checkbox-${prefCode}`}>{prefName}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckBoxList;
