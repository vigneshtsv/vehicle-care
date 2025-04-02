import React, { useEffect, useState } from 'react'
import TopBar from '../Components/UserComponents/TopBar'
import Footer from '../Components/UserComponents/Footer'
import { Button, Card, Label } from "flowbite-react";
import { CarouselOne } from '../Components/Layout/CarouselOne';
import { Form } from 'react-router-dom';
import { TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { setCurrentUser } from '../Redux/Slice/authSlice';
import { toast } from 'react-toastify';


function PetrolStationDashboard() {
  const {currentUser} = useSelector(state => state.user);
  const [petrolData, setPetrolData] = useState({});
  const [ currentStation,setCurretStation ] = useState([]);
  const [formData, setFormData] = useState({
    StationName : `${currentUser?.StationName}`,
    Distance : '2.5', 
    PetrolPrice : '',
    DiselPrice : '',
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
 //dispatch(setCurrentUser(localStorage.getItem("user")));  //28-3-25
console.log(currentUser);

  const fetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/petrolstation/getpetroldata`
      );
      if (response.data && response.data.users && response.data.users.length > 0) {
        
        const FetchData = response.data.users[0];
        setPetrolData(FetchData);
      }
      
      // setCurretStation(currentUser.StationName === petrolData.StationName)
      console.log(petrolData);
      
    } catch (error) {
      console.error("PetrolStationData fetching Error:", error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
console.log(currentUser.StationName);
console.log(petrolData.StationName);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log(petrolData.StationName);
  console.log(currentUser.StationName);
  
  try {
    setLoading(true);
    if (currentUser.StationName === petrolData.StationName) {
      console.log("Station names match. Update allowed.");
      
      const StationID = currentUser.StationName; // Assuming you have the ID of the petrol station
      // Pass formData to the API endpoint for updating
      const response = await axios.put(`http://localhost:5000/api/petrolstation/updatepetroldata/${StationID}`,
        formData
      );
      console.log(response.data.message || "Update successful");
      setFormData(response.data);
      toast.success('Updated Sucessfully')
    } else {
      const response = await axios.post(`http://localhost:5000/api/petrolstation/registerdata`,
        formData
      );
      console.log(response.data.message || "Registration successfully"); 
      toast.success('Registration Successfully')    
    }
    setLoading(false);
  } catch (error) {
    console.error("Error in registration/update:", error.message);
    toast.error('Error in registration/update')
  }
  
  console.log(formData.StationName);
}

  return (
    <div>
      <TopBar />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
      </div>

      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 justify-center">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* This month revenue */}
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              TOTAL REVENUE
            </h5>
            <div className="flex flex-row justify-between">
              <div>10.10</div>
              <div>RS.100</div>
            </div>
            <div className="flex flex-row justify-between">
              <span>Liters</span>
              <span>Amount</span>
            </div>
          </Card>

          {/* This week revenue */}
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              THIS MONTH REVENUE
            </h5>
            <div className="flex flex-row justify-between">
              <div>10.10</div>
              <div>RS.100</div>
            </div>
            <div className="flex flex-row justify-between">
              <span>Liters</span>
              <span>Amount</span>
            </div>
          </Card>

          {/* Today revenue */}
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              TODAY REVENUE
            </h5>
            <div className="flex flex-row justify-between">
              <div>10.10</div>
              <div>RS.100</div>
            </div>
            <div className="flex flex-row justify-between">
              <span>Liters</span>
              <span>Amount</span>
            </div>
          </Card>
        </div>
      </div>
      
       {/* Station Details Update */}
      <Card className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Station Details Update Filled <span className='text-sm text-lime-200 p-1 bg-red-600 rounded-2xl animate-ping'>Its Only PetrolStation Owner</span></h2>
        <Form className="space-y-6" onSubmit={handleSubmit}>
          <div>
          <Label htmlFor="text">Station Name</Label> 
          <TextInput type="text" name="StationName" value={formData.StationName} disabled onChange={handleChange}/>
          </div>

          <div>
          <Label htmlFor="text">PetrolPrice</Label>
          <TextInput type="number" name="PetrolPrice" value={formData.PetrolPrice} onChange={handleChange} required/>
          </div>

          <div>
          <Label htmlFor="text">DiselPrice</Label>
          <TextInput type="number" name="DiselPrice" value={formData.DiselPrice} onChange={handleChange} required/>
          </div>
           
          <Button type='submit' gradientDuoTone="purpleToPink" outline pill>
            Submit
          </Button>
        </Form>
      </Card>
        <CarouselOne />
      <Footer />
    </div>
  );
}

export default PetrolStationDashboard;