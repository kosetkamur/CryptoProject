import React, { FC, useMemo } from "react";

import Line from "@components/Line";
import { CoinProps, TableRow } from "@config/types";
import { getFormattedPrice } from "@utils/getFormattedPrice";

import styles from "./CoinTable.module.scss";

const CoinTable: FC<CoinProps> = ({ coin }) => {
  let marketData = coin?.marketData;
  const tableValue: TableRow[] = [
    {
      key: 0,
      title: "Market Cap",
      value: `${getFormattedPrice(marketData?.marketCap?.usd)}`,
    },
    {
      key: 1,
      title: "Fully Diluted Valuation",
      value: `${getFormattedPrice(marketData?.fullyDilutedValuation?.usd)}`,
    },
    {
      key: 2,
      title: "Circulating Supply",
      value: getFormattedPrice(marketData?.circulatingSupply),
    },
    {
      key: 3,
      title: "Total Supply",
      value: getFormattedPrice(marketData?.totalSupply),
    },
    {
      key: 4,
      title: "Max Supply",
      value: getFormattedPrice(marketData?.maxSupply),
    },
  ];

  const generateTable = useMemo(() => {
    return tableValue.map((value) => (
      <div key={value.key}>
        <div className={styles.table__head}>
          <p className={styles.table__head_title}>{value.title}</p>
          <p className={styles.table__head_value}>
            ${value.value ? value.value.toString() : 0}
          </p>
        </div>
        <Line />
      </div>
    ));
  }, []);
  return <div className={styles.table}>{generateTable}</div>;
};

export default CoinTable;
