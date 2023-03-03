import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border p-4 flex">
        <div><Link to={"/"}  className="mx-4 hover:text-blue-500 hover:underline">Actors</Link></div>
        <div><Link to={"/create"}  className="mx-4 hover:text-blue-500 hover:underline">Create Actor</Link></div>
    </header>
  )
}

export default Navbar