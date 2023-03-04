import React, { useEffect, useState } from "react";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

type MultiDropdownProps = {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.multiDropdown}>
      <button
        className={styles.multiDropdown__button}
        onClick={() => {
          setIsOpen((prevValue) => !prevValue);
        }}
      >
        {value.value}
        <div className={styles.multiDropdown__button_arrow}></div>
      </button>
      {isOpen && (
        <div className={styles.options} id="options">
          {props.options.map((item) => (
            <label key={item.key} onClick={() => onChange(item)}>
              <input
                type="checkbox"
                name="checkbox"
                className={styles.options__item}
              />
              {item.value}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
export default MultiDropdown;
