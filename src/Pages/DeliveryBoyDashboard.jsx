import React, { useEffect, useState } from 'react';
import { Button, Card } from "flowbite-react";
import TopBar from '../Components/UserComponents/TopBar';
import Footer from '../Components/UserComponents/Footer';
import { Bell, CheckCircle, Map, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CarouselOne } from '../Components/Layout/CarouselOne';
import { toast } from 'react-toastify';

const DeliveryBoyDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate= useNavigate()
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    id: '',
    Status: ''
  })
  const [isDeliveryPopupOpen, setIsDeliveryPopupOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/order/deliveryboydata`);  
      
      if(response.status===200){
        setOrders(response.data.deliveryBoy);
        toast.success('DeliveryBoyData fetched successfully')
        console.log(response.data.deliveryBoy);
      }
    } catch (error) {
      console.error('DeliveryBoyData fetching Error:',error);
      toast.error('DeliveryBoyData fetching Error:')
    }
    finally{
      setLoading(false);
    }
  };
 
 
  useEffect(() => {
    fetchData()
  },[]);

  const handlePickupOrder = (order) => {
    setSelectedOrder(order);
    setFormData({
      id: order._id,
      Status: 'Processing'
    })
    setIsPopupOpen(true);
    console.log(formData);
  };

  const handleConfirmPickup = async () => {
    setLoading(true);
    console.log(selectedOrder._id);
    const updatedData = { id: selectedOrder._id, Status: 'Processing' };
    try {
      const response = await axios.put(`http://localhost:5000/api/order/updateorderdata/${selectedOrder._id}`,
        updatedData
      );

      if(response.status===200){
        setOrders(orders.map(order => order._id === selectedOrder._id ? {...order, Status: "Processing"} : order));
        toast.success('Order picked up successfully');
        setIsPopupOpen(false);
      }
    } catch (error) {
      console.error('Error updating order status:',error);
      toast.error('Failed to update order status');
    }finally{
      setLoading(false);
    }
  }

  const handleDeliveryDetails = (order) => {
    setSelectedOrder(order);
    setIsDeliveryPopupOpen(true);
  };

  const handleCompleteDelivery = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/order/updateorderdata/${selectedOrder._id}`,
        {id: selectedOrder._id, Status: 'Completed'}
      );

      if(response.status===200){
        setOrders(orders.map(order => order._id === selectedOrder._id ? {...order, Status: 'Completed'} : order));
        toast.success('Order delivered successfully');
        setIsDeliveryPopupOpen(false);
      }
    }catch (error) {
      console.error('Error updating order status:',error);
      toast.error('Failed to update order status');
  }finally{
    setLoading(false);
  }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCloseDeliveryPopup = () => {
    setIsDeliveryPopupOpen(false);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };
  const OrderTrackingNavigate = () => {
    navigate('/ordertracking')
  }

  return (
    <>
    <TopBar />
    <div className="container mx-auto p-4">
      {/* Image Carousel Section */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
      </div>


      {/*Waiting Orders and Actions Sections */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Waiting Orders</h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {orders.filter((order) => order.Status === "Waiting" && 
                ((typeof order.Petrol_Quantity === 'number' && order.Petrol_Quantity > 0) || 
                (typeof order.Disel_Quantity === 'number' && order.Disel_Quantity > 0))).length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.filter((order) => order.Status === "Waiting" && 
                ((typeof order.Petrol_Quantity === 'number' && order.Petrol_Quantity > 0) || 
                (typeof order.Disel_Quantity === 'number' && order.Disel_Quantity > 0)))
            .map((order) => (
              <Card
                key={order._id}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Email Id: {order.Email}
                  </h3>
                  <h4>Petrol Station Name: {order.StationName}</h4>
                  <p className="text-gray-600 mb-1">{order.Location}</p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(order.createdAt)}
                  </p>
                  <div className="mt-2">
                    {order.Petrol_Quantity > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded">
                        {order.Petrol_Quantity}-Ltr {order.Petrol_Price}
                      </span>
                    )}
                    <br />
                    {order.Disel_Quantity > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded">
                        {order.Disel_Quantity}-Ltr {order.Disel_Price}
                      </span>
                    )}
                    <span className="ml-2 inline-block text-sm px-2 py-1 rounded bg-blue-500 text-orange-200">
                      {order.Status}
                    </span>
                  </div>
                </div>

                {/* pickup and plan trip buttons */}
                <div className="flex space-x-3">
                <Button
                  onClick={() => handlePickupOrder(order)}
                  gradientMonochrome="info"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Pickup Order
                </Button>

                <Button 
                onClick={()=> handleDeliveryDetails(order)}
                gradientMonochrome="lime">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Delivery Details
                </Button>

                <Button
                  gradientMonochrome="purple"
                  onClick={OrderTrackingNavigate}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Plan Trip
                </Button>
              </div>
              </Card>
            ))}
        </div>
      </div>

      {/*Prcessing Orders and Actions Sections */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Processing Orders</h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {orders.filter((order) => order.Status === "Processing" && 
                ((typeof order.Petrol_Quantity === 'number' && order.Petrol_Quantity > 0) || 
                (typeof order.Disel_Quantity === 'number' && order.Disel_Quantity > 0))).length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.filter((order) => order.Status === "Processing" && 
                ((typeof order.Petrol_Quantity === 'number' && order.Petrol_Quantity > 0) || 
                (typeof order.Disel_Quantity === 'number' && order.Disel_Quantity > 0)))
            .map((order) => (
            <Card
              key={order.id}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Email Id:{order.Email}
                </h3>
                <h4>PetrolStation Name:{order.StationName}</h4>
                <p className="text-gray-600 mb-1">{order.Location}</p>
                <p className="text-sm text-gray-500">
                  {formatDateTime(order.createdAt)}
                </p>
                <div className="mt-2">
                    {order.Petrol_Quantity > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded">
                        {order.Petrol_Quantity}-Ltr {order.Petrol_Price}
                      </span>
                    )}
                    <br />
                    {order.Disel_Quantity > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded">
                        {order.Disel_Quantity}-Ltr {order.Disel_Price}
                      </span>
                    )}
                    <span className="ml-2 inline-block text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">
                      {order.Status}
                    </span>
                  </div>
              </div>

              {/* Buttons pickup and plan trip */}
              <div className="flex space-x-2">
                <Button 
                onClick={()=> handleDeliveryDetails(order)}
                gradientDuoTone="purpleToPink"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Delivery Details
                </Button>

                <Button
                  gradientDuoTone="tealToLime"
                  onClick={OrderTrackingNavigate}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Plan Trip
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/*Completed Orders and Actions Sections */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Completed Orders</h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {orders.filter((order) => order.Status === "Completed" && 
                ((typeof order.Petrol_Quantity === 'number' && order.Petrol_Quantity > 0) || 
                (typeof order.Disel_Quantity === 'number' && order.Disel_Quantity > 0))).length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.filter((order) => order.Status === "Completed" && 
                ((typeof order.Petrol_Quantity === 'number' && order.Petrol_Quantity > 0) || 
                (typeof order.Disel_Quantity === 'number' && order.Disel_Quantity > 0)))
            .map((order) => (
            <Card
              key={order.id}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Email Id:{order.Email}
                </h3>
                <h4>PetrolStation Name:{order.StationName}</h4>
                <p className="text-gray-600 mb-1">{order.Location}</p>
                <p className="text-sm text-gray-500">
                  {formatDateTime(order.createdAt)}
                </p>
                <div className="mt-2">
                    {order.Petrol_Quantity > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded">
                        {order.Petrol_Quantity}-Ltr {order.Petrol_Price}
                      </span>
                    )}
                    <br />
                    {order.Disel_Quantity > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded">
                        {order.Disel_Quantity}-Ltr {order.Disel_Price}
                      </span>
                    )}
                    <span className="ml-2 inline-block text-sm px-2 py-1 rounded bg-green-500 text-slate-800">
                      {order.Status}
                    </span>
                  </div>
              </div>

              {/* Buttons pickup and plan trip */}
              <div className="flex">
                <Button 
                onClick={()=> handleDeliveryDetails(order)}
                gradientDuoTone="redToYellow"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Delivery Details
                </Button>
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
            <p className="mb-4">Order for: {selectedOrder.Email}</p>
            <p className="mb-4">Delivery Address: {selectedOrder.Location}</p>

            <div className="flex justify-between">
              <Button
                onClick={handleConfirmPickup}
                outline gradientDuoTone="greenToBlue"
              >
                Confirm Pickup
              </Button>

              <Button
                onClick={handleClosePopup}
                outline gradientDuoTone="pinkToOrange"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
        
        {/* Popup for Order Delivery Details */}
        {isDeliveryPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
            <p className="mb-2">Customer: {selectedOrder.Email}</p>
            <p className="mb-2">Location: {selectedOrder.Location}</p>
            <p className="mb-2">Station: {selectedOrder.StationName}</p>
            
            {selectedOrder.Petrol_Quantity > 0 && (
              <p className="mb-2">Petrol: {selectedOrder.Petrol_Quantity} Liters</p>
            )}
            
            {selectedOrder.Disel_Quantity > 0 && (
              <p className="mb-2">Diesel: {selectedOrder.Disel_Quantity} Liters</p>
            )}
            
            <p className="mb-4">Status: {selectedOrder.Status}</p>

            <div className="flex justify-between">
              {selectedOrder.Status === "Processing" && (
                <Button
                  onClick={handleCompleteDelivery}
                  outline gradientDuoTone="greenToBlue"
                >
                  Mark as Delivered
                </Button>
              )}

              <Button
                onClick={handleCloseDeliveryPopup}
                outline gradientDuoTone="pinkToOrange"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}



      <CarouselOne />
      <br />
      <Footer />
    </div>
    </>
  );
};
export default DeliveryBoyDashboard;