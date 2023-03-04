import React from "react";

import graph from "@img/graph.png";

import styles from "./CoinGraph.module.scss";

const CoinGraph = () => {
  return (
    <div className={styles.graph}>
      <h5>Diagram</h5>
      <img src={graph} alt="граф" />
    </div>
  );
};

export default CoinGraph;
