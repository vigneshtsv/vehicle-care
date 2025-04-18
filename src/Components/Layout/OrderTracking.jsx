import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Truck, Phone } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Modal } from 'flowbite-react';


const GOOGLE_MAPS_API_KEY = 'AIzaSyBnXL2sG0JrqGst0lr1djzdl7gUFDFpQ_c';

const OrderTracking = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [updatePopup,setUpdatePopup] = useState(false);

  const [customerLocation] = useState({
    lat: 13.0827,  // Example: Chennai coordinates
    lng: 80.2707
  });
  
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState({
    lat: 13.0850,  // Nearby location
    lng: 80.2750
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

    // Create map instance
    const mapOptions = {
      center: customerLocation,
      zoom: 14,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };

    const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(mapInstance);

    // Initialize directions service and renderer
    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#2563eb',
        strokeWeight: 4
      }
    });

    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Add markers
    new window.google.maps.Marker({
      position: customerLocation,
      map: mapInstance,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#ef4444',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff'
      },
      title: 'Customer Location'
    });

    const deliveryMarker = new window.google.maps.Marker({
      position: deliveryBoyLocation,
      map: mapInstance,
      icon: {
        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 6,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
        rotation: 45
      },
      title: 'Delivery Agent'
    });

    // Calculate and display route
    calculateRoute(directionsServiceInstance, directionsRendererInstance);

    // Simulate delivery boy movement
    const interval = setInterval(() => {
      const newLat = deliveryBoyLocation.lat + (Math.random() - 0.5) * 0.001;
      const newLng = deliveryBoyLocation.lng + (Math.random() - 0.5) * 0.001;
      const newLocation = { lat: newLat, lng: newLng };
      
      setDeliveryBoyLocation(newLocation);
      deliveryMarker.setPosition(newLocation);
      calculateRoute(directionsServiceInstance, directionsRendererInstance);
    }, 5000);

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
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Live Delivery Tracking
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
             {/* add map component */}
          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg overflow-hidden bg-gray-100"
          />

          {/* Location Info */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border">
              <MapPin className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Customer Location
                </p>
                <p className="text-xs text-gray-600">
                  {customerLocation.lat.toFixed(4)},{" "}
                  {customerLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border">
              <Navigation className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Delivery Agent
                </p>
                <p className="text-xs text-gray-600">
                  {deliveryBoyLocation.lat.toFixed(4)},{" "}
                  {deliveryBoyLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h6 className="text-sm font-medium text-gray-900">
                  Order #12345
                </h6>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">On the way</span>
                </div>
              </div>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                onClick={() => setUpdatePopup(true)}
              >
                <Phone className="h-4 w-4" />
                Contact Driver
              </button>
            </div>
          </div>
          {updatePopup && (
            <Modal show={updatePopup} size='xl' popup onClose={handleClosePopup}>
              <Modal.Header>Update Project</Modal.Header>
              <Modal.Body>
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className="text-gray-600 mb-4">
                        We're improving our e-commerce platform with new features and enhanced tracking capabilities. 
                        The system will remain operational during the update.
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
                      onClick={() => setUpdatePopup(false)}
                    >
                      Close
                    </button>
                  </div>
                  </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;