import React, { ChangeEvent, FC, useState } from "react";

import { StockItemsModels } from "@store/models";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./InputSearch.module.scss";
import { useCoinContext } from "../../../../App";

type InputSearchTypes = {
  value: string;
  onChange: (value: string) => void;
};

const InputSearch: FC<InputSearchTypes> = ({ onChange, value }) => {
  const coinContext = useCoinContext();
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    // stocksStore.setQuery(value);
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      className={styles.input}
      placeholder="Search Cryptocurrency"
    />
  );
};
// export default observer(InputSearch);
export default InputSearch;
