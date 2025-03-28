import { Navbar, TextInput, Button, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLogout } from '../Layout/useLogout';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../Redux/Slice/authSlice';


function AdminTopBarPage() {
  const path =  useLocation().pathname
  const logout = useLogout();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout()
    dispatch(setCurrentUser(null))
  }
  return <>
  <Navbar className='border-b-2 border-blue-500'>
    <Link to='/' className='self-center'>
      <img src={logoGIF} alt="logo" className='w-20 h-20 self-center'/>
    </Link>
    <form>
        <TextInput 
        type='text' 
        placeholder='Serach your Service & Products...' 
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline lg:p-96'
        />
    </form>
    <Button className='w-12 h-10 lg:hidden' gradientDuoTone="purpleToPink" outline pill>
      <AiOutlineSearch />
    </Button>
    {/* <div>
      <Link to='/login'>
        <Button gradientDuoTone='purpleToPink' outline>SignIn</Button>
      </Link>
    </div> */}
    <NavbarToggle />
    <NavbarCollapse>
      <Navbar.Link active={path ==='/'} as={'div'}>
        <Link to='/'>Home</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/admindashboardpage/userlist'} as={'div'}>
        <Link to='/admindashboardpage/userlist'>User List</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/admindashboardpage/orderlist'} as={'div'}>
        <Link to='/admindashboardpage/orderlist'>Order List</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/footer'} as={'div'}>
        <Link to='/footer'>About</Link>
      </Navbar.Link>
      <Navbar.Link>
        <button onClick={handleLogout}>Logout</button>
      </Navbar.Link>
    </NavbarCollapse>
  </Navbar>
  </>
}
export default AdminTopBarPage;