import { MdEditNote, MdDelete } from "react-icons/md";
import axios from "axios";
import { deleteHandler } from "../../services/deleteHandler";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:3001/api/meals/";

function Meal({ meal, setDeletedMeal }) {
  function deleteMeal(id) {
    axios.delete(baseURL + id).then((response) => {
      setDeletedMeal(response.data);
    });
  }

  return (
    <tr>
      <td>{meal._id}</td>
      <td>{meal.title}</td>
      <td>{meal.category}</td>
      <td>{meal.price} €</td>
      <td>{meal.description}</td>
      <td>
        {meal.image && (
          <img
            src={`./images/${meal.image}`}
            alt={meal.title}
          />
        )}
      </td>
      <td>
        <Link to={"/EditMealPage/" + meal._id}>
          <MdEditNote size={25} color={"#8d0b7e"} />
        </Link>
      </td>
      <td>
        <MdDelete
          size={25}
          color={"#8d0b7e"}
          onClick={() => deleteHandler(meal, deleteMeal)}
        />
      </td>
    </tr>
  );
}

export default Meal;
