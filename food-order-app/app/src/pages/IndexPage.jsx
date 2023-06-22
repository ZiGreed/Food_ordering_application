import React, { useEffect, useState } from "react";
import Filter from "../components/filter/Filter";

export default function IndexPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/meals").then((response) => {
      response.json().then((data) => {
        setMeals(data);
      });
    });
  }, []);

  return (
    <>
      {meals.length > 0 && (
        <>
          <Filter meals={meals} />
        </>
      )}
    </>
  );
}
