import { Navbar, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLogout } from '../Layout/useLogout';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../Redux/Slice/authSlice';
import { toast } from 'react-toastify';


function AdminTopBarPage() {
  const path =  useLocation().pathname
  const logout = useLogout();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = () => {
    logout()
    dispatch(signOutSuccess())
  }

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
  return <div> 
  <Navbar className='border-b-2 border-blue-500 bg-gradient-to-br from-red-500 via-teal-500 to-gray-500 relative'>
    <Link to='/' className='self-center rounded-full'>
      <img src={logoGIF} alt="logo" className='w-20 h-20 self-center rounded-full'/>
    </Link>
     <form className='hidden md:block flex-1 max-w-md mx-4'>
          <div className="relative">
            <input
              className='w-full h-8 sm:h-10 pl-4 pr-12 rounded-full border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-transparent placeholder:text-white placeholder:font-semibold placeholder:italic text-white text-sm sm:text-base'
              placeholder='Search your Service & Products...'
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              onClick={(e) => { e.preventDefault(); handleSearch(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-transparent hover:bg-blue-800 rounded-full flex items-center justify-center text-white hover:text-white transition-colors duration-200"
            >
              <AiOutlineSearch className="text-sm sm:text-base" />
            </button>
          </div>
        </form>
        <button 
          onClick={toggleMobileSearch}
          className='w-10 h-8 md:hidden bg-transparent border border-blue-800 rounded-full flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors duration-200 mr-2'
        >
          <AiOutlineSearch className="text-sm" />
        </button>
    {/* <div>
      <Link to='/login'>
        <Button gradientDuoTone='purpleToPink' outline>SignIn</Button>
      </Link>
    </div> */}
    <NavbarToggle />
    <NavbarCollapse>
      <Navbar.Link active={path ==='/admindashboardpage'} as={'div'}>
        <Link to='/admindashboardpage ' className='text-lg hover:text-purple-700 hover:underline'>Home</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/userlist'} as={'div'}>
        <Link to='/userlist' className='text-lg hover:text-purple-700 hover:underline'>User List</Link>
      </Navbar.Link>
      <Navbar.Link active={path ==='/orderlist'} as={'div'}>
        <Link to='/orderlist' className='text-lg hover:text-purple-700 hover:underline'>Order List</Link>
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
  </div>
}
export default AdminTopBarPage;