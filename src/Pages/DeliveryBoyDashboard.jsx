// import React from 'react'
// import TopBar from '../Components/UserComponents/TopBar'
// import { Carousel } from "flowbite-react";
// import { Card } from "flowbite-react"
// import Footer from '../Components/UserComponents/Footer';

// function DeliveryBoyDashboard() {
//   return <>
//   <TopBar />
//   <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//       <Carousel>
//         <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
//       </Carousel>
//     </div>
//     <div className='flex flex-row justify-between'>
//       {/* card with plan a trip */}
//        <Card
//          className="max-w-sm m-5"
//          imgAlt="pickup"
//          imgSrc=""
//        >
//          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//            Pickup
//          </h5>
//        </Card>
//        {/* card with plan a trip */}
//        <Card
//          className="max-w-sm m-5"
//          imgAlt="Delivery"
//          imgSrc=""
//        >
//          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//              Delivery
//          </h5>
//        </Card>
//        {/* card with plan a trip */}
//        <Card
//          className="max-w-sm m-5"
//          imgAlt="Plan a Trip"
//          imgSrc=""
//        >
//          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//            Plan a Trip
//          </h5>
//        </Card>
//      </div>
//        {/* Carousel of the photos */}
//       <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//           <Carousel>
//             <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
//             <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
//             <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
//             <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
//             <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
//           </Carousel>
//      </div>
//      <Footer />
//   </>
// }

// export default DeliveryBoyDashboard


//!calude.ai react code with deliveryboydashboard


import React, { useState } from 'react';
import { Card, Carousel } from "flowbite-react";
import TopBar from '../Components/UserComponents/TopBar';
import Footer from '../Components/UserComponents/Footer';
import { Bell, CheckCircle, Map, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeliveryBoyDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate= useNavigate()
  const [orders, setOrders] = useState([
    {
      id: 1,
      stationName: "Shell Station Downtown",
      customer: "Vignesh TSV",
      address: "123 Main Street",
      status: "Pending",
      dateTime: "2025-01-06T10:30:00",
      quantity: "500",
      fuelType: "Regular Petrol"
    },
    {
      id: 2,
      stationName: "VP Station",
      customer: "Sangar TRS",
      address: "123 Main Street",
      status: "Pending",
      dateTime: "2025-01-07T10:30:00",
      quantity: "90",
      fuelType: "Regular Disel"
    }
  ]);

  // Sample delivery images
  const deliveryImages = [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ];

  // // Sample orders
  // const orders = [
  //   { id: 1, customer: "John Doe", address: "123 Main St", status: "Pending Pickup" },
  //   { id: 2, customer: "Jane Smith", address: "456 Elm St", status: "In Transit" }
  // ];

  const handlePickupOrder = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
    setOrders(orders.map(msg => 
      msg.id === order.id ? {...msg, status: 'In Progress'} : msg
    ));
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };
  const  mapTrackingNavigate = () => {
    navigate('/maptracking')
  }

  return (
    <div className="container mx-auto p-4">
      <TopBar />
      {/* Image Carousel Section */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
       <Carousel>
         <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
         <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
         <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
         <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
         <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
       </Carousel>
     </div>

      {/* Orders and Actions Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <h3 className="text-lg font-semibold mb-2">{order.customer}</h3>
            <p className="text-gray-600 mb-3">{order.address}</p>
            <p className="text-sm text-gray-500 mb-4">{order.status}</p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handlePickupOrder(order)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Pickup Order
              </button>
              
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Delivery Details
              </button>
              
              <button 
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
              >
                Plan Trip
              </button>
            </div>
          </div>
        ))}
      </div> */}
      
      {/* Orders and Actions Sections for new */}
      <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Petrol Delivery Orders</h2>
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {orders.filter(msg => msg.status === 'Pending').length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white shadow-md rounded-lg p-4 border">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{order.stationName}</h3>
              <p className="text-gray-600 mb-1">{order.address}</p>
              <p className="text-sm text-gray-500">{formatDateTime(order.dateTime)}</p>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {order.quantity}Ltr - {order.fuelType}
                </span>
                <span className={`ml-2 inline-block text-sm px-2 py-1 rounded ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handlePickupOrder(order)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                <Truck className="h-4 w-4 mr-2" />
                Pickup Order
              </button>

              <button
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Delivery Details
              </button>

              <button
                className="flex items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                onClick={mapTrackingNavigate}
              >
                <Map className="h-4 w-4 mr-2" />
                Plan Trip
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>

      {/* Popup for Order Pickup */}
      {isPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Pickup Confirmation</h2>
            <p className="mb-4">Order for: {selectedOrder.customer}</p>
            <p className="mb-4">Delivery Address: {selectedOrder.address}</p>
            
            <div className="flex justify-between">
              <button 
                onClick={() => {/* Confirm pickup logic */}}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirm Pickup
              </button>
              
              <button 
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default DeliveryBoyDashboard;