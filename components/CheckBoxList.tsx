import React, { FC, useEffect, useState } from "react";
import { fetchPrefecture } from "@/lib/apiClient";
import styles from "@/styles/Home.module.css";
import { Prefecture } from "@/types/home";
type CheckBoxList = {
  onCheckedChange: (pref: Prefecture) => void;
};

const CheckBoxList: FC<CheckBoxList> = ({ onCheckedChange }) => {
  //　チェックの状態を保存するリスト
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  // 都道府県一覧
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  // checked変更されたらの処理関数
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
    async function fetchData() {
      const result = await fetchPrefecture();
      setPrefectures(result.prefectures);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.checkBoxListBox}>
      <p>都道府県</p>
      <div className={styles.checkBoxList}>
        {prefectures &&
          prefectures.map(({ prefCode, prefName }) => {
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
