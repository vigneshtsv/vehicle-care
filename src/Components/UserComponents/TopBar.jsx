import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownItem, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';


function TopBar() {
  const path =  useLocation().pathname;
  const {currentUser} = useSelector((state)=>state.user)
 console.log(currentUser);
 
  return <>
  <div className='flex w-full justify-around'>
     <Link to='/' className='self-center'>
       <img src={logoGIF} alt="logo" className='w-20 h-20 self-center'/>
     </Link>
        <div>
        <TextInput 
      type='text' 
      placeholder='Serach your Service & Products' 
      rightIcon={AiOutlineSearch}
      className='hidden lg:inline p-96'
      />
        </div>
        
      <ul className='flex gap-5'>
        <li className='font-extrabold py-8 text-blue-600 hover:text-sky-500'><a href="/"  active={path ==='/'} as={'div'}>HOME</a></li>
        <li className='font-extrabold py-8 text-blue-600 hover:text-sky-500'><a href="/footer"  active={path ==='/footer'} as={'div'}>ABOUT</a></li>
        <li className='font-extrabold py-8 text-blue-600 hover:text-sky-500'><a href="/loginform"  active={path ==='/loginform'} as={'div'}>LOGIN</a></li>
        <li className='font-extrabold py-8 text-blue-600 hover:text-sky-500'><a href="/admintopbarpage"  active={path ==='/admintopbarpage'} as={'div'}>YOUR ORDER</a></li>
      </ul>
      <div className='gap-2 p-6'>
      {currentUser ? (
        <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.ProfilePicture} rounded /> }>
          <Dropdown.Header>
            <span>{currentUser.data.FirstName}</span>
          </Dropdown.Header>
          <Link to='/dashboardprofile'>
            <DropdownItem> Profile </DropdownItem>
          </Link>
          <DropdownDivider />
           <Dropdown.Item>Sigin Out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to='/loginform'>
          <Button gradientDuoTone='purpleToPink' outline>
           Signin
          </Button>
        </Link>
      ) }
    </div>
    </div>
   
    {/* Topbar sticky */}
    <div className='bg-gray-300 p-4 font-extrabold text-xl '>
      <span><b>Door step petrol & service ( happy journey )</b></span>
    </div>
  </>
}

export default TopBar;