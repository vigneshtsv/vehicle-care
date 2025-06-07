// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet, useNavigate } from 'react-router-dom';

// export default function petrolStationProtect() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     navigate(-1); // go to the previous page
//   }

//   return currentUser?.Role === 'PetrolStation' || currentUser?.Role === 'Admin' ? (
//     <Outlet />
//   ) : (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-6 rounded-xl shadow-lg text-center space-y-4">
//         <p className='text-xl font-semibold'>🚫 This is access Only for PetrolStation</p>
//         <button
//           onClick={handleGoBack}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//         >
//           🔙 Go Back
//         </button>
//       </div>
//     </div>
//   );
// }

