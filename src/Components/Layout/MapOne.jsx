// // //!chat GPT code AI code

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import { FaTruck, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';
// import { MdLocalGasStation, MdBikeScooter } from 'react-icons/md';
// import { Fuel, X, Droplet } from 'lucide-react';


// const Maps = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [petrolStations, setPetrolStations] = useState([]);
//   const [bikeServices, setBikeServices] = useState([]);
//   const [selectedStation, setSelectedStation] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
//   const API_KEY = 'AIzaSyBnXL2sG0JrqGst0lr1djzdl7gUFDFpQ_c';

//   // Map container style
//   const mapContainerStyle = {
//     width: '100%',
//     height: '100%',
//     minHeight: '400px'
//   };

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
//           setUserLocation({ lat: latitude, lng: longitude });
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

//   const handleOrderPetrol = (station) => {
//     // Implement order logic
//     alert(`Ordering petrol from ${station.name}`);
//   };

//   const handleBookBikeService = (service) => {
//     // Implement booking logic
//     alert(`Booking service at ${service.name}`);
//   };

//   const handleOrder = (fuelType) => {
//     console.log(`Ordering ${fuelType}`);
//     // Add your order handling logic here
//     setIsOpen(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       {/* Map Section */}
//       <div className="w-full md:w-2/3 h-96 md:h-screen">
//         <LoadScript googleMapsApiKey={API_KEY}>
//           {userLocation && (
//             <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               center={userLocation}
//               zoom={13}
//             >
//               {/* Petrol Stations Markers */}
//               {petrolStations.map((station) => (
//                 <Marker
//                   key={station.id}
//                   position={{ lat: station.latitude, lng: station.longitude }}
//                   onClick={() => setSelectedStation(station)}
//                   icon={{
//                     url: '/path/to/gas-station-icon.png', // Replace with your icon
//                     scaledSize: new window.google.maps.Size(40, 40)
//                   }}
//                 />
//               ))}

//               {/* Bike Services Markers */}
//               {bikeServices.map((service) => (
//                 <Marker
//                   key={service.id}
//                   position={{ lat: service.latitude, lng: service.longitude }}
//                   onClick={() => setSelectedStation(service)}
//                   icon={{
//                     url: '/path/to/bike-service-icon.png', // Replace with your icon
//                     scaledSize: new window.google.maps.Size(40, 40)
//                   }}
//                 />
//               ))}

//               {/* Info Window for Selected Marker */}
//               {selectedStation && (
//                 <InfoWindow
//                   position={{ 
//                     lat: selectedStation.latitude, 
//                     lng: selectedStation.longitude 
//                   }}
//                   onCloseClick={() => setSelectedStation(null)}
//                 >
//                   <div>
//                     <h3>{selectedStation.name}</h3>
//                     <p>Distance: {selectedStation.distance} km</p>
//                   </div>
//                 </InfoWindow>
//               )}
//             </GoogleMap>
//           )}
//         </LoadScript>
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

// //!PetrolOrder_Popup_message
// if (!isOpen) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg w-full max-w-md">
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-semibold">{stationData.name}</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
  
//         {/* Body */}
//         <div className="p-4 space-y-6">
//           {/* Petrol Section */}
//           <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Fuel className="w-5 h-5 text-red-500" />
//                 <span className="font-medium">Petrol</span>
//               </div>
//               <span className="text-green-600 font-semibold">
//                 ${stationData.petrolPrice}/L
//               </span>
//             </div>
//             <button 
//               className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//               onClick={() => handleOrder('petrol')}
//             >
//               Order Petrol
//             </button>
//           </div>
  
//           {/* Diesel Section */}
//           <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Droplet className="w-5 h-5 text-blue-500" />
//                 <span className="font-medium">Diesel</span>
//               </div>
//               <span className="text-green-600 font-semibold">
//                 ${stationData.dieselPrice}/L
//               </span>
//             </div>
//             <button 
//               className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               onClick={() => handleOrder('diesel')}
//             >
//               Order Diesel
//             </button>
//           </div>
//         </div>
  
//         {/* Footer */}
//         <div className="p-4 border-t flex justify-center">
//           <button
//             onClick={() => setIsOpen(false)}
//             className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default Maps;

// //!Google map in claude.ai in fetchStation

// // import React, { useState, useEffect } from 'react';
// // import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// // import { FaTruck, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';
// // import { MdLocalGasStation, MdBikeScooter } from 'react-icons/md';

// // const Maps = () => {
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [petrolStations, setPetrolStations] = useState([]);
// //   const [bikeServices, setBikeServices] = useState([]);
// //   const [selectedStation, setSelectedStation] = useState(null);

// //   // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
// //   const API_KEY = 'AIzaSyA4L11LxU4V_GJI46meHZemKPZ3kr3pJIg';

// //   // Map container style
// //   const mapContainerStyle = {
// //     width: '100%',
// //     height: '100%',
// //     minHeight: '400px'
// //   };

// //   // Fetch nearby services using Google Places API
// //   const fetchNearbyServices = (latitude, longitude) => {
// //     // Ensure Google Maps API is loaded
// //     if (!window.google) return;

// //     // Create a Places service
// //     const service = new window.google.maps.places.PlacesService(
// //       document.createElement('div')
// //     );

// //     // Petrol Stations request
// //     const petrolRequest = {
// //       location: { lat: latitude, lng: longitude },
// //       radius: '5000', // 5 km radius
// //       type: ['gas_station']
// //     };

// //     service.nearbySearch(petrolRequest, (results, status) => {
// //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
// //         const formattedPetrolStations = results.map((place, index) => ({
// //           id: place.place_id,
// //           name: place.name,
// //           latitude: place.geometry.location.lat(),
// //           longitude: place.geometry.location.lng(),
// //           price: place.price_level ? `$${place.price_level}` : 'N/A',
// //           distance: calculateDistance(
// //             { lat: latitude, lng: longitude }, 
// //             place.geometry.location
// //           ).toFixed(2),
// //           fuel: place.types.includes('convenience_store') ? ['Petrol', 'Diesel'] : ['Petrol'],
// //           rating: place.rating || 'N/A',
// //           open_now: place.opening_hours?.open_now || false
// //         }));
// //         setPetrolStations(formattedPetrolStations);
// //       }
// //     });

// //     // Bike Services request
// //     const bikeServiceRequest = {
// //       location: { lat: latitude, lng: longitude },
// //       radius: '5000', // 5 km radius
// //       keyword: 'bicycle repair shop'
// //     };

// //     service.nearbySearch(bikeServiceRequest, (results, status) => {
// //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
// //         const formattedBikeServices = results.map((place) => ({
// //           id: place.place_id,
// //           name: place.name,
// //           latitude: place.geometry.location.lat(),
// //           longitude: place.geometry.location.lng(),
// //           services: ['Repair', 'Maintenance'],
// //           distance: calculateDistance(
// //             { lat: latitude, lng: longitude }, 
// //             place.geometry.location
// //           ).toFixed(2),
// //           specialization: place.types.join(', '),
// //           rating: place.rating || 'N/A',
// //           open_now: place.opening_hours?.open_now || false
// //         }));
// //         setBikeServices(formattedBikeServices);
// //       }
// //     });
// //   };

// //   // Calculate distance between two points
// //   const calculateDistance = (point1, point2) => {
// //     const R = 6371; // Radius of the Earth in km
// //     const dLat = deg2rad(point2.lat() - point1.lat);
// //     const dLng = deg2rad(point2.lng() - point1.lng);
// //     const a = 
// //       Math.sin(dLat/2) * Math.sin(dLat/2) +
// //       Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat())) * 
// //       Math.sin(dLng/2) * Math.sin(dLng/2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// //     return R * c;
// //   };

// //   // Convert degrees to radians
// //   const deg2rad = (deg) => {
// //     return deg * (Math.PI/180);
// //   };

// //   // Get user's current location
// //   useEffect(() => {
// //     if ("geolocation" in navigator) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude } = position.coords;
// //           setUserLocation({ lat: latitude, lng: longitude });
          
// //           // Ensure Google Maps API is fully loaded before fetching services
// //           const initializeServices = () => {
// //             if (window.google && window.google.maps && window.google.maps.places) {
// //               fetchNearbyServices(latitude, longitude);
// //             } else {
// //               setTimeout(initializeServices, 500);
// //             }
// //           };
// //           initializeServices();
// //         },
// //         (error) => {
// //           console.error("Error getting location:", error);
// //           // Fallback location (e.g., city center)
// //           const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // London coordinates
// //           setUserLocation(defaultLocation);
          
// //           const initializeServices = () => {
// //             if (window.google && window.google.maps && window.google.maps.places) {
// //               fetchNearbyServices(defaultLocation.lat, defaultLocation.lng);
// //             } else {
// //               setTimeout(initializeServices, 500);
// //             }
// //           };
// //           initializeServices();
// //         }
// //       );
// //     }
// //   }, []);

// //   const handleOrderPetrol = (station) => {
// //     // Implement order logic
// //     alert(`Ordering petrol from ${station.name}`);
// //   };

// //   const handleBookBikeService = (service) => {
// //     // Implement booking logic
// //     alert(`Booking service at ${service.name}`);
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
// //       {/* Map Section */}
// //       <div className="w-full md:w-2/3 h-96 md:h-screen">
// //         <LoadScript 
// //           googleMapsApiKey={API_KEY}
// //           libraries={['places']} // Important: load Places library
// //         >
// //           {userLocation && (
// //             <GoogleMap
// //               mapContainerStyle={mapContainerStyle}
// //               center={userLocation}
// //               zoom={13}
// //             >
// //               {/* Petrol Stations Markers */}
// //               {petrolStations.map((station) => (
// //                 <Marker
// //                   key={station.id}
// //                   position={{ lat: station.latitude, lng: station.longitude }}
// //                   onClick={() => setSelectedStation(station)}
// //                   icon={{
// //                     url: 'https://cdn-icons-png.flaticon.com/128/2933/2933147.png', // Gas station icon
// //                     scaledSize: new window.google.maps.Size(40, 40)
// //                   }}
// //                 />
// //               ))}

// //               {/* Bike Services Markers */}
// //               {bikeServices.map((service) => (
// //                 <Marker
// //                   key={service.id}
// //                   position={{ lat: service.latitude, lng: service.longitude }}
// //                   onClick={() => setSelectedStation(service)}
// //                   icon={{
// //                     url: 'https://cdn-icons-png.flaticon.com/128/2404/2404344.png', // Bike repair icon
// //                     scaledSize: new window.google.maps.Size(40, 40)
// //                   }}
// //                 />
// //               ))}

// //               {/* Info Window for Selected Marker */}
// //               {selectedStation && (
// //                 <InfoWindow
// //                   position={{ 
// //                     lat: selectedStation.latitude, 
// //                     lng: selectedStation.longitude 
// //                   }}
// //                   onCloseClick={() => setSelectedStation(null)}
// //                 >
// //                   <div>
// //                     <h3 className="font-bold">{selectedStation.name}</h3>
// //                     <p>Distance: {selectedStation.distance} km</p>
// //                     <p>Rating: {selectedStation.rating}</p>
// //                     <p>Open Now: {selectedStation.open_now ? 'Yes' : 'No'}</p>
// //                   </div>
// //                 </InfoWindow>
// //               )}
// //             </GoogleMap>
// //           )}
// //         </LoadScript>
// //       </div>

// //       {/* Services List Section */}
// //       <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-white">
// //         <div className="mb-6">
// //           <h2 className="text-2xl font-bold mb-4 flex items-center">
// //             <FaTruck className="mr-2 text-blue-600" /> Nearby Petrol Stations
// //           </h2>
// //           {petrolStations.map((station) => (
// //             <div
// //               key={station.id}
// //               className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
// //             >
// //               <div className="flex items-center mb-2">
// //                 <MdLocalGasStation className="mr-2 text-xl text-yellow-600" />
// //                 <h3 className="font-semibold text-lg">{station.name}</h3>
// //               </div>
// //               <p className="text-gray-600 flex items-center">
// //                 <FaMapMarkerAlt className="mr-2 text-red-500" />
// //                 Distance: {station.distance} km
// //               </p>
// //               <p className="text-gray-600">Price Level: {station.price}</p>
// //               <p className="text-gray-500">Fuel Types: {station.fuel.join(", ")}</p>
// //               <p className="text-gray-500">Rating: {station.rating}</p>
// //               <p className="text-gray-500">
// //                 Status: {station.open_now ? 'Open' : 'Closed'}
// //               </p>
// //               <button
// //                 onClick={() => handleOrderPetrol(station)}
// //                 className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
// //               >
// //                 <FaTruck className="mr-2" /> Order Petrol
// //               </button>
// //             </div>
// //           ))}
// //         </div>

// //         <div>
// //           <h2 className="text-2xl font-bold mb-4 flex items-center">
// //             <FaWrench className="mr-2 text-green-600" /> Nearby Bike Services
// //           </h2>
// //           {bikeServices.map((service) => (
// //             <div
// //               key={service.id}
// //               className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
// //             >
// //               <div className="flex items-center mb-2">
// //                 <MdBikeScooter className="mr-2 text-xl text-green-600" />
// //                 <h3 className="font-semibold text-lg">{service.name}</h3>
// //               </div>
// //               <p className="text-gray-600 flex items-center">
// //                 <FaMapMarkerAlt className="mr-2 text-red-500" />
// //                 Distance: {service.distance} km
// //               </p>
// //               <p className="text-gray-600">
// //                 Services: {service.services.join(", ")}
// //               </p>
// //               <p className="text-gray-500">
// //                 Specialization: {service.specialization}
// //               </p>
// //               <p className="text-gray-500">Rating: {service.rating}</p>
// //               <p className="text-gray-500">
// //                 Status: {service.open_now ? 'Open' : 'Closed'}
// //               </p>
// //               <button
// //                 onClick={() => handleBookBikeService(service)}
// //                 className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition flex items-center justify-center"
// //               >
// //                 <FaWrench className="mr-2" /> Book Service
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Maps;