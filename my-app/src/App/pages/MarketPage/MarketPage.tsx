import React, { FC, useEffect, useState } from "react";

import { StockItemsModels } from "@store/models";

import ButtonSearch from "./components/ButtonSerach";
import CategoryCoin from "./components/CategoryCoin";
import CoinCards from "./components/CoinCards";
import InputSearch from "./components/InputSearch";
import styles from "./MarketPage.module.scss";
import { useCoinContext } from "../../App";
import Line from "../../components/Line";
import MultiDropdown from "../../components/Multidropdown";
import { Option } from "../../components/Multidropdown/MultiDropdown";

const options: Option[] = [
  { key: "USD", value: "USD" },
  { key: "RUB", value: "RUB" },
  { key: "EUR", value: "EUR" },
  { key: "AED", value: "AED" },
];

const MarketPage: FC = () => {
  const [option, setOption] = useState<Option>({ key: "USD", value: "USD" });
  const [value, setValue] = useState("");

  return (
    <div className={styles.market}>
      <div className={styles.market__search}>
        <InputSearch value={value} onChange={setValue} />
        <ButtonSearch />
      </div>
      <div className={styles.market__multidropdown}>
        <h4>Coins</h4>
        <MultiDropdown options={options} value={option} onChange={setOption} />
      </div>
      <CategoryCoin />
      <Line />
      <CoinCards />
    </div>
  );
};

export default MarketPage;
