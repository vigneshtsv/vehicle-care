// export const fetchNearbyStations = async (lat, lon, radius = 5000) => {
//     const query = `
//       [out:json];
//       node["amenity"="fuel"](around:${radius},${lat},${lon});
//       out;
//     `;
  
//     const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
//     const response = await fetch(url);
//     const data = await response.json();
  
//     return data.elements.map((station) => ({
//       id: station.id,
//       lat: station.lat,
//       lon: station.lon,
//       name: station.tags.name || "Unknown Station",
//     }));
//   };
  
//!second time chatGPT code
// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const Maps = () => {
//   const [location, setLocation] = useState(null);
//   const [stations, setStations] = useState([]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lon: position.coords.longitude,
//         };
//         setLocation(userLocation);

//         const nearbyStations = await fetchNearbyStations(
//           userLocation.lat,
//           userLocation.lon
//         );
//         setStations(nearbyStations);
//       });
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   if (!location) return <div>Loading map...</div>;

//   return (
//     <MapContainer
//       center={[location.lat, location.lon]}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {stations.map((station) => (
//         <Marker key={station.id} position={[station.lat, station.lon]}>
//           <Popup>{station.name}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default Maps;


//!complete fecthnearbylocation code

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// // Mock function to fetch nearby petrol stations
// const fetchNearbyStations = async (latitude, longitude) => {
//   // Simulated delay
//   await new Promise((resolve) => setTimeout(resolve, 1000));
  
//   // Mock data (replace with API call in a real app)
//   return [
//     { id: 1, name: "Petrol Station A", lat: latitude + 0.01, lon: longitude + 0.01 },
//     { id: 2, name: "Petrol Station B", lat: latitude - 0.01, lon: longitude - 0.01 },
//     { id: 3, name: "Petrol Station C", lat: latitude + 0.02, lon: longitude - 0.02 },
//   ];
// };

// const MapWithPetrolStations = () => {
//   const [location, setLocation] = useState(null);
//   const [stations, setStations] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           try {
//             const userLocation = {
//               lat: position.coords.latitude,
//               lon: position.coords.longitude,
//             };
//             setLocation(userLocation);

//             // Fetch nearby stations
//             const nearbyStations = await fetchNearbyStations(
//               userLocation.lat,
//               userLocation.lon
//             );
//             setStations(nearbyStations);
//           } catch (err) {
//             setError("Failed to fetch petrol stations.");
//           }
//         },
//         (err) => {
//           setError("Failed to retrieve your location.");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   if (error) return <div>{error}</div>;
//   if (!location) return <div>Loading map...</div>;

//   return (
//     <MapContainer
//       center={[location.lat, location.lon]}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {stations.map((station) => (
//         <Marker key={station.id} position={[station.lat, station.lon]}>
//           <Popup>{station.name}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapWithPetrolStations;

//!fetchnearbylocation by iframe

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import "leaflet/dist/leaflet.css";
// import "react-leaflet-markercluster/dist/styles.min.css";

// // Function to fetch nearby petrol bunks using OpenStreetMap Overpass API
// const fetchPetrolBunks = async (latitude, longitude) => {
//   const radius = 0.01; // ~1km bounding box
//   const query = `
//     [out:json];
//     (
//       node["amenity"="fuel"](${latitude - radius},${longitude - radius},${
//     latitude + radius
//   },${longitude + radius});
//     );
//     out body;
//   `;
//   const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
//     query
//   )}`;

//   const response = await fetch(url);
//   const data = await response.json();

//   return data.elements.map((station) => ({
//     id: station.id,
//     lat: station.lat,
//     lon: station.lon,
//     name: station.tags?.name || "Unnamed Petrol Station",
//   }));
// };

// const Maps = () => {
//   const [location, setLocation] = useState(null);
//   const [petrolBunks, setPetrolBunks] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const userLocation = {
//               lat: position.coords.latitude,
//               lon: position.coords.longitude,
//             };
//             setLocation(userLocation);

//             try {
//               const bunks = await fetchPetrolBunks(
//                 userLocation.lat,
//                 userLocation.lon
//               );
//               setPetrolBunks(bunks);
//             } catch (err) {
//               setError("Failed to fetch nearby petrol bunks.");
//             }
//           },
//           () => {
//             setError("Failed to retrieve your location.");
//           }
//         );
//       } else {
//         setError("Geolocation is not supported by your browser.");
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) return <div>{error}</div>;
//   if (!location) return <div>Loading map...</div>;

//   return (
//     <MapContainer
//       center={[location.lat, location.lon]}
//       zoom={13}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[location.lat, location.lon]}>
//         <Popup>Your Location</Popup>
//       </Marker>
//       <MarkerClusterGroup>
//         {petrolBunks.map((bunk) => (
//           <Marker key={bunk.id} position={[bunk.lat, bunk.lon]}>
//             <Popup>{bunk.name}</Popup>
//           </Marker>
//         ))}
//       </MarkerClusterGroup>
//     </MapContainer>
//   );
// };

// export default Maps;

//!google cloud iframe code
// import React from 'react';

// const Maps = () => {
//   return (
//     <iframe
//       width="450"
//       height="250"
//       frameBorder="0"
//       style={{ border: 0 }}
//       referrerPolicy="no-referrer-when-downgrade"
//       src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA2mOkSPgjfTYZe-TeeP2DLseXUYttbX8s&q=Eiffel+Tower,Paris+France"
//       allowFullScreen
//       title="Eiffel Tower Location"
//     ></iframe>
//   );
// };

// export default Maps;

//!claude.ai code in open-street-map

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaGasPump } from 'react-icons/fa';

// const API_KEY = 'AIzaSyA2mOkSPgjfTYZe-TeeP2DLseXUYttbX8s';
// const API_URL = 'https://maps.googleapis.com/petrol-stations';   //https://maps.googleapis.com/maps/api/geocode/json?key=YOUR_API_KEY&address=ADDRESS


// const Maps = () => {
//   const [stations, setStations] = useState([]);
//   const [location, setLocation] = useState({ lat: null, lng: null });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (location.lat && location.lng) {
//       fetchPetrolStations();
//     }
//   }, [location]);

//   const fetchPetrolStations = async () => {
//     try {
//       const response = await axios.get(`${API_URL}?lat=${location.lat}&lng=${location.lng}&key=${API_KEY}`);
//       setStations(response.data.stations);
//     } catch (error) {
//       console.error('Error fetching petrol stations:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="w-full md:w-1/2 h-96">
//         <iframe
//           title="Map"
//           src={`https://www.google.com/maps/embed/v1/view?key=${API_KEY}&center=${location.lat},${location.lng}&zoom=12`}
//           width="100%"
//           height="100%"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div className="w-full md:w-1/2 p-4">
//         <h2 className="text-xl font-bold mb-4">Nearby Petrol Stations</h2>
//         <ul className="space-y-4">
//           {stations.map((station) => (
//             <li key={station.id} className="flex items-center p-4 border rounded-lg shadow">
//               <FaGasPump className="text-green-500 mr-2" />
//               <div>
//                 <h3 className="font-semibold">{station.name}</h3>
//                 <p>Price: ${station.price}</p>
//                 <p>{station.details}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Maps;



import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaGasPump, FaWrench } from 'react-icons/fa';
import { Card, Button, Modal } from 'flowbite-react';

// Configuration (Note: Replace with your actual API keys and endpoints)
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
const NEARBY_STATIONS_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const Maps = () => {
  // State management
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  // Fetch user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyStations(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location (e.g., city center)
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    }
  };

  // Fetch nearby petrol stations
  const fetchNearbyStations = async (lat, lng) => {
    try {
      const response = await fetch(`${NEARBY_STATIONS_API_URL}?location=${lat},${lng}&radius=5000&type=gas_station&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      setNearbyStations(data.results || []);
    } catch (error) {
      console.error("Error fetching nearby stations:", error);
    }
  };

  // Component lifecycle
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
      {/* Map Integration */}
      <div className="w-full md:w-1/2">
        {userLocation && (
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&q=gas+stations+near+me&center=${userLocation.lat},${userLocation.lng}&zoom=13`}
          ></iframe>
        )}
      </div>

      {/* Nearby Stations List */}
      <div className="w-full md:w-1/2">
        <Card>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-xl" />
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nearby Petrol Stations
            </h5>
          </div>
          
          {nearbyStations.map((station) => (
            <div 
              key={station.place_id} 
              className="border-b py-3 last:border-b-0 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => setSelectedStation(station)}
            >
              <div>
                <h3 className="font-semibold text-lg">{station.name}</h3>
                <p className="text-sm text-gray-500">{station.vicinity}</p>
              </div>
              <div className="flex items-center">
                <FaGasPump className="mr-2 text-blue-500 text-xl" />
                <FaWrench className="text-green-500 text-xl" />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Station Details Modal */}
      {selectedStation && (
        <Modal 
          show={!!selectedStation} 
          onClose={() => setSelectedStation(null)}
        >
          <Modal.Header>
            {selectedStation.name}
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <p>
                <strong>Address:</strong> {selectedStation.vicinity}
              </p>
              <p>
                <strong>Current Status:</strong> {selectedStation.business_status || 'Unknown'}
              </p>
              <Button 
                gradientDuoTone="greenToBlue"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedStation.vicinity)}`, 
                    '_blank'
                  );
                }}
              >
                Get Directions
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Maps;