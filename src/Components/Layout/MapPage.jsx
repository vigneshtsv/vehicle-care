import React, { useState, useEffect } from 'react';
import { Fuel, X, Droplet, Bike, MapPin, Wrench, Option, ChevronDown, AlertCircle } from 'lucide-react';
import { Button, Label, Select, Textarea, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../../Redux/Slice/authSlice';
import TopBar from '../UserComponents/TopBar';
import Footer from '../UserComponents/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const MOCK_SERVICES = [
  {
    Id: 1,
    Name: "Rapid Bike Service",
    latitude: 51.5274,
    longitude: -0.1478,
    Services : ["Repair", "Maintenance"],
    Distance: 4.1,
    Specialization: "Mountain Bikes",
    Location: "Madurai, Tamil Nadu",
  },
  {
    Id: 2,
    Name: "Quick Fix Bikes",
    latitude: 51.4874,
    longitude: -0.1078,
    Services: ["Tune-up", "Emergency Repair"],
    Distance: 5.3,
    Specialization: "Road Bikes",
    Location:"Madurai Main Road, Tamil Nadu",
  },
  {
    Id: 3,
    Name: "Vignesh Bike Service",
    latitude: 51.5274,
    longitude: -0.1478,
    Services : ["Emergency Repair", "Tyre Puncture"],
    Distance: 4.1,
    Specialization: "Mountain Bikes",
    Location:"Madurai Ring Road, Tamil Nadu",
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
  const { currentUser } = useSelector((state)=>state.user)
  const [fuelOrder, setFuelOrder] = useState({
    Petrol_Quantity: '',
    Disel_Quantity: ''
  });
  const [petrolData,setPetrolData]= useState([{}])
  
const dispatch = useDispatch()
const API_KEY = 'AIzaSyBnXL2sG0JrqGst0lr1djzdl7gUFDFpQ_c';
const BE_API_URL = 'http://localhost:5000/api'

useEffect(() => {
  fetchPetrolData();
},[]);

const fetchPetrolData = async () => {
  try {
    const response = await axios.get(`${BE_API_URL}/petrolstation/getpetroldata`)
    
    if(response.data.users && Array.isArray(response.data.users)) {
      setPetrolData(response.data.users);
    } else {
      console.error("Invalid petrol data received:", response.data);
      // Incase fetch data error else working on this mock data
      setPetrolData([
        {
          id: 1,
          StationName: "BP Petrol Station",
          Location: "Delhi, India",
          PetrolPrice: 102.5,
          DiselPrice: 95.5,
          Distance: 5.2,
          Fuel: ["Petrol", "Diesel"]
        },
        {
          id: 2,
          StationName: "HP Petrol Station",
          Location: "Mumbai, India",
          PetrolPrice: 105.5,
          DiselPrice: 97.5,
          Distance: 7.2,
          Fuel: ["Petrol", "Diesel"]
        },
        {
          id: 3,
          StationName: "IOCL Petrol Station",
          Location: "Bangalore, India",
          PetrolPrice: 100.5,
          DiselPrice: 93.5,
          Distance: 10.2,
          Fuel: ["Petrol", "Diesel"]
        }
      ])
    }
  } catch (error) {
    console.error("Error fetching petrol stations:", error);
  }
};

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
        ...petrolData.map(station => {
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
                  <h3 class="font-semibold">${station.StationName}</h3>
                  <p>Distance: ${station.Distance} km</p>
                  <p>Petrol: ₹${station.PetrolPrice}</p>
                  <p>Diesel: ₹${station.DiselPrice}</p>
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
                  <h3 class="font-semibold">${service.StationName}</h3>
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
    console.log('handleOrderPetrol fuel from:', station.StationName);
    
  };

  const handleBookBikeService = async(service) => {
    setSelectedStation(service);
    setIsOpenBike(true);
    // console.log('handleBookBikeService service from:', service.StationName);
  };


  const handlePetrolOrderSubmit = async(e) => {
    e.preventDefault();

    try {
      const createdAt = new Date().toISOString();

      const orderData = { 
         Email: currentUser?.Email || '',
         StationName:selectedStation?.StationName || '',
         Location: selectedStation?.Location || 'Madurai, Tamil Nadu',
         createdAt: createdAt,
         Petrol_Price: fuelOrder.Petrol_Quantity * (selectedStation?.PetrolPrice || 0),
         Petrol_Quantity:parseFloat(fuelOrder.Petrol_Quantity) || 0,
         Status: 'Waiting'
     }
     
     
     const totalAmount = (orderData.Petrol_Price * orderData.Petrol_Quantity) + 
                     (orderData.Disel_Price * orderData.Disel_Quantity);
                     orderData.TotalAmount = totalAmount;
 
      const response = await axios.post(`${BE_API_URL}/order/customerorder?email=${currentUser.Email}`, orderData)
      
      console.log(orderData,response); 
      toast.success(`${currentUser.FirstName} your order Petrol ${orderData.Petrol_Quantity}Ltr Conformed`)  
      // setIsOpenPetrol(false);         
    } catch (error) {
      console.error("Error petrolorder creating order:", error);
    }
  }

  const handleDieselOrderSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdAt = new Date().toISOString();

      const orderData = {
        Email: currentUser?.Email || "",
        StationName: selectedStation?.StationName || "",
        Location: selectedStation?.Location || "Madurai, Tamil Nadu",
        createdAt: createdAt,
        Disel_Price:
          fuelOrder.Disel_Quantity * (selectedStation?.DiselPrice || 0),
        Disel_Quantity: parseFloat(fuelOrder.Disel_Quantity) || 0,
        Status: "Waiting",
      };

      const totalAmount =
        orderData.Petrol_Price * orderData.Petrol_Quantity +
        orderData.Disel_Price * orderData.Disel_Quantity;
      orderData.TotalAmount = totalAmount;
      const response = await axios.post(`${BE_API_URL}/order/customerorder?email=${currentUser.Email}`, orderData)
      
      toast.success(`${currentUser.FirstName} your order Disel ${orderData.Disel_Quantity}Ltr Received`) 
      console.log(orderData, response);
    } catch (error) {
      console.error("Error diselorder creating order:", error);
    }
  };
  const handleBook = async() => {
    if(!selectedStation || !selectedProblem) {
      toast.error("Please select a problem type");
      return;
    }
    const createdAt = new Date().toISOString();

    try {
      const updatedBookingData = {
        ...selectedStation,
        Email: currentUser?.Email,
        ServiceName: selectedStation.Name,
        Location: selectedStation.Location, 
        Problem_Type: selectedProblem,
        Service_Type: selectedProblem === 'others' ? otherDescription : problemDescriptions[selectedProblem],
        Distance: selectedStation.Distance,
        Description:'',
        PhoneNumber: currentUser?.PhoneNumber || '',
        createdAt: createdAt,
        Status:'Waiting'
      }
     
    const response = await axios.post(`${BE_API_URL}/order/customerorder?email=${currentUser.Email}`,
      updatedBookingData
    );

    if(response.status === 200) {
    console.log('Service booking response:', response);
    toast.success(`${currentUser.FirstName}, your bike service booking with ${selectedStation.Name} has been confirmed!`);

    // setSelectedProblem('');
    // setOtherDescription('');
    setIsOpenBike(false);
    } else {
      toast.error("Something went wrong with your booking.");
    }
    } catch (error) {
      console.error("Error booking bike service:", error);
      toast.error("Failed to book bike service. Please try again.");
    }
  };
  const handleQuantityChange = (e) => {
    const { id, value } = e.target;
    setFuelOrder(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const problemDescriptions = {
    tyreProblems: "Common tyre issues include punctures, low pressure, uneven wear, or damaged sidewalls. Regular inspection and maintenance can prevent most tyre-related problems.",
    bikeNotStart: "If your bike won't start, it could be due to a dead battery, fuel system issues, spark plug problems, or electrical system failures. Check these components first.",
    engineProblems: "Engine problems may include unusual noises, loss of power, overheating, or oil leaks. These issues require immediate attention from a qualified mechanic."
  };

  return (<>
  <TopBar/>
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-tr from-orange-500 via-yellow-500 to-purple-500 relative">
      {/* Map Section */}
      <div className="w-full md:w-2/3 h-96 md:h-screen">
        <div id="map" className="w-full h-full" />
      </div>
      {/* Services List */}
      <div className="w-full md:w-1/3">
      <div className="bg-yellow-300 flex mb-4 shadow-xl">
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
        <div className="rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Fuel className="mr-2 text-blue-600" /> Nearby Petrol Stations
            </h2>
            {petrolData.map((station) => (
              <div
                key={station.Id}
                className="border p-4 mb-4 rounded-lg shadow-sm hover:bg-yellow-200 transition"
              >
                <div className="flex items-center mb-2">
                  <Fuel className="mr-2 text-xl text-yellow-600" />
                  <h3 className="font-semibold text-lg">{station.StationName}</h3>
                </div>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="mr-2 text-red-500" />
                  Distance: {station.Distance} km
                </p>
                <p className="text-gray-600">
                  Petrol: ₹{station.PetrolPrice}/liter
                </p>
                <p className="text-gray-600">
                  Diesel: ₹{station.DiselPrice}/liter
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
        <div className="bg-transparent rounded-lg shadow">
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
        
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
            <form onSubmit={handlePetrolOrderSubmit}>
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
                <TextInput id='Petrol_Quantity' type='number' placeholder='Enter your petrol_quantity for Liter' value={fuelOrder.Petrol_Quantity} min={1} onChange={handleQuantityChange}/>
                <Button type='submit' className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Order Petrol
                </Button>
              </div>
            </form>
              
              

              <form onSubmit={handleDieselOrderSubmit}>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Diesel</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    ₹{selectedStation.DiselPrice}/L
                  </span>
                </div>
                <TextInput id='Disel_Quantity' type='number' placeholder='Enter your Disel_Quantity for Liter' value={fuelOrder.Disel_Quantity} min={1} onChange={handleQuantityChange}/>
                <Button type='submit' className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Order Disel
                </Button>
              </div>
              </form>
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
        </div>
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
                  <Textarea
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