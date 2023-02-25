import React, { FC } from "react";

import { Option } from "@config/const";

import ButtonSearch from "./components/ButtonSerach";
import CategoryCoin from "./components/CategoryCoin";
import CoinCards from "./components/CoinCards";
import InputSearch from "./components/InputSearch";
import styles from "./MarketPage.module.scss";
import Line from "../../components/Line";
import MultiDropdown from "../../components/Multidropdown";

const MarketPage: FC = () => {
  const options: Option[] = [{ key: "USD", value: "USD" }];
  let initialState = [{ key: "USD", value: "USD" }];

  const defaultPluralizeOptions = (elements: Option[]) =>
    elements.map((el: Option) => el.key).join();

  return (
    <div className={styles.market}>
      <div className={styles.market__search}>
        <InputSearch />
        <ButtonSearch />
      </div>
      <div className={styles.market__multidropdown}>
        <h4>Coins</h4>
        <MultiDropdown
          options={options}
          value={initialState}
          onChange={() => {}}
          pluralizeOptions={defaultPluralizeOptions}
        />
      </div>
      <CategoryCoin />
      <Line />
      <CoinCards />
    </div>
  );
};

export default MarketPage;
