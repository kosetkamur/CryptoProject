import React, { ChangeEvent, FC } from "react";

import styles from "./InputSearch.module.scss";

type InputSearchProps = {
  value: string;
  handleChange: (value: string) => void;
};

const InputSearch: FC<InputSearchProps> = ({ handleChange, value }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
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
export default InputSearch;
