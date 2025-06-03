import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Truck, Phone, ArrowLeft, Clock, Star, User, MessageCircle, Zap } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBnXL2sG0JrqGst0lr1djzdl7gUFDFpQ_c';

const OrderTracking = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [deliveryMarker, setDeliveryMarker] = useState(null);

  const [customerLocation] = useState({
    lat: 13.0827,  // Chennai coordinates
    lng: 80.2707,
    address: "Marina Beach Road, Chennai"
  });
  
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState({
    lat: 13.0850,  // Nearby location
    lng: 80.2750,
    address: "Anna Salai, Chennai"
  });

  const [deliveryAgent] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
    vehicle: "Honda Activa - TN 09 XY 1234",
    eta: "12-15 min"
  });

  // Initialize Google Maps
  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
        initializeMap();
      };
      document.head.appendChild(script);
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Create map instance with custom styling
    const mapOptions = {
      center: customerLocation,
      zoom: 14,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
        }
      ]
    };

    const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(mapInstance);

    // Initialize directions service and renderer
    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#3B82F6',
        strokeWeight: 5,
        strokeOpacity: 0.8
      }
    });

    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Add customer marker
    new window.google.maps.Marker({
      position: customerLocation,
      map: mapInstance,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#EF4444',
        fillOpacity: 1,
        strokeWeight: 3,
        strokeColor: '#ffffff'
      },
      title: 'Delivery Destination'
    });

    // Add delivery agent marker
    const deliveryMarkerInstance = new window.google.maps.Marker({
      position: deliveryBoyLocation,
      map: mapInstance,
      icon: {
        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 8,
        fillColor: '#3B82F6',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
        rotation: 45
      },
      title: 'Delivery Agent',
      animation: window.google.maps.Animation.BOUNCE
    });

    setDeliveryMarker(deliveryMarkerInstance);

    // Calculate and display route
    calculateRoute(directionsServiceInstance, directionsRendererInstance);

    // Simulate delivery agent movement
    const interval = setInterval(() => {
      const newLat = deliveryBoyLocation.lat + (Math.random() - 0.5) * 0.0008;
      const newLng = deliveryBoyLocation.lng + (Math.random() - 0.5) * 0.0008;
      const newLocation = { lat: newLat, lng: newLng };
      
      setDeliveryBoyLocation(prev => ({ ...prev, ...newLocation }));
      deliveryMarkerInstance.setPosition(newLocation);
      calculateRoute(directionsServiceInstance, directionsRendererInstance);
    }, 6000);

    return () => clearInterval(interval);
  };

  const calculateRoute = (service, renderer) => {
    if (!service || !renderer) return;

    service.route({
      origin: deliveryBoyLocation,
      destination: customerLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK') {
        renderer.setDirections(response);
      }
    });
  };

  const handleClosePopup = () => {
    setUpdatePopup(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">Live Tracking</h1>
                  <p className="text-sm text-gray-500 font-medium">Order #ORD-12345</p>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200 shadow-sm">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-700">Out for Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Main Map Section */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/60">
              {/* Map Header */}
              <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold mb-1">Real-time Tracking</h2>
                    <p className="text-blue-100 text-sm">Follow your delivery in real-time</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">ETA: {deliveryAgent.eta}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-full">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">2.1 km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Container */}
              <div className="relative">
                <div
                  ref={mapRef}
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] bg-gray-100"
                />
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">Loading Google Maps...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Details */}
              <div className="p-6 bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Location Card */}
                  <div className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="p-2.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                        <MapPin className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 mb-1">Delivery Address</p>
                        <p className="text-sm text-gray-600 mb-2">{customerLocation.address}</p>
                        <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                          {customerLocation.lat.toFixed(4)}, {customerLocation.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Agent Location Card */}
                  <div className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Navigation className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 mb-1">{deliveryAgent.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{deliveryBoyLocation.address}</p>
                        <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                          {deliveryBoyLocation.lat.toFixed(4)}, {deliveryBoyLocation.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/60">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Out for Delivery</h3>
                <p className="text-sm text-gray-600">Your order is on its way!</p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 mb-6">
                {[
                  { label: "Order Confirmed", completed: true, time: "2:30 PM" },
                  { label: "Preparing", completed: true, time: "3:15 PM" },
                  { label: "Out for Delivery", completed: true, current: true, time: "4:00 PM" },
                  { label: "Delivered", completed: false, time: "~4:15 PM" }
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      step.completed 
                        ? step.current 
                          ? 'bg-emerald-500 ring-4 ring-emerald-100 shadow-sm' 
                          : 'bg-emerald-500'
                        : 'bg-gray-200 border-2 border-gray-300'
                    }`} />
                    <div className="flex-1">
                      <span className={`text-sm block ${
                        step.current ? 'font-bold text-emerald-700' : 
                        step.completed ? 'font-medium text-gray-700' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                      <span className="text-xs text-gray-500">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Button */}
              <button
                onClick={() => setUpdatePopup(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Driver</span>
              </button>
            </div>

            {/* Agent Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/60">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{deliveryAgent.name}</h4>
                  <p className="text-sm text-gray-600">{deliveryAgent.vehicle}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Rating</span>
                  </span>
                  <span className="font-bold text-yellow-600 text-lg">★ {deliveryAgent.rating}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span>Contact</span>
                  </span>
                  <span className="font-medium text-gray-900">{deliveryAgent.phone}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span>ETA</span>
                  </span>
                  <span className="font-bold text-green-600">{deliveryAgent.eta}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Popup */}
      {updatePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Delivery Agent</h3>
                <p className="text-gray-600">Get in touch with your delivery agent</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{deliveryAgent.name}</p>
                      <p className="text-sm text-gray-600">{deliveryAgent.phone}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-medium text-gray-700">{deliveryAgent.rating} Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <MessageCircle className="h-5 w-5" />
                    <span>Message</span>
                  </button>
                </div>

                <button
                  onClick={handleClosePopup}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;