// import React from 'react'
// import TopBar from '../Components/UserComponents/TopBar.jsx'
// import { Card, Carousel } from 'flowbite-react'
// import { Link } from 'react-router-dom'
// import Footer from '../Components/UserComponents/Footer.jsx'



// function CustomerDashboard() {
//   return <div>
//       <TopBar />
//       <h1 className='text-center text-4xl m-4'>Customer Dashboard</h1>
//       <h1 className='text-center text-4xl m-4'>Offers and Rewards</h1>
//       <div className="h-60 shadow-lg m-5">
//          <Carousel>
//            <img src="/src/assets/petrol-image1.jpg" alt="display image" className='w-full h-auto'/>
//            <img src="/src/assets/petrol-image2.png" alt="display image" className='w-full h-auto'/>
//            <img src="/src/assets/petrol-image3.png" alt="display image" className='w-full h-auto'/>
//            <img src="/src/assets/petrol-image4.png" alt="display image" className='w-full h-auto'/>
//            <img src="/src/assets/petrol-image5.png" alt="display image" className='w-full h-auto'/>
//          </Carousel>
//       </div>
//         <h1 className='text-center text-4xl m-4'>Explore Our Services</h1>
      
//       <div className='flex flex-row justify-between my-10'> 
//         {/* petrol-card */}
//       <div>
//       <Card
//       className="w-72 h-80 m-10 shadow-xl"
//       imgAlt="petrol bump"
//       imgSrc="../../assets"
//       >
//       <h3 className="text-2xl font-bold tracking-tight text-gray-900">
//         Petrol
//       </h3>
//       <p>Do you Want petrol click me</p>
//       <button className='bg-blue-700 text-center p-3 text-red-100'>Click Me</button>
//     </Card>
//       </div>


//       {/* disel-card */}
//       <Link to='./topbar'>
//       <Card
//       className="w-72 h-80 m-10 shadow-xl"
//       imgAlt="petrol bump"
//       imgSrc="../../assets"
//     >
//       <h3 className="text-2xl font-bold tracking-tight text-gray-900">
//         Disel
//       </h3>
//       <p>Do you Want Disel click me</p>
//       <button className='bg-blue-700 text-center p-3 text-red-100'>Click Me</button>
//     </Card>
//       </Link>

//       {/* service-card */}
//       <Link to='./sigupnavigation'>
//       <Card
//       className="w-72 h-80 m-10 shadow-xl"
//       imgAlt="petrol bump"
//       imgSrc="../../assets"
//     >
//       <h3 className="text-2xl font-bold tracking-tight text-gray-900">
//         Service Center
//       </h3>
//       <p>Do you Want Service click me</p>
//       <button className='bg-blue-700 text-center p-3 text-red-100'>Click Me</button>
//     </Card>
//       </Link>
//       </div>
      
//       {/* carousel-part */}
//       <div className="h-96 shadow-lg m-5">
//       <Carousel>
//         <img src="/src/assets/petrol-image1.jpg" alt="display image" className='w-full h-auto'/>
//         <img src="/src/assets/petrol-image2.png" alt="display image" className='w-full h-auto'/>
//         <img src="/src/assets/petrol-image3.png" alt="display image" className='w-full h-auto'/>
//         <img src="/src/assets/petrol-image4.png" alt="display image" className='w-full h-auto'/>
//         <img src="/src/assets/petrol-image5.png" alt="display image" className='w-full h-auto'/>
//       </Carousel>
//     </div>
//     <Footer />
//   </div>
// }

// export default CustomerDashboard;


import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react'
import TopBar from '../Components/UserComponents/TopBar';
import Footer from '../Components/UserComponents/Footer';
import { useNavigate } from 'react-router-dom';
import { CarouselOne } from '../Components/Layout/CarouselOne';


const CustomerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickMe = () => {
    navigate('/mappage')
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* First Carousel Division */}
      <TopBar />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
       <CarouselOne />
     </div>

      {/* Card Division */}
      <div className="flex justify-center">

        {/* First Card */}
        <Card className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-center p-6">
            <img 
              src="/api/placeholder/300/300" 
              alt="Petrol" 
              className="mb-4 rounded-full shadow-lg w-48 h-48 object-cover"
            />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Petrol
            </h2>
            <h3 className="text-sm text-gray-500 mb-4">
              Do you Want petrol click me
            </h3>
            <Button 
              onClick={handleClickMe}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Click Me
            </Button>
          </div>
        </Card>

        {/* second card */}
        <Card className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-center p-6">
            <img 
              src="/api/placeholder/300/300" 
              alt="Petrol" 
              className="mb-4 rounded-full shadow-lg w-48 h-48 object-cover"
            />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Disel
            </h2>
            <h3 className="text-sm text-gray-500 mb-4">
              Do you Want Disel click me
            </h3>
            <Button 
              onClick={handleClickMe}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Click Me
            </Button>
          </div>
        </Card>

        {/* third card */}
        <Card className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-center p-6">
            <img 
              src="/api/placeholder/300/300" 
              alt="Petrol" 
              className="mb-4 rounded-full shadow-lg w-48 h-48 object-cover"
            />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Bike Service Center
            </h2>
            <h3 className="text-sm text-gray-500 mb-4">
              Do you Want Your Bike Service click me
            </h3>
            <Button 
              onClick={handleClickMe}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Click Me
            </Button>
          </div>
        </Card>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Petrol Order Confirmation</h2>
            <p className="mb-6 text-gray-600">Would you like to proceed with your petrol order?</p>
            <div className="flex justify-between">
              <Button 
                onClick={handleCloseModal}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Confirm Order
              </Button>
              <Button 
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <CarouselOne />
      <br />
      <Footer />
    </div>
  );
};

export default CustomerDashboard;