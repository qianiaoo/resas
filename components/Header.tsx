import Head from "next/head";
import React from "react";
import styles from "@/styles/Home.module.css";

const Header = () => {
  return (
    <>
      <Head>
        <title>都道府県人口一覧</title>
        <meta name="description" content="都道府県人口一覧" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.headerBox}>
        <h3 className={styles.headerText}>都道府県人口一覧</h3>
      </div>
    </>
  );
};

export default Header;
