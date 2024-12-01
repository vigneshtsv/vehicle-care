//!use leaflet API URL in the project

// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { FaTruck, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';
// import { MdLocalGasStation, MdBikeScooter } from 'react-icons/md';

// const Maps = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [petrolStations, setPetrolStations] = useState([]);
//   const [bikeServices, setBikeServices] = useState([]);
//   const [selectedStation, setSelectedStation] = useState(null);

//   // Custom Leaflet Icons
//   const customIcon = L.icon({
//     iconUrl: '/api/placeholder/40/40', // Replace with actual icon path
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40]
//   });

//   // Simulated API call to fetch nearby services (replace with actual API)
//   const fetchNearbyServices = async (latitude, longitude) => {
//     try {
//       // Mock data - replace with actual API calls
//       const petrolResponse = [
//         {
//           id: 1,
//           name: "Shell Station",
//           latitude: latitude + 0.01,
//           longitude: longitude + 0.01,
//           price: 1.20,
//           distance: 2.5,
//           fuel: ["Petrol", "Diesel"]
//         },
//         {
//           id: 2,
//           name: "BP Station",
//           latitude: latitude - 0.01,
//           longitude: longitude - 0.01,
//           price: 1.15,
//           distance: 3.2,
//           fuel: ["Petrol"]
//         }
//       ];

//       const bikeServiceResponse = [
//         {
//           id: 1,
//           name: "Rapid Bike Service",
//           latitude: latitude + 0.02,
//           longitude: longitude + 0.02,
//           services: ["Repair", "Maintenance"],
//           distance: 4.1,
//           specialization: "Mountain Bikes"
//         },
//         {
//           id: 2,
//           name: "Quick Fix Bikes",
//           latitude: latitude - 0.02,
//           longitude: longitude - 0.02,
//           services: ["Tune-up", "Emergency Repair"],
//           distance: 5.3,
//           specialization: "Road Bikes"
//         }
//       ];

//       setPetrolStations(petrolResponse);
//       setBikeServices(bikeServiceResponse);
//     } catch (error) {
//       console.error("Error fetching nearby services:", error);
//     }
//   };

//   // Get user's current location
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
//           fetchNearbyServices(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Fallback location (e.g., city center)
//           const defaultLocation = [51.5074, -0.1278]; // London coordinates
//           setUserLocation(defaultLocation);
//           fetchNearbyServices(...defaultLocation);
//         }
//       );
//     }
//   }, []);

//   const handleOrderPetrol = (station) => {
//     // Implement order logic
//     alert(`Ordering petrol from ${station.name}`);
//   };

//   const handleBookBikeService = (service) => {
//     // Implement booking logic
//     alert(`Booking service at ${service.name}`);
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       {/* Map Section */}
//       <div className="w-full md:w-2/3 h-96 md:h-screen">
//         {userLocation && (
//           <MapContainer 
//             center={userLocation} 
//             zoom={13} 
//             className="h-full w-full"
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
            
//             {/* Petrol Stations Markers */}
//             {petrolStations.map((station) => (
//               <Marker
//                 key={station.id}
//                 position={[station.latitude, station.longitude]}
//                 icon={customIcon}
//                 eventHandlers={{
//                   click: () => setSelectedStation(station)
//                 }}
//               >
//                 <Popup>
//                   <div className="flex items-center">
//                     <MdLocalGasStation className="mr-2" />
//                     {station.name}
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
            
//             {/* Bike Services Markers */}
//             {bikeServices.map((service) => (
//               <Marker
//                 key={service.id}
//                 position={[service.latitude, service.longitude]}
//                 icon={customIcon}
//                 eventHandlers={{
//                   click: () => setSelectedStation(service)
//                 }}
//               >
//                 <Popup>
//                   <div className="flex items-center">
//                     <MdBikeScooter className="mr-2" />
//                     {service.name}
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         )}
//       </div>

//       {/* Services List Section */}
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
//               <p className="text-gray-500">Fuel Types: {station.fuel.join(", ")}</p>
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
//     </div>
//   );
// };

// export default Maps;

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { FaGasPump, FaWrench, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
// import L from 'leaflet';

// // Custom marker icons
// const petrolStationIcon = L.icon({
//   iconUrl: '/petrol-station-icon.png', // Replace with your icon
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32]
// });

// const mechanicShopIcon = L.icon({
//   iconUrl: '/mechanic-icon.png', // Replace with your icon
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32]
// });

// const Maps = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [petrolStations, setPetrolStations] = useState([]);
//   const [mechanicShops, setMechanicShops] = useState([]);
//   const [selectedStation, setSelectedStation] = useState(null);

//   // Fetch user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
          
//           // Fetch nearby petrol stations and mechanic shops
//           fetchNearbyPetrolStations(latitude, longitude);
//           fetchNearbyMechanicShops(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Fallback to a default location (e.g., city center)
//           setUserLocation([0, 0]); // Replace with your default coordinates
//         }
//       );
//     }
//   }, []);

//   // Fetch nearby petrol stations (mock implementation - replace with your API)
//   const fetchNearbyPetrolStations = async (lat, lon) => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch(`/api/nearby-petrol-stations?lat=${lat}&lon=${lon}`);
//       const data = await response.json();
//       setPetrolStations(data);
//     } catch (error) {
//       console.error("Error fetching petrol stations:", error);
//     }
//   };

//   // Fetch nearby mechanic shops (mock implementation - replace with your API)
//   const fetchNearbyMechanicShops = async (lat, lon) => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch(`/api/nearby-mechanic-shops?lat=${lat}&lon=${lon}`);
//       const data = await response.json();
//       setMechanicShops(data);
//     } catch (error) {
//       console.error("Error fetching mechanic shops:", error);
//     }
//   };

//   // Handle ordering from a petrol station
//   const handleOrder = (station) => {
//     // Implement order logic
//     console.log("Ordering from:", station);
//     // You might want to open a modal or navigate to an order page
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full h-screen">
//       {/* Map Container */}
//       <div className="w-full md:w-2/3 h-1/2 md:h-full">
//         {userLocation && (
//           <MapContainer 
//             center={userLocation} 
//             zoom={13} 
//             className="h-full w-full"
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="">DesignedBy</a> vignesh'
//             />
            
//             {/* Petrol Stations Markers */}
//             {petrolStations.map((station, index) => (
//               <Marker 
//                 key={`station-${index}`} 
//                 position={[station.latitude, station.longitude]}
//                 icon={petrolStationIcon}
//                 eventHandlers={{
//                   click: () => setSelectedStation(station)
//                 }}
//               >
//                 <Popup>
//                   <div className="flex flex-col">
//                     <h3 className="font-bold flex items-center">
//                       <FaGasPump className="mr-2" /> {station.name}
//                     </h3>
//                     <p>Price: ${station.price}/liter</p>
//                     <p>Distance: {station.distance} km</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}

//             {/* Mechanic Shops Markers */}
//             {mechanicShops.map((shop, index) => (
//               <Marker 
//                 key={`mechanic-${index}`} 
//                 position={[shop.latitude, shop.longitude]}
//                 icon={mechanicShopIcon}
//               >
//                 <Popup>
//                   <div className="flex flex-col">
//                     <h3 className="font-bold flex items-center">
//                       <FaWrench className="mr-2" /> {shop.name}
//                     </h3>
//                     <p>Services: {shop.services.join(', ')}</p>
//                     <p>Contact: {shop.phone}</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         )}
//       </div>

//       {/* Nearby Services List */}
//       <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4 bg-gray-100">
//         <h2 className="text-2xl font-bold mb-4 flex items-center">
//           <FaMapMarkerAlt className="mr-2" /> Nearby Services
//         </h2>

//         {/* Petrol Stations Section */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-3 flex items-center">
//             <FaGasPump className="mr-2" /> Petrol Stations
//           </h3>
//           {petrolStations.map((station, index) => (
//             <div 
//               key={`list-station-${index}`} 
//               className="bg-white p-3 rounded-lg shadow-md mb-3 hover:bg-blue-50 transition"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h4 className="font-bold">{station.name}</h4>
//                   <p className="text-sm text-gray-600">
//                     Price: ${station.price}/liter
//                   </p>
//                 </div>
//                 <button 
//                   onClick={() => handleOrder(station)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded flex items-center hover:bg-blue-600 transition"
//                 >
//                   <FaShoppingCart className="mr-2" /> Order
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Mechanic Shops Section */}
//         <div>
//           <h3 className="text-xl font-semibold mb-3 flex items-center">
//             <FaWrench className="mr-2" /> Bike Mechanic Shops
//           </h3>
//           {mechanicShops.map((shop, index) => (
//             <div 
//               key={`list-mechanic-${index}`} 
//               className="bg-white p-3 rounded-lg shadow-md mb-3 hover:bg-green-50 transition"
//             >
//               <h4 className="font-bold">{shop.name}</h4>
//               <p className="text-sm text-gray-600">
//                 Services: {shop.services.join(', ')}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Contact: {shop.phone}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Maps;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaGasPump, FaWrench, FaMapMarkerAlt, FaShoppingCart, FaPhone, FaMapPin } from 'react-icons/fa';
import L from 'leaflet';

// Custom marker icons
const petrolStationIcon = L.icon({
  iconUrl: '/petrol-station-icon.png', // Replace with your icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const Maps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [petrolStations, setPetrolStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          
          // Fetch nearby petrol stations with comprehensive details
          fetchNearbyPetrolStations(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to a default location (e.g., city center)
          setUserLocation([0, 0]); // Replace with your default coordinates
        }
      );
    }
  }, []);

  // Enhanced fetch for nearby petrol stations
  const fetchNearbyPetrolStations = async (lat, lon) => {
    try {
      // Replace with your actual API endpoint that returns comprehensive station details
      const response = await fetch(`/api/nearby-petrol-stations?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      
      // Ensure each station has these fields
      const completeStations = data.map(station => ({
        id: station.id || generateUniqueId(), // Generate unique ID if not provided
        name: station.name || 'Unnamed Station',
        address: station.address || 'Address Not Available',
        phoneNumber: station.phoneNumber || 'Contact Not Available',
        latitude: station.latitude,
        longitude: station.longitude,
        price: station.price || 'Price Not Available',
        distance: station.distance || 'Distance Not Calculated',
        openingHours: station.openingHours || 'Hours Not Specified',
        availableFuels: station.availableFuels || ['Regular', 'Premium'],
        additionalServices: station.additionalServices || []
      }));
      
      setPetrolStations(completeStations);
    } catch (error) {
      console.error("Error fetching petrol stations:", error);
      // Optionally set some default/mock data
      setPetrolStations([]);
    }
  };

  // Utility function to generate unique ID if not provided
  const generateUniqueId = () => {
    return `station-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Handle ordering from a petrol station
  const handleOrder = (station) => {
    console.log("Ordering from:", station);
    // Implement order logic - could open a modal with station details
    // Example: Open order modal with station information
    setSelectedStation(station);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Map Container */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full">
        {userLocation && (
          <MapContainer 
            center={userLocation} 
            zoom={13} 
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="">DesignedBy</a> vignesh'
            />
            
            {/* Petrol Stations Markers */}
            {petrolStations.map((station) => (
              <Marker 
                key={station.id} 
                position={[station.latitude, station.longitude]}
                icon={petrolStationIcon}
                eventHandlers={{
                  click: () => setSelectedStation(station)
                }}
              >
                <Popup>
                  <div className="flex flex-col">
                    <h3 className="font-bold flex items-center">
                      <FaGasPump className="mr-2" /> {station.name}
                    </h3>
                    <p><FaMapPin className="inline mr-2" />{station.address}</p>
                    <p><FaPhone className="inline mr-2" />{station.phoneNumber}</p>
                    <p>Price: {station.price}/liter</p>
                    <p>Distance: {station.distance} km</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Nearby Services List */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> Nearby Petrol Stations
        </h2>

        {petrolStations.map((station) => (
          <div 
            key={station.id} 
            className="bg-white p-3 rounded-lg shadow-md mb-3 hover:bg-blue-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold">VLS PetrolStation</h4> 
                <p className="text-sm text-gray-600">
                  <FaMapPin className="inline mr-2" />7/82 ilayangudi Road,Emaneshwaram
                </p>
                <p className="text-sm text-gray-600">
                  <FaPhone className="inline mr-2" />Ph.7373358187
                </p>
                <p className="text-sm text-gray-600">
                  Price: 102.00/liter
                </p>
              </div>
              <button 
                onClick={() => handleOrder(station)}
                className="bg-blue-500 text-white px-3 py-1 rounded flex items-center hover:bg-blue-600 transition"
              >
                <FaShoppingCart className="mr-2" /> Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maps;