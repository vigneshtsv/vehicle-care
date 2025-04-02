import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif'
import { Avatar, Dropdown, DropdownItem, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLogout } from '../Layout/useLogout.jsx';
import { signOutSuccess } from '../../Redux/Slice/authSlice.jsx';


function TopBar() {
  let logout = useLogout()
  const dispatch = useDispatch()
  const path =  useLocation().pathname;
  const { currentUser } = useSelector((state)=>state.user)
  console.log(currentUser);
  console.log(currentUser.Email)

  const handleLogout = () => {
    logout()
    //dispatch(signOutSuccess())
  }
  return (
    <>
      <div className="flex w-full justify-around">
        <Link to="/" className="self-center">
          <img src={logoGIF} alt="logo" className="w-20 h-20 self-center" />
        </Link>
        <div>
          <TextInput
            type="text"
            placeholder="Serach your Service & Products"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline p-96"
          />
        </div>

        <ul className="flex gap-5">
          <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500">
            <a href="/" active={path === "/"} as={"div"}>
              HOME
            </a>
          </li>
          <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500">
            <a href="/footer" active={path === "/footer"} as={"div"}>
              ABOUT
            </a>
          </li>
          <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500">
            <a href="/" active={path === "/"} as={"div"}>
              LOGIN
            </a>
          </li>
          <li className="font-extrabold py-8 text-blue-600 hover:text-sky-500">
            <a
              href="/myorders"
              active={path === "/myorders"}
              as={"div"}
            >
              YOUR ORDER
            </a>
          </li>
        </ul>
        <div className="gap-2 p-6">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser?.ProfilePicture} rounded />
            }
          >
            <Dropdown.Header className="bg-red-100">
              <span>vignesh tsv</span>
            </Dropdown.Header>
            <Link to="/dashboardprofile">
              <DropdownItem className="bg-blue-100"> Profile</DropdownItem>
            </Link>
            <DropdownItem className="bg-red-100">Admin</DropdownItem>
            {/* <DropdownDivider /> */}
            <Dropdown.Item onClick={handleLogout} className="bg-blue-100">
              LogOut
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Topbar sticky */}
      <div className="bg-gray-100 p-2 font-extrabold text-xl ">
        <marquee>
          <b>Door step petrol & service ( happy journey )</b>
        </marquee>
      </div>
    </>
  );
}

export default TopBar;