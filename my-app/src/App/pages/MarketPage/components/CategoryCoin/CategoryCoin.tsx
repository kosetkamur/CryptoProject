import React from "react";

import styles from "./CategoryCoin.module.scss";

const CategoryCoin = () => {
  // const [active, setActive] = useState();
  const categories = [
    { id: 1, content: "All", isActive: true },
    { id: 2, content: "Gainer", isActive: false },
    { id: 3, content: "Loser", isActive: false },
    { id: 4, content: "Favourites", isActive: false },
  ];
  const handleClickMenu = (e: React.MouseEvent) => {
    categories.map((category) => (category.isActive = false));
  };
  return (
    <div className={styles.category}>
      {categories.map((category) => (
        <h6
          key={category.id}
          onClick={handleClickMenu}
          className={category.isActive ? "active" : ""}
        >
          {category.content}
        </h6>
      ))}
    </div>
  );
};

export default CategoryCoin;
