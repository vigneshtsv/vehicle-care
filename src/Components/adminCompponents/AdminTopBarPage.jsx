// import { Navbar, NavbarCollapse, NavbarToggle } from 'flowbite-react';
// import { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom';
// import logoGIF from '../../assets/logoGIF.gif';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { useLogout } from '../Layout/useLogout';
// import { useDispatch } from 'react-redux';
// import { signOutSuccess } from '../../Redux/Slice/authSlice';
// import { toast } from 'react-toastify';


// function AdminTopBarPage() {
//   const path =  useLocation().pathname
//   const logout = useLogout();
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const handleLogout = () => {
//     logout()
//     dispatch(signOutSuccess())
//   }

//   const handleSearch = () => {
//     toast.info("🔍 Search updates coming soon...");
//   };

//   const toggleMobileSearch = () => {
//     handleSearch();
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };
//   return <div> 
//   <Navbar className='border-b-2 border-blue-500 bg-gradient-to-br from-red-500 via-teal-500 to-gray-500 relative'>
//     <Link to='/' className='self-center rounded-full'>
//       <img src={logoGIF} alt="logo" className='w-20 h-20 self-center rounded-full'/>
//     </Link>
//      <form className='hidden md:block flex-1 max-w-md mx-4'>
//           <div className="relative">
//             <input
//               className='w-full h-8 sm:h-10 pl-4 pr-12 rounded-full border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-transparent placeholder:text-white placeholder:font-semibold placeholder:italic text-white text-sm sm:text-base'
//               placeholder='Search your Service & Products...'
//               type="search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <button
//               type="submit"
//               onClick={(e) => { e.preventDefault(); handleSearch(); }}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-transparent hover:bg-blue-800 rounded-full flex items-center justify-center text-white hover:text-white transition-colors duration-200"
//             >
//               <AiOutlineSearch className="text-sm sm:text-base" />
//             </button>
//           </div>
//         </form>
//         <button 
//           onClick={toggleMobileSearch}
//           className='w-10 h-8 md:hidden bg-transparent border border-blue-800 rounded-full flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors duration-200 mr-2'
//         >
//           <AiOutlineSearch className="text-sm" />
//         </button>
//     {/* <div>
//       <Link to='/login'>
//         <Button gradientDuoTone='purpleToPink' outline>SignIn</Button>
//       </Link>
//     </div> */}
//     <NavbarToggle />
//     <NavbarCollapse>
//       <Navbar.Link active={path ==='/admindashboardpage'} as={'div'}>
//         <Link to='/admindashboardpage ' className='text-lg hover:text-purple-700 hover:underline'>Home</Link>
//       </Navbar.Link>
//       <Navbar.Link active={path ==='/userlist'} as={'div'}>
//         <Link to='/userlist' className='text-lg hover:text-purple-700 hover:underline'>User List</Link>
//       </Navbar.Link>
//       <Navbar.Link active={path ==='/orderlist'} as={'div'}>
//         <Link to='/orderlist' className='text-lg hover:text-purple-700 hover:underline'>Order List</Link>
//       </Navbar.Link>
//       <Navbar.Link active={path ==='/footer'} as={'div'}>
//         <Link to='/footer' className='text-lg hover:text-purple-700 hover:underline'>About</Link>
//       </Navbar.Link>
//       <Navbar.Link>
//         <button onClick={handleLogout} className='text-lg hover:text-purple-700 hover:underline'>Logout</button>
//       </Navbar.Link>
//     </NavbarCollapse>
//   </Navbar>
//   {/* Marquee */}
//     {/*Animation Marquee */}
//       <div 
//         className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2 overflow-hidden"
//         style={{ position: 'relative' }}
//       >
//         <div 
//           className="whitespace-nowrap"
//           style={{
//             animation: 'scroll 20s linear infinite',
//             display: 'inline-block'
//           }}
//         >
//           <span className="inline-block px-8 font-bold text-sm lg:text-base">
//             🚗 Door step petrol & service - Happy journey! 
//           </span>
//           <span className="inline-block px-8 font-bold text-sm lg:text-base">
//             ⭐ 24/7 Service Available 
//           </span>
//           <span className="inline-block px-8 font-bold text-sm lg:text-base">
//             🛠️ Professional Maintenance Team 
//           </span>
//           <span className="inline-block px-8 font-bold text-sm lg:text-base">
//             📞 Book Your Service Now!
//           </span>
//         </div>
//       </div>

//       <style jsx='true'>{`
//         @keyframes scroll {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//       `}</style>
//   </div>
// }
// export default AdminTopBarPage;



import { Navbar, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoGIF from '../../assets/logoGIF.gif';
import { AiOutlineSearch, AiOutlineSecurityScan } from 'react-icons/ai';
import { useLogout } from '../Layout/useLogout';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../Redux/Slice/authSlice';
import { toast } from 'react-toastify';
import { Fuel, Truck, User, Wrench } from 'lucide-react';


function AdminTopBarPage() {
  const path =  useLocation().pathname
  const logout = useLogout();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDashboard, setCurrentDashboard] = useState('Admin');
  const navigate = useNavigate();
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

  const getDashboard = () => {
    const path = location.pathname;
    if (path.includes("customerdashboard")) return "Customer";
    if (path.includes("deliveryboydashboard")) return "DeliveryBoy";
    if (path.includes("servicemandashboard")) return "ServiceMan";
    if (path.includes("petrolstationdashboard")) return "PetrolStation";
    if (path.includes("admindashboardpage")) return "Admin";
    return null;
  };

  useEffect(() => {
    setCurrentDashboard(getDashboard());
  }, [path]);

  const handleCustomerDashboard = () => {
    navigate('/customerdashboard');
    toast.success("Welcome to Customer Dashboard!");
  };

  const handleDeliveryBoyDashboard = () => {
    navigate('/deliveryboydashboard');
    toast.success("Welcome to Delivery Boy Dashboard!");
  };

  const handleServiceManDashboard = () => {
    navigate('/servicemandashboard');
    toast.success("Welcome to Service Man Dashboard!");
  };

  const handlePetrolStationDashboard = () => {
    navigate('/petrolstationdashboard');
    toast.success("Welcome to Petrol Station Dashboard!");
  };

  const handleAdminDashboard = () => {
    navigate('/admindashboardpage');
    toast.success("Welcome to Admin Dashboard!");
  };
  return (
    <div>
      <Navbar className="border-b-2 border-blue-500 bg-gradient-to-br from-red-500 via-teal-500 to-gray-500 relative">
        <Link to="/" className="self-center rounded-full">
          <img
            src={logoGIF}
            alt="logo"
            className="w-20 h-20 self-center rounded-full"
          />
        </Link>
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
        {/* <div>
      <Link to='/login'>
        <Button gradientDuoTone='purpleToPink' outline>SignIn</Button>
      </Link>
    </div> */}
        <NavbarToggle />
        <NavbarCollapse>
          <Navbar.Link active={path === "/admindashboardpage"} as={"div"}>
            <Link
              to="/admindashboardpage "
              className="text-lg hover:text-purple-700 hover:underline"
            >
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/userlist"} as={"div"}>
            <Link
              to="/userlist"
              className="text-lg hover:text-purple-700 hover:underline"
            >
              User List
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/orderlist"} as={"div"}>
            <Link
              to="/orderlist"
              className="text-lg hover:text-purple-700 hover:underline"
            >
              Order List
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/footer"} as={"div"}>
            <Link
              to="/footer"
              className="text-lg hover:text-purple-700 hover:underline"
            >
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link>
            <button
              onClick={handleLogout}
              className="text-lg hover:text-purple-700 hover:underline"
            >
              Logout
            </button>
          </Navbar.Link>
        </NavbarCollapse>
      </Navbar>
      {/* Dashboard Navigation Part */}
      {/* <div className="min-h-screen bg-gray-50 p-6">
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-200">
      <div className="flex items-center">
        <div className="p-3 bg-white bg-opacity-20 rounded-full"> 
         <div>
         <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-200"><User /> Customer Dashboard</h2>
         <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Manage your services and orders</p>
         </div>
        </div>
      </div>
      <button>
      <div>
        <h2><Truck /> DeliveryBoy Dashboard</h2>
      <p>Manage your deliveries and logistics</p>
      </div>
    </button>
    <button>
      <div>
        <h2><Wrench /> ServiceMan Dashboard</h2>
      <p>Manage your service requests and repairs</p>
      </div>
    </button>
    <button>
      <div>
        <h2><Fuel /> PetrolStation Dashboard</h2>
      <p>Manage your petrol station operations</p>
      </div>
    </button>
    </div>
  </div> */}
      <nav className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-500 via-blue-700 to-red-600 shadow-lg transition-colors duration-700 ease-in-out'>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
              <button
                onClick={() => {handleCustomerDashboard()}}
                className={`px-4 py-2 rounded-lg ${
                  currentDashboard === "Customer"
                    ? "bg-blue-500 text-white"
                    : "bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] text-gray-800 hover:scale-105 hover:bg-blue-100"
                }`}
              >
               <div className='flex justify-between'><User /> <b>Customer Dashboard</b></div>
               <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Manage your services and orders</p>
              </button>
              <button
                onClick={() => {handleDeliveryBoyDashboard()}}
                className={`px-4 py-2 rounded-lg ${
                  currentDashboard === "DeliveryBoy"
                    ? "bg-blue-500 text-white"
                    : "bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] text-gray-800 hover:scale-105 hover:bg-blue-100"
                }`}
              >
               <div className='flex justify-between'><Truck /> <b>Delivery Boy Dashboard</b></div>
               <p>Manage your deliveries and logistics</p>
              </button>
              <button
                onClick={() => {handleServiceManDashboard()}}
                className={`px-4 py-2 rounded-lg ${
                  currentDashboard === "ServiceMan"
                    ? "bg-blue-500 text-white"
                    : "bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80]  text-gray-800 hover:scale-105 hover:bg-blue-100"
                }`}
              >
                <div className='flex justify-between'><Wrench /> <b>Service Man Dashboard</b></div>
                <p>Manage your service requests and repairs</p>
              </button>
              <button
                onClick={() => {handlePetrolStationDashboard()}}
                className={`px-4 py-2 rounded-lg ${
                  currentDashboard === "PetrolStation"
                    ? "bg-blue-500 text-white"
                    : "bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] text-gray-800 hover:scale-105 hover:bg-blue-100"
                }`}
              >
                <div className='flex justify-between'><Fuel /> <b>Petrol Station Dashboard</b></div>
                <p>Manage your petrol station operations</p>
              </button>
              <button
                onClick={() => {handleAdminDashboard()}}
                className={`px-4 py-2 rounded-lg ${
                  currentDashboard === "Admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gradient-to-r from-[#6b7280] via-[#22c55e] to-[#4ade80] text-gray-800 hover:scale-105 hover:bg-blue-100"
                }`}
              >
                <div className='flex justify-between'><AiOutlineSecurityScan /> <b>Admin Dashboard</b></div>
                <p>Manage all operations and users</p>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/*Animation Marquee */}
      <div
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2 overflow-hidden"
        style={{ position: "relative" }}
      >
        <div
          className="whitespace-nowrap"
          style={{
            animation: "scroll 20s linear infinite",
            display: "inline-block",
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

      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
export default AdminTopBarPage;