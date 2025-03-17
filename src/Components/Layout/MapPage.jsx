import React, { useState, useEffect } from 'react';
import { Fuel, X, Droplet, Bike, MapPin, Wrench, Option, ChevronDown, AlertCircle } from 'lucide-react';
import { Button, Label, Select, Textarea } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../../Redux/Slice/authSlice';
import TopBar from '../UserComponents/TopBar';
import Footer from '../UserComponents/Footer';

// Simulated data
const MOCK_STATIONS = [
  {
    Id: 1,
    Name: "VLS PetrolStation",
    latitude: 51.5174,
    longitude: -0.1378,
    PetrolPrice: 93.20,
    DieselPrice: 82.30,
    Distance: 2.5,
    Fuel: ["Petrol", "Diesel"]
  },
  {
    Id: 2,
    Name: "BP PetrolStation",
    latitude: 51.4974,
    longitude: -0.1178,
    PetrolPrice: 94.00,
    DieselPrice: 84.00,
    Distance: 3.2,
    Fuel: ["Petrol", "Diesel"]
  }
];

const MOCK_SERVICES = [
  {
    Id: 1,
    Name: "Rapid Bike Service",
    latitude: 51.5274,
    longitude: -0.1478,
    Services : ["Repair", "Maintenance"],
    Distance: 4.1,
    Specialization: "Mountain Bikes"
  },
  {
    Id: 2,
    Name: "Quick Fix Bikes",
    latitude: 51.4874,
    longitude: -0.1078,
    Services: ["Tune-up", "Emergency Repair"],
    Distance: 5.3,
    Specialization: "Road Bikes"
  }
];

const Maps = () => {
  const [userLocation, setUserLocation] = useState({ lat: 51.5074, lng: -0.1278 });
  const [selectedStation, setSelectedStation] = useState(null);
  const [isOpenPetrol, setIsOpenPetrol] = useState(false);
  const [isOpenBike, setIsOpenBike] = useState(false)
  const [map, setMap] = useState(null);
  const [activeTab, setActiveTab] = useState('petrol');
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const { currentUser } = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  console.log(currentUser);
  
  
  const API_KEY = 'AIzaSyBnXL2sG0JrqGst0lr1djzdl7gUFDFpQ_c';

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
      script.defer = true;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup markers
      markers.forEach(marker => marker.setMap(null));
    };
  }, []);

  useEffect(() => {
    if (map) {
        dispatch(signInSuccess)
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Add markers for stations and services
      const newMarkers = [
        ...MOCK_STATIONS.map(station => {
          const marker = new google.maps.Marker({
            position: { lat: station.latitude, lng: station.longitude },
            map: map,
            icon: {
              url: '/api/placeholder/32/32',
              scaledSize: new google.maps.Size(32, 32)
            },
            title: station.Name
          });

          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.close();
            }
            const newInfoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${station.Name}</h3>
                  <p>Distance: ${station.Distance} km</p>
                  <p>Petrol: ₹${station.PetrolPrice}</p>
                  <p>Diesel: ₹${station.DieselPrice}</p>
                </div>
              `
            });
            newInfoWindow.open(map, marker);
            setInfoWindow(newInfoWindow);
            setSelectedStation(station);
          });

          return marker;
        }),
        ...MOCK_SERVICES.map(service => {
          const marker = new google.maps.Marker({
            position: { lat: service.latitude, lng: service.longitude },
            map: map,
            icon: {
              url: '/api/placeholder/32/32',
              scaledSize: new google.maps.Size(32, 32)
            },
            title: service.Name
          });

          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.close();
            }
            const newInfoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${service.Name}</h3>
                  <p>Distance: ${service.Distance} km</p>
                  <p>Services: ${service.Services.join(', ')}</p>
                </div>
              `
            });
            newInfoWindow.open(map, marker);
            setInfoWindow(newInfoWindow);
            setSelectedStation(service);
          });

          return marker;
        })
      ];

      setMarkers(newMarkers);
    }
  }, [map]);

  const initializeMap = () => {
    if (window.google) {
      const mapInstance = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Add user location marker
      new google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        icon: {
          url: '/api/placeholder/32/32',
          scaledSize: new google.maps.Size(32, 32)
        },
        title: 'Your Location'
      });

      setMap(mapInstance);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          if (map) {
            map.setCenter(newLocation);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [map]);

  const handleOrderPetrol = (station) => {
    setSelectedStation(station);
    setIsOpenPetrol(true);
  };

  const handleBookBikeService = (service) => {
    setSelectedStation(service);
    setIsOpenBike(true);
  };

  const handleOrder = (fuelType) => {
    alert(`Ordering ${fuelType} from ${selectedStation.Name}`);
    setIsOpenPetrol(false);
  };
  const handleBook = () => {
    alert(`Ordering bike service for ${selectedStation.Name}`)
    setIsOpenBike(false);
  }

  const problemDescriptions = {
    tyreProblems: "Common tyre issues include punctures, low pressure, uneven wear, or damaged sidewalls. Regular inspection and maintenance can prevent most tyre-related problems.",
    bikeNotStart: "If your bike won't start, it could be due to a dead battery, fuel system issues, spark plug problems, or electrical system failures. Check these components first.",
    engineProblems: "Engine problems may include unusual noises, loss of power, overheating, or oil leaks. These issues require immediate attention from a qualified mechanic."
  };

  return (<>
  <TopBar/>
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Map Section */}
      <div className="w-full md:w-2/3 h-96 md:h-screen">
        <div id="map" className="w-full h-full" />
      </div>
      {/* Services List */}
      <div className="w-full md:w-1/3">
      <div className="flex mb-4 border-b">
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'petrol' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('petrol')}
        >
          Petrol Stations
        </button>
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'service' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('service')}
        >
          Bike Services
        </button>
      </div>

      {activeTab === 'petrol' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Fuel className="mr-2 text-blue-600" /> Nearby Petrol Stations
            </h2>
            {MOCK_STATIONS.map((station) => (
              <div
                key={station.Id}
                className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-center mb-2">
                  <Fuel className="mr-2 text-xl text-yellow-600" />
                  <h3 className="font-semibold text-lg">{station.Name}</h3>
                </div>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="mr-2 text-red-500" />
                  Distance: {station.Distance} km
                </p>
                <p className="text-gray-600">
                  Petrol: ₹{station.PetrolPrice}/liter
                </p>
                <p className="text-gray-600">
                  Diesel: ₹{station.DieselPrice}/liter
                </p>
                <button
                  onClick={() => handleOrderPetrol(station)}
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
                >
                  <Fuel className="mr-2" /> Order Fuel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'service' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Wrench className="mr-2 text-green-600" /> Nearby Bike Services
            </h2>
            {MOCK_SERVICES.map((service) => (
              <div
                key={service.Id}
                className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-center mb-2">
                  <Bike className="mr-2 text-xl text-green-600" />
                  <h3 className="font-semibold text-lg">{service.Name}</h3>
                </div>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="mr-2 text-red-500" />
                  Distance: {service.Distance} km
                </p>
                <p className="text-gray-600">
                  Services: {service.Services.join(", ")}
                </p>
                <p className="text-gray-500">
                  Specialization: {service.Specialization}
                </p>
                <button
                  onClick={() => handleBookBikeService(service)}
                  className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition flex items-center justify-center"
                >
                  <Wrench className="mr-2" /> Book Service
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
      {/* Fuel Order popup Modal */}
      {isOpenPetrol && selectedStation && (
        <div1 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">{selectedStation.Name}</h2>
              <Button
                onClick={() => setIsOpenPetrol(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Petrol</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    ₹{selectedStation.PetrolPrice}/L
                  </span>
                </div>
                <button
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleOrder("petrol")}
                >
                  Order Petrol
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Diesel</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    ₹{selectedStation.DieselPrice}/L
                  </span>
                </div>
                <button
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleOrder("diesel")}
                >
                  Order Diesel
                </button>
              </div>
            </div>

            <div className="p-4 border-t flex justify-center">
              <Button
                onClick={() => setIsOpenPetrol(false)}
                className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div1>
      )}

      {/* bike service popup model */}
      {isOpenBike && selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">{selectedStation.Name}</h2>
              <Button
                onClick={() => setIsOpenBike(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{selectedStation.Distance}Km</span>
            </div>

            {/* selected option method for bikeservice */}
            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              <div className="relative">
                <select
                  value={selectedProblem}
                  onChange={(e) => setSelectedProblem(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a problem type</option>
                  <option value="tyreProblems">Tyre Problems</option>
                  <option value="bikeNotStart">Bike Not Starting</option>
                  <option value="engineProblems">Engine Problems</option>
                  <option value="others">Others</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={20}
                />
              </div>

              {selectedProblem && selectedProblem !== "others" && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    {problemDescriptions[selectedProblem]}
                  </p>
                </div>
              )}

              {selectedProblem === "others" && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="text-blue-500 mt-1" size={20} />
                    <p className="text-sm text-gray-600">
                      Please describe your problem in detail below
                    </p>
                  </div>
                  <textarea
                    value={otherDescription}
                    onChange={(e) => setOtherDescription(e.target.value)}
                    placeholder="Describe your problem here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 p-5">
              <Button
                variant="outline"
                onClick={() => setIsOpenBike(false)}
                className="bg-red-500 text-white hover:bg-red-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleBook()}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Order Service
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Maps;