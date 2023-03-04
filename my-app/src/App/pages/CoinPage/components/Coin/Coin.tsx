import React, { FC } from "react";

import { CoinList } from "@config/const";

import CoinDescription from "../CoinDescription";
import CoinGraph from "../CoinGraph";
import CoinHeader from "../CoinHeader";
import CoinPrice from "../CoinPrice/CoinPrice";
import CoinTable from "../CoinTable/CoinTable";

const Coin: FC<CoinList> = ({ coin }) => {
  return (
    <>
      <div className="coin">
        <CoinHeader coin={coin} />
        <CoinPrice coin={coin} />
        <CoinTable coin={coin} />
        <CoinDescription coin={coin} />
        <CoinGraph />
      </div>
    </>
  );
};

export default Coin;
