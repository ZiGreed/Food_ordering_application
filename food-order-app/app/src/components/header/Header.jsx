import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { getLoggedIn } = useContext(UserContext);
  const { isAdmin } = useContext(UserContext);

  const logOut = async () => {
    await axios.get("http://localhost:3001/api/users/logout");
    getLoggedIn();
  };

  return (
    <header>
      <Link to="/" className="logo">
        MyPizzaro
      </Link>
      <nav>
        {isAdmin && (
          <>
            <Link to="/MenuAdministrationPage">Menu adminstration</Link>
          </>
        )}
        <Link to="/" onClick={logOut}>Logout</Link>
        <></>
      </nav>
    </header>
  );
}
