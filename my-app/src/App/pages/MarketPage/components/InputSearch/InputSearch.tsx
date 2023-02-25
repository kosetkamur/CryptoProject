import React, { ChangeEvent, useState } from "react";

import styles from "./InputSearch.module.scss";

const InputSearch = () => {
  const [value, setValue] = useState("");
  return (
    <form>
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        className={styles.input}
        placeholder="Search Cryptocurrency"
      />
    </form>
  );
};
export default InputSearch;
