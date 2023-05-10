import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    logout();
    navigate("/login");
  }

  const user = localStorage.getItem("user");

  return (
    <header className="border p-4 flex justify-between">
        <div>
          <Link to={"/"}  className="mx-4 hover:text-blue-500 hover:underline">Actors</Link>
          <Link to={"/create"}  className="mx-4 hover:text-blue-500 hover:underline">Create Actor</Link>
        </div>

        {user && <button className="mx-4 border px-3 py-1 bg-red-500 text-white hover:bg-red-400" onClick={handleLogoutBtn}>Logout</button>}

        {!user && 
          <div>
            <Link to={"/login"}  className="mx-4 hover:text-blue-500 hover:underline">Login</Link>
            <Link to={"/signup"}  className="mx-4 hover:text-blue-500 hover:underline">Signup</Link>
          </div>
        }
    </header>
  )
}

export default Navbar