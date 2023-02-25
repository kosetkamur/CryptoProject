import React, { useState } from "react";

import { MultiDropdownProps } from "@config/const";

import styles from "./MultiDropdown.module.scss";

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
        disabled={props.disabled}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {props.pluralizeOptions ? props.pluralizeOptions(value) : ""}
        <div className={styles.multiDropdown__button_arrow}></div>
      </button>
      {isOpen && (
        <div className={styles.options} id="options">
          {props.options.map(
            (item) =>
              !props.disabled && (
                <label
                  key={Math.random()}
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
              )
          )}
        </div>
      )}
    </div>
  );
};
export default MultiDropdown;
