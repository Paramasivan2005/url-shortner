import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    navigate("/");

    window.location.reload();
  };

  return (
    <nav className="bg-yellow-300/80 flex justify-around items-center">
      {/* first section */}
      <Link to="/">
        <div className="flex items-center py-2">
          <img
            src="./public/URL_img.png"
            alt="URL Image"
            className="w-10 h-10 lg:w-16 lg:h-16 object-cover"
          />

          <h1 className="custom-font text-lg lg:text-3xl">URL Shortner</h1>
        </div>
      </Link>

      {/* second section */}
      <div className="flex gap-5 py-5 items-center relative">
        {isLoggedIn ? (
          <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer">
              <img src={user?.avatar || "https://ui-avatars.com/api/?name=U"} alt="profile" className="w-10 h-10 rounded-full object-cover"/>
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <Link to="/profile">
                  <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    My Profile
                  </div>
                </Link>

                <Link to="/dashboard">
                  <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    Dashboard
                  </div>
                </Link>

                <div
                  onClick={handleLogout}
                  className="px-4 py-3 hover:bg-red-100 text-red-500 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Login Button */}
            <Link to="/login">
              <button className="bg-blue-500 text-white py-2 px-5 rounded-lg font-semibold cursor-pointer">
                Login
              </button>
            </Link>

            {/* Signup Button */}
            <Link to="/signup">
              <button className="hidden lg:block bg-blue-500 text-white py-2 px-5 rounded-lg font-semibold cursor-pointer">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
