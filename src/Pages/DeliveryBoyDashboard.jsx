import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import TopBar from "../Components/UserComponents/TopBar";
import Footer from "../Components/UserComponents/Footer";
import { Bell, CheckCircle, Map, MapPin, Package, Truck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CarouselOne } from "../Components/Layout/CarouselOne";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminTopBarPage from "../Components/adminCompponents/AdminTopBarPage";
import { CarouselSecond } from "../Components/Layout/CarouselSecond";

const DeliveryBoyDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    id: "",
    Status: "",
  });
  const [isDeliveryPopupOpen, setIsDeliveryPopupOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vehicle-care-api.onrender.com/api/order/deliveryboydata`
      );

      if (response.status === 200) {
        setOrders(response.data.deliveryBoy);
        toast.success("DeliveryBoyData fetched successfully");
        console.log(response.data.deliveryBoy);
      }
    } catch (error) {
      console.error("DeliveryBoyData fetching Error:", error);
      toast.error("DeliveryBoyData fetching Error:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePickupOrder = (order) => {
    setSelectedOrder(order);
    setFormData({
      id: order._id,
      Status: "Processing",
    });
    setIsPopupOpen(true);
    console.log(formData);
  };

  const handleConfirmPickup = async () => {
    setLoading(true);
    console.log(selectedOrder._id);
    const updatedData = { id: selectedOrder._id, Status: "Processing" };
    try {
      const response = await axios.put(
        `https://vehicle-care-api.onrender.com/api/order/updateorderdata/${selectedOrder._id}`,
        updatedData
      );

      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order._id === selectedOrder._id
              ? { ...order, Status: "Processing" }
              : order
          )
        );
        toast.success("Order picked up successfully");
        setIsPopupOpen(false);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryDetails = (order) => {
    setSelectedOrder(order);
    setIsDeliveryPopupOpen(true);
  };

  const handleCompleteDelivery = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://vehicle-care-api.onrender.com/api/order/updateorderdata/${selectedOrder._id}`,
        { id: selectedOrder._id, Status: "Completed" }
      );

      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order._id === selectedOrder._id
              ? { ...order, Status: "Completed" }
              : order
          )
        );
        toast.success("Order delivered successfully");
        setIsDeliveryPopupOpen(false);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
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
    navigate("/ordertracking");
  };

  return (
    <div className="deliveryboybg">
      {currentUser.Role === 'DeliveryBoy'? <TopBar /> : <AdminTopBarPage />}
      {/* Image Carousel Section */}
      <div>
        <CarouselOne />
      </div>
      <div className="container mx-auto p-4">
        {/*Waiting Orders and Actions Sections */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 bg-amber-500 p-3">
            <h1 className="bg-gradient-to-t from-red-500 via-indigo-500 to-teal-500 text-transparent bg-clip-text text-3xl font-bold">Waiting Orders</h1>
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {
                  orders.filter(
                    (order) =>
                      order.Status === "Waiting" &&
                      ((typeof order.Petrol_Quantity === "number" &&
                        order.Petrol_Quantity > 0) ||
                        (typeof order.Disel_Quantity === "number" &&
                          order.Disel_Quantity > 0))
                  ).length
                }
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .filter(
                (order) =>
                  order.Status === "Waiting" &&
                  ((typeof order.Petrol_Quantity === "number" &&
                    order.Petrol_Quantity > 0) ||
                    (typeof order.Disel_Quantity === "number" &&
                      order.Disel_Quantity > 0))
              )
              .map((order) => (
                <Card
                  key={`order-${order._id}-${order.Status}`}
                  className="bg-gradient-to-r from-green-200 via-cyan-100 to-purple-400 shadow-md rounded-lg p-4 border-2 border-dashed border-red-700 
             transform transition-all duration-300 ease-in-out
             hover:scale-105 hover:shadow-2xl hover:border-red-500
             hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-300 hover:to-green-100
             cursor-pointer group"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 transition-colors duration-200 group-hover:text-red-600">
                      Email Id: {order.Email}
                    </h3>
                    <h4 className="transition-colors duration-200 group-hover:text-gray-700">
                      Petrol Station Name: {order.StationName}
                    </h4>
                    <p className="text-gray-600 mb-1 transition-colors duration-200 group-hover:text-gray-800">
                      {order.Location}
                    </p>
                    <p className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
                      {formatDateTime(order.createdAt)}
                    </p>
                    <div className="mt-2">
                      {order.Petrol_Quantity > 0 && (
                        <span
                          className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded
                         transition-all duration-200 hover:bg-blue-200 hover:scale-105 hover:shadow-md"
                        >
                          {order.Petrol_Quantity}-Ltr {order.Petrol_Price}
                        </span>
                      )}
                      <br />
                      {order.Disel_Quantity > 0 && (
                        <span
                          className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded
                         transition-all duration-200 hover:bg-blue-200 hover:scale-105 hover:shadow-md"
                        >
                          {order.Disel_Quantity}-Ltr {order.Disel_Price}
                        </span>
                      )}
                      <span
                        className="ml-2 inline-block text-sm px-2 py-1 rounded bg-blue-500 text-orange-200
                       transition-all duration-200 hover:bg-blue-600 hover:scale-105 hover:shadow-md"
                      >
                        {order.Status}
                      </span>
                    </div>
                  </div>

                  {/* pickup and plan trip buttons */}
                  <div className="flex space-x-3">
                    <button
                      className="p-2 text-sm font-medium text-white bg-blue-500 rounded-lg 
                 transform transition-all duration-200 ease-in-out
                 hover:bg-blue-600 hover:scale-110 hover:shadow-lg hover:-translate-y-1
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300
                 flex items-center"
                      onClick={() => handlePickupOrder(order)}
                    >
                      <Truck className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                      Pickup Order
                    </button>

                    <button
                      className="p-2 gap-2 text-sm font-medium text-white bg-blue-500 rounded-lg 
                 transform transition-all duration-200 ease-in-out
                 hover:bg-green-600 hover:scale-110 hover:shadow-lg hover:-translate-y-1
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300
                 flex items-center"
                      onClick={() => handleDeliveryDetails(order)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2 transition-transform duration-200 hover:rotate-180" />
                      Delivery Details
                    </button>

                    <button
                      className="p-2 gap-2 text-sm font-medium text-white bg-blue-500 rounded-lg 
                 transform transition-all duration-200 ease-in-out
                 hover:bg-purple-600 hover:scale-110 hover:shadow-lg hover:-translate-y-1
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
                 flex items-center"
                      onClick={OrderTrackingNavigate}
                    >
                      <Map className="h-4 w-4 mr-2 transition-transform duration-200 hover:scale-125" />
                      Plan Trip
                    </button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/*Prcessing Orders and Actions Sections */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 p-3 bg-lime-400">
            <h1 className="bg-gradient-to-b from-green-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text text-3xl font-bold">Processing Orders</h1>
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {
                  orders.filter(
                    (order) =>
                      order.Status === "Processing" &&
                      ((typeof order.Petrol_Quantity === "number" &&
                        order.Petrol_Quantity > 0) ||
                        (typeof order.Disel_Quantity === "number" &&
                          order.Disel_Quantity > 0))
                  ).length
                }
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .filter(
                (order) =>
                  order.Status === "Processing" &&
                  ((typeof order.Petrol_Quantity === "number" &&
                    order.Petrol_Quantity > 0) ||
                    (typeof order.Disel_Quantity === "number" &&
                      order.Disel_Quantity > 0))
              )
              .map((order) => (
                <Card
                  key={`order-${order._id}-${order.Status}`}
                  className="bg-gradient-to-r from-fuchsia-300 via-amber-200 to-blue-200 shadow-md rounded-lg p-4 border-2 border-dashed border-green-500 
             transform transition-all duration-300 ease-in-out
             hover:scale-105 hover:shadow-xl hover:border-green-400 hover:bg-gray-50
             cursor-pointer group"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 transition-colors duration-200 group-hover:text-green-600">
                      Email Id: {order.Email}
                    </h3>
                    <h4 className="transition-colors duration-200 group-hover:text-gray-700">
                      PetrolStation Name: {order.StationName}
                    </h4>
                    <p className="text-gray-600 mb-1 transition-colors duration-200 group-hover:text-gray-800">
                      {order.Location}
                    </p>
                    <p className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
                      {formatDateTime(order.createdAt)}
                    </p>
                    <div className="mt-2">
                      {order.Petrol_Quantity > 0 && (
                        <span
                          className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded
                         transition-all duration-200 hover:bg-blue-200 hover:scale-105"
                        >
                          {order.Petrol_Quantity}-Ltr {order.Petrol_Price}
                        </span>
                      )}
                      <br />
                      {order.Disel_Quantity > 0 && (
                        <span
                          className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded
                         transition-all duration-200 hover:bg-blue-200 hover:scale-105"
                        >
                          {order.Disel_Quantity}-Ltr {order.Disel_Price}
                        </span>
                      )}
                      <span
                        className="ml-2 inline-block text-sm px-2 py-1 rounded bg-blue-100 text-blue-800
                       transition-all duration-200 hover:bg-blue-200 hover:scale-105"
                      >
                        {order.Status}
                      </span>
                    </div>
                  </div>

                  {/* Buttons pickup and plan trip */}
                  <div className="flex space-x-2 transform transition-all duration-300 group-hover:translate-y-1">
                    <Button
                      onClick={() => handleDeliveryDetails(order)}
                      gradientDuoTone="purpleToPink"
                      className="transition-all duration-200 hover:scale-110 hover:shadow-lg 
                 active:scale-95 transform"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                      Delivery Details
                    </Button>

                    <Button
                      gradientDuoTone="tealToLime"
                      onClick={OrderTrackingNavigate}
                      className="transition-all duration-200 hover:scale-110 hover:shadow-lg 
                 active:scale-95 transform"
                    >
                      <Map className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:bounce" />
                      Plan Trip
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/*Completed Orders and Actions Sections */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 p-3 bg-violet-600">
            <h1 className="bg-gradient-to-l from-purple-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text text-3xl font-bold">Completed Orders</h1>
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {
                  orders.filter(
                    (order) =>
                      order.Status === "Completed" &&
                      ((typeof order.Petrol_Quantity === "number" &&
                        order.Petrol_Quantity > 0) ||
                        (typeof order.Disel_Quantity === "number" &&
                          order.Disel_Quantity > 0))
                  ).length
                }
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .filter(
                (order) =>
                  order.Status === "Completed" &&
                  ((typeof order.Petrol_Quantity === "number" &&
                    order.Petrol_Quantity > 0) ||
                    (typeof order.Disel_Quantity === "number" &&
                      order.Disel_Quantity > 0))
              )
              .map((order) => (
                <Card
                  key={`order-${order._id}-${order.Status}`}
                  className="bg-gradient-to-r from-cyan-200 via-green-300 to-white shadow-md rounded-lg p-4 border-2 border-dashed border-violet-700 
             transform transition-all duration-300 ease-in-out
             hover:scale-105 hover:shadow-xl hover:shadow-violet-200 
             hover:border-solid hover:border-violet-500 hover:-translate-y-2
             cursor-pointer group"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-700 transition-colors duration-200">
                      Email Id: {order.Email}
                    </h3>
                    <h4 className="group-hover:text-violet-600 transition-colors duration-200">
                      PetrolStation Name: {order.StationName}
                    </h4>
                    <p className="text-gray-600 mb-1 group-hover:text-gray-700 transition-colors duration-200">
                      {order.Location}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                      {formatDateTime(order.createdAt)}
                    </p>
                    <div className="mt-2">
                      {order.Petrol_Quantity > 0 && (
                        <span
                          className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded
                         transform transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-105"
                        >
                          {order.Petrol_Quantity}-Ltr {order.Petrol_Price}
                        </span>
                      )}
                      <br />
                      {order.Disel_Quantity > 0 && (
                        <span
                          className="inline-block bg-blue-100 text-blue-800 text-sm gap-2 px-2 py-1 rounded
                         transform transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-105"
                        >
                          {order.Disel_Quantity}-Ltr {order.Disel_Price}
                        </span>
                      )}
                      <span
                        className="ml-2 inline-block text-sm px-2 py-1 rounded bg-green-500 text-slate-800
                       transform transition-all duration-200 group-hover:bg-green-400 group-hover:scale-105"
                      >
                        {order.Status}
                      </span>
                    </div>
                  </div>

                  {/* Buttons pickup and plan trip */}
                  <div className="flex transform transition-all duration-300 group-hover:translate-x-2">
                    <Button
                      onClick={() => handleDeliveryDetails(order)}
                      gradientDuoTone="redToYellow"
                      className="transform transition-all duration-200 hover:scale-110 hover:shadow-lg
                 hover:shadow-orange-200 active:scale-95"
                    >
                      <CheckCircle
                        className="h-4 w-4 mr-2 transform transition-transform duration-200 
                             group-hover:rotate-12"
                      />
                      Delivery Details
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Popup for Order Pickup */}
        {isPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-xl font-bold flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Pickup Confirmation
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.Email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{selectedOrder.Location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 bg-gray-50 rounded-b-2xl">
              <button
                onClick={handleConfirmPickup}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Confirming..." : "Confirm Pickup"}
              </button>
              <button
                onClick={handleClosePopup}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Popup for Order Delivery Details */}
        {isDeliveryPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-xl font-bold flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Delivery Details
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium text-sm">{selectedOrder.Email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Station</p>
                  <p className="font-medium text-sm">{selectedOrder.StationName}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedOrder.Location}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                {selectedOrder.Petrol_Quantity > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium">Petrol</span>
                    <span className="font-bold">{selectedOrder.Petrol_Quantity}L - {selectedOrder.Petrol_Price}</span>
                  </div>
                )}
                {selectedOrder.Disel_Quantity > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">Diesel</span>
                    <span className="font-bold">{selectedOrder.Disel_Quantity}L - {selectedOrder.Disel_Price}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                <span className="text-indigo-600 font-medium">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedOrder.Status === 'Completed' ? 'bg-green-100 text-green-800' :
                  selectedOrder.Status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {selectedOrder.Status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 p-6 bg-gray-50 rounded-b-2xl">
              {selectedOrder.Status === "Processing" && (
                <button
                  onClick={handleCompleteDelivery}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Mark as Delivered"}
                </button>
              )}
              <button
                onClick={handleCloseDeliveryPopup}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <CarouselSecond />
      <Footer />
    </div>
  );
};
export default DeliveryBoyDashboard;
