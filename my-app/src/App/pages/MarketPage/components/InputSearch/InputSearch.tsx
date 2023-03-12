import React, { ChangeEvent, FC } from "react";

import search from "img/search.svg";

import styles from "./InputSearch.module.scss";

type InputSearchProps = {
  value: string;
  handleChange: (value: string) => void;
  handleSubmit: () => void;
};

const InputSearch: FC<InputSearchProps> = ({
  handleChange,
  value,
  handleSubmit,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <div className={styles.search}>
      <input
        type="search"
        value={value}
        onChange={handleInputChange}
        className={styles.search__input}
        placeholder="Search Cryptocurrency"
      />
      <button onClick={handleClick} className={styles.search__button}>
        <img src={search} alt="кнопка поиска" />
      </button>
    </div>
  );
};
export default InputSearch;
