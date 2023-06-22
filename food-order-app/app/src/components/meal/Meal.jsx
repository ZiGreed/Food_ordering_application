import "./Meal.css";

function Meal({ meals }) {
  const mealsjsx = meals.map((meal) => {
    return (
      <div className="meal" key={meal._id}>
        <div>
          <div className="text">
            <h2 className="title">{meal.title}</h2>
            <p className="category">{meal.category}</p>
            <p className="description">{meal.description}</p>
            <p className="price">{meal.price}</p>
          </div>
        </div>

        {meal.image && <img src={`./images/${meal.image}`} alt={meal.title} />}
      </div>
    );
  });

  return <div>{mealsjsx}</div>;
}

export default Meal;
