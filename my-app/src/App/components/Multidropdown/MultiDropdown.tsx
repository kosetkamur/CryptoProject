import React, { useState } from "react";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  pluralizeOptions?: (value: Option[]) => string;
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
        {props.pluralizeOptions ? props.pluralizeOptions(value) : ""}
        <div className={styles.multiDropdown__button_arrow}></div>
      </button>
      {isOpen && (
        <div className={styles.options} id="options">
          {props.options.map((item) => (
            <label
              key={item.key}
              onClick={() =>
                value.some((val) => val.key === item.key)
                  ? onChange(value)
                  : onChange(value.concat([item]))
              }
            >
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
