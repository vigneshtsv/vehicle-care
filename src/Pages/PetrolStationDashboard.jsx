import  { useEffect, useState } from 'react'
import TopBar from '../Components/UserComponents/TopBar'
import Footer from '../Components/UserComponents/Footer'
import { Button, Card, Label } from "flowbite-react";
import { CarouselOne } from '../Components/Layout/CarouselOne';
import { TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminTopBarPage from '../Components/adminCompponents/AdminTopBarPage';
import { CarouselSecond } from '../Components/Layout/CarouselSecond';


function PetrolStationDashboard() {
  const { currentUser } = useSelector((state)=>state.user)
  const [petrolData, setPetrolData] = useState([]);
  const [formData, setFormData] = useState({
    StationName : `${currentUser?.StationName}`,
    Distance : '2.5',   
    PetrolPrice : '',
    DiselPrice : '',
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
 console.log(currentUser);

  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://vehicle-care-api.onrender.com/api/petrolstation/getpetroldata');
      const fetchData = response.data.data;
      const updateData = fetchData.map(petrol => ({...petrol, PetrolPrice: petrol.PetrolPrice, DiselPrice: petrol.DiselPrice}));
      setPetrolData(updateData);
      setLoading(false);
      // console.log(updateData);
    } catch (err) {
      console.error("Error fetching petrol station data:", err.message);
      setLoading(false);
      toast.error('Failed to fetch petrol station data')
    }
  }

  useEffect(() => {
    fetch();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// console.log(petrolData);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const matchData = petrolData.find(station => station.StationName === currentUser.StationName);
    if (matchData) {
      // console.log(petrolData);
      
      const StationID = currentUser.StationName; // Assuming you have the ID of the petrol station
      // Pass formData to the API endpoint for updating
      const response = await axios.put(`https://vehicle-care-api.onrender.com/api/petrolstation/updatepetroldata/${StationID}`,
      formData
      );
      console.log(response.data.message || "Update successful");
      setFormData(response.data);
      toast.success(`${currentUser.StationName} Your Data Price Updated`)
    } else {
      const response = await axios.post(`https://vehicle-care-api.onrender.com/api/petrolstation/registerdata`,
        formData
      );
      console.log(response.data.message || "Registration successfully"); 
      toast.success(`Welcom Mr.${currentUser.StationName} Your Data Price Registered`)    
    }
    setLoading(false);
  } catch (error) {
    console.error("Error in registration/update:", error.message);
    toast.error('Error in registration/update')
  }
  
  // console.log(formData.StationName);
}

  return (
    <div className='petrolstationbg w-full'>
      {currentUser.Role === 'PetrolStation'? <TopBar /> : <AdminTopBarPage />}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <CarouselOne />
      </div>

      <div className="p-6">
        <h2 className="text-4xl font-bold bg-slate-400 text-gray-800 rounded-full m-6 m p-2 flex justify-center">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* This month revenue */}
          <Card href="#" className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden border-2 border-gray-200">
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
          <Card href="#" className="max-w-sm bg-amber-300 shadow-md rounded-lg overflow-hidden border-2 border-gray-200">
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
          <Card href="#" className="max-w-sm bg-amber-300 shadow-md rounded-lg overflow-hidden border-2 border-gray-200">
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
      <Card className="max-w-6xl mx-auto m-5 p-5 bg-transparent backdrop-blur-3xl shadow-md rounded-lg overflow-hidden border-2 border-gray-200">
        <h2 className="lg:text-2xl bg-stone-500 font-bold m-4 p-3 text-white flex justify-center sm:text-xl rounded-full">Station Details Update Filled</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className='flex flex-col'>
          <Label htmlFor="text" className='text-xl text-white'>Station Name</Label> 
          <TextInput type="text" name="StationName" className='text-white ' value={formData.StationName} disabled onChange={handleChange}/>
          </div>

          <div className='flex flex-col'>
          <Label htmlFor="text" className='text-xl text-white'>PetrolPrice</Label>
          <TextInput type="number" name="PetrolPrice" value={formData.PetrolPrice} onChange={handleChange} required/>
          </div>  

          <div className='flex flex-col'>
          <Label htmlFor="text" className='text-xl text-white'>DiselPrice</Label>
          <TextInput type="number" name="DiselPrice" value={formData.DiselPrice} onChange={handleChange} required/>
          </div>
           
          <Button type='submit' gradientDuoTone="purpleToPink" outline pill>
            Submit
          </Button>
        </form>
      </Card>
        <CarouselSecond />
      <Footer />
    </div>
  );
}

export default PetrolStationDashboard;