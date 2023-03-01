import React, { FC, useEffect, useState } from "react";
import { getPrefectures } from "@/hooks/usePrefectures";
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

  // 都道府県一覧取得
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
