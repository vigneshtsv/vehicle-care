import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoGIF from "../../assets/logoGIF.gif";
import { Avatar, Dropdown, DropdownItem, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../Layout/useLogout.jsx";
import { signOutSuccess } from "../../Redux/Slice/authSlice.jsx";
import { HiMenu } from "react-icons/hi";
import { toast } from "react-toastify";

function TopBar() {
  let logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  //console.log(currentUser.Email)

  const handleSearch = () => {
    toast.info("🔍 Search updates coming soon...");
  };

  const toggleMobileSearch = () => {
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(signOutSuccess());
  };
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-red-500 via-yellow-500 to-purple-500 relative shadow-md w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img
            src={logoGIF}
            alt="logo"
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-full"
          />
        </Link>

        {/* Search bar */}
        <form className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              className="w-full h-8 sm:h-10 pl-4 pr-12 rounded-full border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-transparent placeholder:text-white placeholder:font-semibold placeholder:italic text-white text-sm sm:text-base"
              placeholder="Search your Service & Products..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-transparent hover:bg-blue-800 rounded-full flex items-center justify-center text-white hover:text-white transition-colors duration-200"
            >
              <AiOutlineSearch className="text-sm sm:text-base" />
            </button>
          </div>
        </form>
        <button
          onClick={toggleMobileSearch}
          className="w-10 h-8 md:hidden bg-transparent border border-blue-800 rounded-full flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors duration-200 mr-2"
        >
          <AiOutlineSearch className="text-sm" />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center">
          <li
            className={`font-bold py-2 ${
              path === "#" ? "text-blue-600" : "text-gray-700"
            } hover:text-sky-500`}
          >
            <Link to="#">HOME</Link>
          </li>
          <li
            className={`font-bold py-2 ${
              path === "/footer" ? "text-blue-600" : "text-gray-700"
            } hover:text-sky-500`}
          >
            <Link to="/footer">ABOUT</Link>
          </li>
          <li
            className={`font-bold py-2 ${
              path === "/" ? "text-blue-600" : "text-gray-700"
            } hover:text-sky-500`}
          >
            <Link to="/">LOGIN</Link>
          </li>
          <li
            className={`font-bold py-2 ${
              path === "/myorders" ? "text-blue-600" : "text-gray-700"
            } hover:text-sky-500`}
          >
            <Link to="/myorders">YOUR ORDER</Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <HiMenu className="w-8 h-8 text-blue-600" />
          </button>
        </div>

        {/* Avatar & Dropdown */}
        <div className="gap-2 p-6">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser?.ProfilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span>
                {`${currentUser?.FirstName} ${currentUser?.LastName}` || "User"}
              </span>
            </Dropdown.Header>
            <Link to="/dashboardprofile">
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownItem>{currentUser.Role}</DropdownItem>
            <Dropdown.Item onClick={handleLogout}>LogOut</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md p-4 space-y-2">
          <Link
            to="/"
            className="block font-semibold text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/footer"
            className="block font-semibold text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            to="/login"
            className="block font-semibold text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            LOGIN
          </Link>
          <Link
            to="/myorders"
            className="block font-semibold text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            YOUR ORDER
          </Link>
          <div className="mt-2">
            <button onClick={handleLogout} className="text-red-500 font-bold">
              Logout
            </button>
          </div>
        </div>
      )}

      {/*Animation Marquee */}
      <div 
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2 overflow-hidden"
        style={{ position: 'relative' }}
      >
        <div 
          className="whitespace-nowrap"
          style={{
            animation: 'scroll 20s linear infinite',
            display: 'inline-block'
          }}
        >
          <span className="inline-block px-8 font-bold text-sm lg:text-base">
            🚗 Door step petrol & service - Happy journey! 
          </span>
          <span className="inline-block px-8 font-bold text-sm lg:text-base">
            ⭐ 24/7 Service Available 
          </span>
          <span className="inline-block px-8 font-bold text-sm lg:text-base">
            🛠️ Professional Maintenance Team 
          </span>
          <span className="inline-block px-8 font-bold text-sm lg:text-base">
            📞 Book Your Service Now!
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
}

export default TopBar;
