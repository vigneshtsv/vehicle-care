import React, { useEffect, useState } from "react";
import TopBar from "../Components/UserComponents/TopBar";
import Footer from "../Components/UserComponents/Footer";
import { Card, Carousel } from "flowbite-react";
import { Bell, Box, Calendar, Clock, Map, MapPin, Truck } from "lucide-react";

const ServiceManDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      location: "123 Main St, City",
      date: "2025-01-07",
      time: "14:30",
      problemType: "Chain Repair",
      serviceType: "Regular Maintenance",
      status: "pending",
      notification: "New order received",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      location: "456 Oak Ave, Town",
      date: "2025-01-07",
      time: "15:45",
      problemType: "Brake Adjustment",
      serviceType: "Emergency Repair",
      status: "progress",
      notification: "Service started",
    },
  ]);

  useEffect(() => {
    // Filter unread notifications from orders
    const unreadNotifications = orders.filter((order) => order.notification);
    setNotifications(unreadNotifications);
  }, [orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <TopBar />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bike Service Orders</h1>
          <div className="relative cursor-pointer group">
            <Bell className="h-6 w-6 text-gray-600"/>
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
            {/* Notification dropdown */}
            <div className="hidden group-hover:block absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-2">
                <h3 className="text-sm font-bold mb-2">Notifications</h3>
                {notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="text-sm p-2 hover:bg-gray-50 border-b"
                  >
                    {notif.notification}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{order.customerName}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{order.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{order.time}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Problem:</strong> {order.problemType}
                  </p>
                  <p className="text-sm">
                    <strong>Service:</strong> {order.serviceType}
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
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      <Footer />
      </div>
    </>
  );
};

export default ServiceManDashboard;
