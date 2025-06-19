import React, { useEffect, useState } from "react";
import TopBar from "../Components/UserComponents/TopBar";
import Footer from "../Components/UserComponents/Footer";
import { Button, Card } from "flowbite-react";
import { Bell, Box, Calendar, Map, MapPin, Truck } from "lucide-react";
import axios from "axios";
import { BiCurrentLocation } from "react-icons/bi";
import { CarouselOne } from "../Components/Layout/CarouselOne";
import { useNavigate } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiStorkDelivery } from "react-icons/gi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminTopBarPage from "../Components/adminCompponents/AdminTopBarPage";

const ServiceManDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeliveryPopupOpen, setIsDeliveryPopupOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    id: "",
    Status: "",
  });
  const Navigate = useNavigate();
  // console.log(orders);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://vehicle-care-api.onrender.com/api/order/deliveryboydata"
      );
      setOrders(response.data.deliveryBoy);
    } catch (error) {
      console.error("Error ServiceManData fetching Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter unread notifications from orders
    const unreadNotifications = orders.filter((order) => order.notification);
    setNotifications(unreadNotifications);
  }, [orders]);

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const getStatusColor = (Status) => {
    switch (Status) {
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const OrderTrackingNavigate = () => {
    Navigate("/ordertracking");
  };

  const handlePickupOrder = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const handleConfirmPickup = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://vehicle-care-api.onrender.com/api/order/updateorderdata/${selectedOrder._id}`,
        {
          id: selectedOrder._id,
          Status: "Processing",
        }
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
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
      setIsPopupOpen(false);
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
        {
          id: selectedOrder._id,
          Status: "Completed",
        }
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
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
      setIsDeliveryPopupOpen(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCloseDeliveryPopup = () => {
    setIsDeliveryPopupOpen(false);
  };

  return (
    <div className="servicemanbg">
      {currentUser.Role === 'ServiceMan'? <TopBar /> : <AdminTopBarPage />}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
      </div>

      {/* Waiting Order Notification */}
      <div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 p-4 bg-red-400">
            <h1 className="text-2xl font-bold">Waiting Orders Notifications</h1>
            <div className="relative bg-yellow-200 p-1 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {
                  orders.filter(
                    (order) =>
                      order.Status === "Waiting" &&
                      ((typeof order.Service_Type === "string" &&
                        order.Service_Type.trim() !== "") ||
                        (typeof order.Problem_Type === "string" &&
                          order.Problem_Type.trim() !== ""))
                  ).length
                }
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders
            .filter(
              (order) =>
                order.Status === "Waiting" &&
                ((typeof order.Service_Type === "string" &&
                  order.Service_Type.trim() !== "") ||
                  (typeof order.Problem_Type === "string" &&
                    order.Problem_Type.trim() !== ""))
            )
            .map((order) => (
              <Card className="shadow-md border-2 m-4 border-dashed border-red-500 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-red-400 hover:-translate-y-2 group">
                <div key={order.id} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-red-600">
                      {order.Email}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 ${getStatusColor(
                        order.Status
                      )}`}
                    >
                      {order.Status.charAt(0).toUpperCase() +
                        order.Status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-red-600">
                        <MapPin className="h-4 w-4 text-gray-500 transition-colors duration-300 group-hover:text-red-500" />
                        <span className="text-sm">{order.Location}</span>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-red-600">
                        <Calendar className="h-4 w-4 text-gray-500 transition-colors duration-300 group-hover:text-red-500" />
                        <span className="text-sm">
                          {formatDateTime(order.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-red-600">
                        <BiCurrentLocation className="h-4 w-4 text-gray-500 transition-colors duration-300 group-hover:text-red-500" />
                        <span className="text-sm">
                          {order.Distance} - KiloMeters
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm transition-colors duration-300 group-hover:text-gray-700">
                        <strong className="transition-colors duration-300 group-hover:text-red-600">
                          Services:
                        </strong>{" "}
                        {order.Service_Type}
                      </p>
                      <p className="text-sm transition-colors duration-300 group-hover:text-gray-700">
                        <strong className="transition-colors duration-300 group-hover:text-red-600">
                          Problems:
                        </strong>{" "}
                        {order.Problem_Type}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95"
                        onClick={() => handlePickupOrder(order)}
                      >
                        <Box className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                        Pickup
                      </button>
                      <button
                        className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95"
                        onClick={() => handleDeliveryDetails(order)}
                      >
                        <Truck className="h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
                        Delivery Details
                      </button>
                      <button
                        className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95"
                        onClick={OrderTrackingNavigate}
                      >
                        <Map className="h-4 w-4 transition-transform duration-300 hover:rotate-6" />
                        Plan Trip
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Processing Order Notification */}
      <div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 p-4 bg-amber-300">
            <h1 className="text-2xl font-bold">
              Processing Orders Notifications
            </h1>
            <div className="relative bg-blue-700 p-1 rounded-full">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {
                  orders.filter(
                    (order) =>
                      order.Status === "Processing" &&
                      ((typeof order.Service_Type === "string" &&
                        order.Service_Type.trim() !== "") ||
                        (typeof order.Problem_Type === "string" &&
                          order.Problem_Type.trim() !== ""))
                  ).length
                }
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders
            .filter(
              (order) =>
                order.Status === "Processing" &&
                ((typeof order.Service_Type === "string" &&
                  order.Service_Type.trim() !== "") ||
                  (typeof order.Problem_Type === "string" &&
                    order.Problem_Type.trim() !== ""))
            )
            .map((order) => (
                <Card className="shadow-md border-2 m-4 border-dashed border-yellow-500 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:border-yellow-400 hover:-translate-y-2 group">
                  <div key={order.id} className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-blue-600">
                        {order.Email}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 ${getStatusColor(
                          order.Status
                        )}`}
                      >
                        {order.Status.charAt(0).toUpperCase() +
                          order.Status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-blue-600">
                          <MapPin className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
                          <span className="text-sm">{order.Location}</span>
                        </div>
                        <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-green-600">
                          <Calendar className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-green-500 group-hover:scale-110" />
                          <span className="text-sm">
                            {formatDateTime(order.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-purple-600">
                          <BiCurrentLocation className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-purple-500 group-hover:scale-110" />
                          <span className="text-sm">
                            {order.Distance} - KiloMeters
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 transition-all duration-300 group-hover:bg-gray-50 group-hover:p-3 group-hover:rounded-lg">
                        <p className="text-sm transition-all duration-300 group-hover:text-gray-800">
                          <strong className="transition-colors duration-300 group-hover:text-blue-600">
                            Services:
                          </strong>{" "}
                          {order.Service_Type}
                        </p>
                        <p className="text-sm transition-all duration-300 group-hover:text-gray-800">
                          <strong className="transition-colors duration-300 group-hover:text-red-600">
                            Problems:
                          </strong>{" "}
                          {order.Problem_Type}
                        </p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          outline
                          gradientDuoTone="greenToBlue"
                          onClick={() => handleDeliveryDetails(order)}
                          className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                        >
                          <CiDeliveryTruck className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                          Delivery
                        </Button>
                        <Button
                          outline
                          gradientDuoTone="greenToBlue"
                          onClick={OrderTrackingNavigate}
                          className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                        >
                          <Map className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                          Plan Trip
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
            ))}
        </div>
      </div>

      {/* Completed Order Notification */}
      <div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 p-4 bg-green-400">
            <h1 className="text-2xl font-bold">
              Completed Orders Notifications
            </h1>
            <div className="relative bg-red-500 p-1 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {
                  orders.filter(
                    (order) =>
                      order.Status === "Completed" &&
                      ((typeof order.Service_Type === "string" &&
                        order.Service_Type.trim() !== "") ||
                        (typeof order.Problem_Type === "string" &&
                          order.Problem_Type.trim() !== ""))
                  ).length
                }
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders
            .filter(
              (order) =>
                order.Status === "Completed" &&
                ((typeof order.Service_Type === "string" &&
                  order.Service_Type.trim() !== "") ||
                  (typeof order.Problem_Type === "string" &&
                    order.Problem_Type.trim() !== ""))
            )
            .map((order) => (
              <Card className="shadow-md border-2 m-4 border-dashed border-yellow-500 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:border-yellow-400 hover:-translate-y-2 group">
                <div key={order.id} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-blue-600">{order.Email}</h3>
                    <span
                     className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 ${getStatusColor(
                          order.Status
                      )}`}
                    >
                      {order.Status.charAt(0).toUpperCase() +
                        order.Status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-blue-600">
                        <MapPin className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
                        <span className="text-sm">{order.Location}</span>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-green-600">
                        <Calendar className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-green-500 group-hover:scale-110" />
                        <span className="text-sm">
                          {formatDateTime(order.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:text-purple-600">
                        <BiCurrentLocation className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-purple-500 group-hover:scale-110" />
                        <span className="text-sm">
                          {order.Distance} - KiloMeters
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 transition-all duration-300 group-hover:bg-gray-50 group-hover:p-3 group-hover:rounded-lg">
                      <p className="text-sm transition-all duration-300 group-hover:text-gray-800">
                        <strong className="transition-colors duration-300 group-hover:text-blue-600">Services:</strong>{" "} {order.Service_Type}
                      </p>
                      <p className="text-sm transition-all duration-300 group-hover:text-gray-800">
                          <strong className="transition-colors duration-300 group-hover:text-red-600">
                            Problems:
                          </strong>{" "}
                          {order.Problem_Type}
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        outline
                        gradientDuoTone="greenToBlue"
                        onClick={() => handleDeliveryDetails(order)}
                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                      >
                        <GiStorkDelivery className="h-4 w-4" />
                        Delivery Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Pickup Order Popup */}
      {isPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Box className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Pickup Confirmation</h2>
                <p className="text-gray-600">Confirm pickup for this order</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{selectedOrder.Email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-right">{selectedOrder.Location}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleConfirmPickup}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium"
                >
                  Confirm Pickup
                </button>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Details Popup */}
       
       {isDeliveryPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Delivery Details</h2>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-4 w-full max-w-2xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                 <span className="text-gray-600 text-sm">Customer</span>
                 <p className="font-medium break-all">{selectedOrder.Email}</p>
                </div>
                <div>
                 <span className="text-gray-600 text-sm">Problem</span>
                 <p className="font-medium">{selectedOrder.Problem_Type}</p>
                </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                 <span className="text-gray-600 text-sm">Location</span>
                 <p className="font-medium">{selectedOrder.Location}</p>
                </div>
               <div>
                <span className="text-gray-600 text-sm">Status</span>
                <p className="font-medium">{selectedOrder.Status}</p>
               </div>
              </div>

                {(selectedOrder.Petrol_Quantity > 0 || selectedOrder.Disel_Quantity > 0) && (
                  <div className="border-t pt-3">
                    <span className="text-gray-600 text-sm">Fuel Requirements</span>
                    <div className="flex space-x-4 mt-1">
                      {selectedOrder.Petrol_Quantity > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          Petrol: {selectedOrder.Petrol_Quantity}L
                        </span>
                      )}
                      {selectedOrder.Disel_Quantity > 0 && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Diesel: {selectedOrder.Disel_Quantity}L
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                {selectedOrder.Status === "Processing" && (
                  <button
                    onClick={handleCompleteDelivery}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium"
                  >
                    Mark as Delivered
                  </button>
                )}
                <button
                  onClick={() => setIsDeliveryPopupOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Carousel Part */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
        <Footer />
      </div>
    </div>
  );
};

export default ServiceManDashboard;
