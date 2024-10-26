import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-gray-900 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold text-white hover:text-indigo-300"
          >
            Content Management System
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/categories" className="hover:text-indigo-300">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/add-product" className="hover:text-indigo-300">
                Add Product
              </Link>
            </li>
            {localStorage.access_token && (
              <li>
                <Link to="/add-user" className="hover:text-indigo-300">
                  Add User
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-outline btn-error hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
