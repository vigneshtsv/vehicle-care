import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react'
import TopBar from '../Components/UserComponents/TopBar';
import Footer from '../Components/UserComponents/Footer';
import { useNavigate } from 'react-router-dom';
import { CarouselOne } from '../Components/Layout/CarouselOne';
import AdminTopBarPage from '../Components/adminCompponents/AdminTopBarPage';
import { useSelector } from 'react-redux';
import { CarouselSecond } from '../Components/Layout/CarouselSecond';


const CustomerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClickMe = () => {
    navigate('/mappage')
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='customerdashboardbg'>
      {/* First Carousel Division */}
      {currentUser.Role === 'Customer'? <TopBar /> : <AdminTopBarPage />}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
       <CarouselOne />
     </div>

      {/* Card Division */}
      <div className="flex justify-center flex-col md:flex-row p-6 gap-6">

        {/* First Card */}
        <Card className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-center p-6">
            <img 
              src="https://etimg.etb2bimg.com/photo/72500303.cms" 
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
              src="https://vuvanalytics.com/wp-content/uploads/2022/04/diesel-flow.jpg" 
              alt="Disel" 
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
              src="https://rukminim2.flixcart.com/image/850/1000/l2qhjm80/tool-kit/d/q/f/bicycle-repair-kit-with-storage-box-complete-bicycle-44-pcs-original-imageysuckpsw2cp.jpeg?q=20&crop=false" 
              alt="Service" 
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
      <CarouselSecond />
      <Footer />
    </div>
  );
};

export default CustomerDashboard;