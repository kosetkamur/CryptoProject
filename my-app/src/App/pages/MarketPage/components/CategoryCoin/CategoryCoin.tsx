import React from "react";

import styles from "./CategoryCoin.module.scss";

const CategoryCoin = () => {
  const categories = [
    { id: 1, content: "All" },
    { id: 2, content: "Gainer" },
    { id: 3, content: "Loser" },
    { id: 4, content: "Favourites" },
  ];

  const [activeId, setActiveId] = React.useState(1);

  return (
    <div className={styles.category}>
      {categories.map((category) => (
        <h6
          key={category.id}
          onClick={() => setActiveId(category.id)}
          className={category.id === activeId ? "active" : ""}
        >
          {category.content}
        </h6>
      ))}
    </div>
  );
};

export default CategoryCoin;
