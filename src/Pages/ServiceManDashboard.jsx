import React, { useEffect, useState } from "react";
import TopBar from "../Components/UserComponents/TopBar";
import Footer from "../Components/UserComponents/Footer";
import { Card, Carousel } from "flowbite-react";
import { Bell, Box, Calendar, Clock, Map, MapPin, Truck } from "lucide-react";
import axios from "axios";
import { BiCurrentLocation } from "react-icons/bi";
import { CarouselOne } from "../Components/Layout/CarouselOne";

const ServiceManDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false);
  console.log(orders);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/order/deliveryboydata');
      setOrders(response.data.deliveryBoy);
    } catch (error) {
      console.error('Error ServiceManData fetching Error:',error);
    }
    finally{
      setLoading(false);
    }
  };
 
 
  useEffect(() => {
    fetchData()
  },[]);

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

  return (
    <>
      <TopBar />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
      </div>

      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 ">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* This month revenue */}
          {/* <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              TOTAL REVENUE
            </h5>
            <div className="flex flex-row justify-between">
              <div>10.10</div>
              <div>RS.100</div>
            </div>
            <div className="flex flex-row justify-between">
              <span>Services</span>
              <span>Amount</span>
            </div>
          </Card> */}

          {/* This week revenue */}
          {/* <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              THIS MONTH REVENUE
            </h5>
            <div className="flex flex-row justify-between">
              <div>10.10</div>
              <div>RS.100</div>
            </div>
            <div className="flex flex-row justify-between">
              <span>Services</span>
              <span>Amount</span>
            </div>
          </Card> */}

          {/* Today revenue */}
          {/* <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              TODAY REVENUE
            </h5>
            <div className="flex flex-row justify-between">
              <div>10.10</div>
              <div>RS.100</div>
            </div>
            <div className="flex flex-row justify-between">
              <span>Services</span>
              <span>Amount</span>
            </div>
          </Card> */}
        </div>
      </div>

      {/* Service Notification */}
      <div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Bike Service Orders</h1>
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {orders.filter((msg) => msg.Status === "Processing").length}
                </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{order.Email}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    order.Status
                  )}`}
                >
                  {order.Status.charAt(0).toUpperCase() + order.Status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{order.Location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{formatDateTime(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BiCurrentLocation className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{order.Distance} - KiloMeters</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Services:</strong> {order.Service_Type}
                  </p>
                  <p className="text-sm">
                    <strong>Problems:</strong> {order.Problem_Type}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                    //onClick={() => console.log('Pickup:', order.id)}
                  >
                    <Box className="h-4 w-4" />
                    Pickup
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                    //onClick={() => console.log('Delivery:', order.id)}
                  >
                    <Truck className="h-4 w-4" />
                    Delivery
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                    //onClick={() => console.log('Plan Trip:', order.id)}
                  >
                    <Map className="h-4 w-4" />
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Part */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
        <Footer />
      </div>
    </>
  );
};

export default ServiceManDashboard;
