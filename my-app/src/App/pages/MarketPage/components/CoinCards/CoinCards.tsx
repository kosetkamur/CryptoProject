import React, { FC } from "react";

import { useStocksStoreContext } from "@app/pages/MarketPage/MarketPage";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import CoinCard from "./CoinCard/CoinCard";
import styles from "./CoinCards.module.scss";

const CoinCards: FC = () => {
  const stockStore = useStocksStoreContext();
  return (
    <div className={styles.cards}>
      <InfiniteScroll
        dataLength={stockStore?.list.length ? stockStore?.list.length : 0}
        next={stockStore ? stockStore?.fetchMoreData : () => {}}
        hasMore={stockStore?.hasMore ? stockStore.hasMore : false}
        loader={<h4>Loading...</h4>}
      >
        {stockStore?.list.map((stock) => (
          <CoinCard
            stock={stock}
            key={stock.id}
            currency={stockStore?.currency}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default observer(CoinCards);
