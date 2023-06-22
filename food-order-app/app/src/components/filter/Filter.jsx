import React, { useState } from "react";
import Meal from "./../meal/Meal";

function Filter({ meals }) {
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredMeals = meals.filter((meal) => {
    return !categoryFilter || meal.category === categoryFilter;
  });

  const uniqueCategories = [...new Set(meals.map((meal) => meal.category))];

  return (
    <div>
      <div className="filter">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={handleCategoryFilter}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Meal meals={filteredMeals} />
    </div>
  );
}

export default Filter;
