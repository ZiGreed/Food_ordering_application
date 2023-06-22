import { MdEditNote, MdDelete } from "react-icons/md";
import axios from "axios";
import { deleteHandler } from "../../services/deleteHandler";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:3001/api/menus/";

function Menu({ menu, setDeletedMenu }) {
  
  function deleteMenu(id) {
    axios.delete(baseURL + id).then((response) => {
      setDeletedMenu(response.data);
    });
  }

  return (
    <tr>
      <td>{menu.id}</td>
      <td>{menu.title}</td>
      <td>
        <Link to={"/EditMenuPage/" + menu._id}>
          {" "}
          <MdEditNote size={25} color={"#8d0b7e"} />
        </Link>
      </td>
      <td>
        <MdDelete
          size={25}
          color={"#8d0b7e"}
          onClick={() => deleteHandler(menu, deleteMenu)}
        />
      </td>
    </tr>
  );
}

export default Menu;
