import { Navbar, TextInput, Button, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLogout } from '../Layout/useLogout';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../Redux/Slice/authSlice';


function AdminTopBarPage() {
  const path =  useLocation().pathname
  const logout = useLogout();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout()
    dispatch(signOutSuccess())
  }
  return <div> 
  <Navbar className='border-b-2 border-blue-500 bg-gradient-to-br from-red-500 via-teal-500 to-gray-500 relative'>
    <Link to='/' className='self-center rounded-full'>
      <img src={logoGIF} alt="logo" className='w-20 h-20 self-center rounded-full'/>
    </Link>
    <form>
        <input 
        type='text' 
        placeholder='Serach your Service & Products...' 
        rightIcon={AiOutlineSearch}
        className='hidden lg:block w-96 h-10 rounded-full border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-transparent placeholder:text-white placeholder:font-semibold placeholder:italic'
        />
    </form>
    <button className='w-12 h-10 lg:hidden bg-transparent border border-blue-800 rounded-full flex items-center justify-center hover:bg-blue-800 hover:text-white'>
      <AiOutlineSearch />
    </button>
    {/* <div>
      <Link to='/login'>
        <Button gradientDuoTone='purpleToPink' outline>SignIn</Button>
      </Link>
    </div> */}
    <NavbarToggle />
    <NavbarCollapse>
      <Navbar.Link active={path ==='/'} as={'div'}>
        <Link to='/' className='text-lg hover:text-purple-700 hover:underline'>Home</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/admindashboardpage/userlist'} as={'div'}>
        <Link to='/admindashboardpage/userlist' className='text-lg hover:text-purple-700 hover:underline'>User List</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/admindashboardpage/orderlist'} as={'div'}>
        <Link to='/admindashboardpage/orderlist' className='text-lg hover:text-purple-700 hover:underline'>Order List</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/footer'} as={'div'}>
        <Link to='/footer' className='text-lg hover:text-purple-700 hover:underline'>About</Link>
      </Navbar.Link>
      <Navbar.Link>
        <button onClick={handleLogout} className='text-lg hover:text-purple-700 hover:underline'>Logout</button>
      </Navbar.Link>
    </NavbarCollapse>
  </Navbar>
  {/* Marquee */}
  <div className=" p-2 font-extrabold text-center text-sm sm:text-lg bg-gradient-to-t from-blue-500 via-indigo-500 to-purple-500 relative">
        <marquee>
          <b>Door step petrol & service ( happy journey )</b>
        </marquee>
      </div>
  </div>
}
export default AdminTopBarPage;