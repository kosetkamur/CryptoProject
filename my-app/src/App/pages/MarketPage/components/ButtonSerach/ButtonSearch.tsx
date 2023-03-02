import React from "react";

import styles from "./ButtonSearch.module.scss";
// import {Loader, LoaderSize} from "../Loader/Loader";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSearch: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <div className="button__content" />
    </button>
  );
};

export default ButtonSearch;
