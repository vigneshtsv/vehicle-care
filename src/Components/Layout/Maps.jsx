// import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
// } from "react-leaflet";
// import L from "leaflet";
// /* index.css or App.js */
// import "leaflet/dist/leaflet.css";
// import { FaMapMarkerAlt, FaTruck, FaWrench } from "react-icons/fa";
// import { MdBikeScooter, MdLocalGasStation } from "react-icons/md";

// // Custom icon (optional)
// const customIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   shadowSize: [41, 41],
// });

// // Coordinates for the markers and the route
// const locations = [
//   { id: 1, name: "New York, NY", coords: [40.712776, -74.005974] },
//   { id: 2, name: "Chicago, IL", coords: [41.878113, -87.629799] },
//   { id: 3, name: "Los Angeles, CA", coords: [34.052235, -118.243683] },
// ];

// const Maps = () => {
//   const [petrolStations, setPetrolStations] = useState([]);
//   const [bikeServices, setBikeServices] = useState([]);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           // setUserLocation({ lat: latitude, lng: longitude });
//           fetchNearbyServices(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Fallback location (e.g., city center)
//           const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // London coordinates
//           setUserLocation(defaultLocation);
//           fetchNearbyServices(defaultLocation.lat, defaultLocation.lng);
//         }
//       );
//     }
//   }, []);

//   const fetchNearbyServices = async (latitude, longitude) => {
//     try {
//       // Mock data - replace with actual API calls
//       const petrolResponse = [
//         {
//           id: 1,
//           name: "Shell Station",
//           latitude: latitude + 0.01,
//           longitude: longitude + 0.01,
//           price: 1.2,
//           distance: 2.5,
//           fuel: ["Petrol", "Diesel"],
//         },
//         {
//           id: 2,
//           name: "BP Station",
//           latitude: latitude - 0.01,
//           longitude: longitude - 0.01,
//           price: 1.15,
//           distance: 3.2,
//           fuel: ["Petrol"],
//         },
//       ];

//       const bikeServiceResponse = [
//         {
//           id: 1,
//           name: "Rapid Bike Service",
//           latitude: latitude + 0.02,
//           longitude: longitude + 0.02,
//           services: ["Repair", "Maintenance"],
//           distance: 4.1,
//           specialization: "Mountain Bikes",
//         },
//         {
//           id: 2,
//           name: "Quick Fix Bikes",
//           latitude: latitude - 0.02,
//           longitude: longitude - 0.02,
//           services: ["Tune-up", "Emergency Repair"],
//           distance: 5.3,
//           specialization: "Road Bikes",
//         },
//       ];

//       setPetrolStations(petrolResponse);
//       setBikeServices(bikeServiceResponse);
//     } catch (error) {
//       console.error("Error fetching nearby services:", error);
//     }
//   };

//   return (
//     <div style={{ height: "100vh" }}>
//       <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-white">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-4 flex items-center">
//             <FaTruck className="mr-2 text-blue-600" /> Nearby Petrol Stations
//           </h2>
//           {petrolStations.map((station) => (
//             <div
//               key={station.id}
//               className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
//             >
//               <div className="flex items-center mb-2">
//                 <MdLocalGasStation className="mr-2 text-xl text-yellow-600" />
//                 <h3 className="font-semibold text-lg">{station.name}</h3>
//               </div>
//               <p className="text-gray-600 flex items-center">
//                 <FaMapMarkerAlt className="mr-2 text-red-500" />
//                 Distance: {station.distance} km
//               </p>
//               <p className="text-gray-600">Price: ${station.price}/liter</p>
//               <p className="text-gray-500">
//                 Fuel Types: {station.fuel.join(", ")}
//               </p>
//               <button
//                 onClick={() => handleOrderPetrol(station)}
//                 className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
//               >
//                 <FaTruck className="mr-2" /> Order Petrol
//               </button>
//             </div>
//           ))}
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold mb-4 flex items-center">
//             <FaWrench className="mr-2 text-green-600" /> Nearby Bike Services
//           </h2>
//           {bikeServices.map((service) => (
//             <div
//               key={service.id}
//               className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
//             >
//               <div className="flex items-center mb-2">
//                 <MdBikeScooter className="mr-2 text-xl text-green-600" />
//                 <h3 className="font-semibold text-lg">{service.name}</h3>
//               </div>
//               <p className="text-gray-600 flex items-center">
//                 <FaMapMarkerAlt className="mr-2 text-red-500" />
//                 Distance: {service.distance} km
//               </p>
//               <p className="text-gray-600">
//                 Services: {service.services.join(", ")}
//               </p>
//               <p className="text-gray-500">
//                 Specialization: {service.specialization}
//               </p>
//               <button
//                 onClick={() => handleBookBikeService(service)}
//                 className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition flex items-center justify-center"
//               >
//                 <FaWrench className="mr-2" /> Book Service
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <MapContainer
//         center={[39.8283, -98.5795]}
//         zoom={4}
//         style={{ height: "80%", width: "100%" }}
//       >
//         {/* Add OpenStreetMap tiles */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* Add markers */}
//         {petrolStations.map((location) => (
//           <Marker
//             key={location.id}
//             position={[location.latitude, location.longitude]}
//             icon={customIcon}
//           >
//             <Popup>{location.name}</Popup>
//           </Marker>
//         ))}

//         {/* Add polyline (route between markers) */}
//         {/* <Polyline
//           positions={locations.map((location) => location.coords)}
//           color="blue"
//         /> */}
//       </MapContainer>
//     </div>
//   );
// };

// export default Maps;

//!new code

// import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// const Maps = () => {
//   const [petrolStations, setPetrolStations] = useState([]);
//   const [bikeServices, setBikeServices] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);

//   const customIcon = new L.Icon({
//     iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//     shadowSize: [41, 41],
//   });
//   useEffect(() => {
//     // Geolocation logic
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           fetchNearbyServices(latitude, longitude);
//         },
//         (error) => {
//           console.error("Location error:", error);
//           // Fallback to a default location
//           const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York
//           setUserLocation(defaultLocation);
//           fetchNearbyServices(defaultLocation.lat, defaultLocation.lng);
//         }
//       );
//     }
//   }, []);

//   const fetchNearbyServices = async (latitude, longitude) => {
//     try {
//       // Mock API responses - replace with actual API calls
//       const petrolStationsData = [
//         {
//           id: 1,
//           name: "Green Energy Petrol Station",
//           latitude: latitude + 0.01,
//           longitude: longitude + 0.01,
//           price: 1.20,
//           distance: 2.5,
//           fuelTypes: ["Regular", "Premium", "Diesel"],
//           availability: "Open 24/7"
//         },
//         {
//           id: 2,
//           name: "City Fuel Stop",
//           latitude: latitude - 0.01,
//           longitude: longitude - 0.01,
//           price: 1.15,
//           distance: 3.2,
//           fuelTypes: ["Regular", "Diesel"],
//           availability: "6 AM - 10 PM"
//         }
//       ];

//       const bikeServiceData = [
//         {
//           id: 1,
//           name: "Rapid Bike Repair",
//           latitude: latitude + 0.02,
//           longitude: longitude + 0.02,
//           services: ["Complete Bike Tune-up", "Emergency Repair"],
//           specialization: "All Bike Types",
//           distance: 4.1,
//           rating: 4.5
//         },
//         {
//           id: 2,
//           name: "Quick Cycle Solutions",
//           latitude: latitude - 0.02,
//           longitude: longitude - 0.02,
//           services: ["Maintenance", "Custom Modifications"],
//           specialization: "Mountain & Road Bikes",
//           distance: 5.3,
//           rating: 4.2
//         }
//       ];

//       setPetrolStations(petrolStationsData);
//       setBikeServices(bikeServiceData);
//     } catch (error) {
//       console.error("Services fetch error:", error);
//     }
//   };

//   const handlePetrolOrder = (station) => {
//     // Implement petrol ordering logic
//     alert(`Ordering petrol from ${station.name}`);
//   };

//   const handleBikeService = (service) => {
//     // Implement bike service booking logic
//     alert(`Booking service at ${service.name}`);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Services Sidebar */}
//       <div className="w-1/3 p-4 overflow-y-auto bg-gray-100">
//         {/* Petrol Stations Section */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-4 flex items-center">
//             <span className="mr-2 text-blue-600">⛽</span> Petrol Stations
//           </h2>
//           {petrolStations.map((station) => (
//             <div 
//               key={station.id} 
//               className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold text-lg">{station.name}</h3>
//                 <span className="text-green-600 font-medium">${station.price}/L</span>
//               </div>
//               <div className="text-gray-600 space-y-2">
//                 <p>📍 Distance: {station.distance} km</p>
//                 <p>⛽ Fuel Types: {station.fuelTypes.join(", ")}</p>
//                 <p>🕒 Availability: {station.availability}</p>
//               </div>
//               <button 
//                 onClick={() => handlePetrolOrder(station)}
//                 className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//               >
//                 Order Petrol
//               </button>
//             </div>
//           ))}
//         </section>

//         {/* Bike Services Section */}
//         <section>
//           <h2 className="text-2xl font-bold mb-4 flex items-center">
//             <span className="mr-2 text-green-600">🔧</span> Bike Services
//           </h2>
//           {bikeServices.map((service) => (
//             <div 
//               key={service.id} 
//               className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold text-lg">{service.name}</h3>
//                 <span className="text-yellow-500">★ {service.rating}</span>
//               </div>
//               <div className="text-gray-600 space-y-2">
//                 <p>📍 Distance: {service.distance} km</p>
//                 <p>🛠️ Services: {service.services.join(", ")}</p>
//                 <p>🚲 Specialization: {service.specialization}</p>
//               </div>
//               <button 
//                 onClick={() => handleBikeService(service)}
//                 className="w-full mt-3 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//               >
//                 Book Service
//               </button>
//             </div>
//           ))}
//         </section>
//       </div>

//       {/* Placeholder Map Container */}
//       <div className="w-2/3 bg-gray-200 flex items-center justify-center">
//       <MapContainer
//          center={[39.8283, -98.5795]}
//          zoom={4}
//          style={{ height: "80%", width: "100%" }}
//        >
//          {/* Add OpenStreetMap tiles */}
//          <TileLayer
//            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//          />

//          {/* Add markers */}
//          {petrolStations.map((location) => (
//            <Marker
//              key={location.id}
//              position={[location.latitude, location.longitude]}
//              icon={customIcon}
//            >
//              <Popup>{location.name}</Popup>
//            </Marker>
//          ))}

//          {/* Add polyline (route between markers) */}
//          {/* <Polyline
//            positions={locations.map((location) => location.coords)}
//            color="blue"
//          /> */}
//        </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Maps;