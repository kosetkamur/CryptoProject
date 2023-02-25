import React from "react";

import styles from "./CoinGraph.module.scss";
import graph from "../../../../../media/img/graph.png";

const CoinGraph = () => {
  return (
    <div className={styles.graph}>
      <h5>Diagram</h5>
      <img src={graph} alt="граф" />
    </div>
  );
};

export default CoinGraph;
