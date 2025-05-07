// import React from 'react'
// import { Link, useLocation } from 'react-router-dom';
// import logoGIF from '../../assets/logoGIF.gif'
// import { Avatar, Dropdown, DropdownItem, TextInput } from 'flowbite-react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLogout } from '../Layout/useLogout.jsx';
// import { signOutSuccess } from '../../Redux/Slice/authSlice.jsx';


// function TopBar() {
//   let logout = useLogout()
//   const dispatch = useDispatch()
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const path =  useLocation().pathname;
//   const { currentUser } = useSelector((state)=>state.user)
//   //console.log(currentUser);
//   //console.log(currentUser.Email)

//   const handleLogout = () => {
//     logout()
//     dispatch(signOutSuccess())
//   }
//   return (
//     <>
//       <div className="flex w-full justify-around">
//         <Link to="/" className="self-center">
//           <img src={logoGIF} alt="logo" className="w-20 h-20 self-center" />
//         </Link>
//         <div>
//           <TextInput
//             type="text"
//             placeholder="Serach your Service & Products"
//             rightIcon={AiOutlineSearch}
//             className="hidden lg:inline p-96"
//           />
//         </div>

//         <ul className="flex gap-5">
  
//           <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500 hover:underline">
//             <a href="/" active={path === "/"} as={"div"}>
//               HOME
//             </a>
//           </li>
//           <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500 hover:underline">
//             <a href="/footer" active={path === "/footer"} as={"div"}>
//               ABOUT
//             </a>
//           </li>
//           <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500 hover:underline">
//             <a href="/" active={path === "/"} as={"div"}>
//               LOGIN
//             </a>
//           </li>
//           <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500 hover:underline">
//             <a
//               href="/myorders"
//               active={path === "/myorders"}
//               as={"div"}
//             >
//               YOUR ORDER
//             </a>
//           </li>
//         </ul>
//         <div className="gap-2 p-6">
//           <Dropdown
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt="user" img={currentUser?.ProfilePicture} rounded />
//             }
//           >
//             <Dropdown.Header className="bg-red-100">
//               <span>vignesh tsv</span>
              
//             </Dropdown.Header>
//             <Link to="/dashboardprofile">
//               <DropdownItem className="bg-blue-100"> Profile</DropdownItem>
//             </Link>
//             <DropdownItem className="bg-red-100">Admin</DropdownItem>
//             {/* <DropdownDivider /> */}
//             <Dropdown.Item onClick={handleLogout} className="bg-blue-100">
//               LogOut
//             </Dropdown.Item>
//           </Dropdown>
//         </div>
//       </div>

//       {/* Topbar sticky */}
//       <div className="bg-gray-100 p-2 font-extrabold text-xl ">
//         <marquee>
//           <b>Door step petrol & service ( happy journey )</b>
//         </marquee>
//       </div>
//     </>
//   );
// }

// export default TopBar;


import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif'
import { Avatar, Dropdown, DropdownItem, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLogout } from '../Layout/useLogout.jsx';
import { signOutSuccess } from '../../Redux/Slice/authSlice.jsx';
import { HiMenu } from 'react-icons/hi';


function TopBar() {
  let logout = useLogout()
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const path =  useLocation().pathname;
  const { currentUser } = useSelector((state)=>state.user)
  console.log(currentUser);
  //console.log(currentUser.Email)

  const handleLogout = () => {
    logout()
    dispatch(signOutSuccess())
  }
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-red-500 via-yellow-500 to-purple-500 relative shadow-md w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src={logoGIF} alt="logo" className="w-14 h-14 sm:w-20 sm:h-20 rounded-full"/>
        </Link>

        {/* Search bar */}
        <div className="lg:block w-1/2">
          <TextInput
            type="text"
            placeholder="Search your Service & Products"
            rightIcon={AiOutlineSearch}
            className="w-full text-white placeholder-transparent border-green-700 focus:ring-white focus:border-green-400"
          />
        </div>

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

      {/* Marquee */}
      <div className=" p-2 font-extrabold text-center text-sm sm:text-lg bg-gradient-to-t from-blue-500 via-indigo-500 to-purple-500 relative">
        <marquee>
          <b>Door step petrol & service ( happy journey )</b>
        </marquee>
      </div>
    </>
  );
}

export default TopBar;



