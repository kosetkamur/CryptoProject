import React from "react";

import styles from "./ButtonSearch.module.scss";
// import {Loader, LoaderSize} from "../Loader/Loader";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSearch: React.FC<ButtonProps> = ({
  onClick,
  children,
  loading = false,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={loading !== true ? onClick : undefined}
      className={styles.button}
      disabled={loading === true || props.disabled ? true : undefined}
    >
      <div className="button__content">
        {/*{loading && <Loader loading={ loading } size={LoaderSize.s}/>}*/}
        {children}
      </div>
    </button>
  );
};

export default ButtonSearch;
