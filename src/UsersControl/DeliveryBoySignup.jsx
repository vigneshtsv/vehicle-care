import { useState } from 'react'
import { Checkbox, Alert } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';


function DeliveryBoySignup() {
  const [formData, setFormData] = useState({
    FirstName:"",
    LastName:"",
    PhoneNumber:"",
    Email:"",
    Password:"",
    ConfirmPassword:"",
    Address:"",
    Role:'DeliveryBoy',
  });

  const [files,setFiles] = useState({
    AadharCard: null,
    ProfilePicture: null,
    DrivingLicence: null,
  })
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value.trim()}));
  };

  const handleFileChange = (e) => {
    const { name,files: fileList } = e.target;
    // setFiles({
    //   ...files,
    //   [name]: fileList[0]
    // });
    const file = fileList[0];
    if(file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size exceeds 5MB limit');
        return;
    }

      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
        return;
      }

    setFiles(prev => ({
      ...prev,
      [name]: file
    }));

    setErrorMessage('');
  };
}

  const saveToken = (token) => {
    localStorage.setItem('authToken',token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')
    setSuccessMsg('');
    setLoading(true);

    if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
      return setErrorMessage("Please fill out all fields");
    }

    if(formData.Password !== formData.ConfirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
 
    if(!files.AadharCard) {
      setErrorMessage('AadharCard is required');
      setLoading(false);
      return;
    }

    if(!files.ProfilePicture) {
      setErrorMessage('ProfilePicture is required');
      setLoading(false);
      return;
    }

    if(!files.DrivingLicence) {
      setErrorMessage('DrivingLicence is required');
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          submitData.append(key, value.trim());
        } else {
          submitData.append(key, value);
        }
      });

      Object.entries(files).forEach(([Key,file]) => {
        if (file) {
          submitData.append(Key,file);
        }
      });

      const response = await axios.post('https://vehicle-care-api.onrender.com/api/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log(response);
      
      setFormData(response.data.user)
      if(response.data.token) {
        saveToken(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setSuccessMsg('Registration Successful');
        resetForm();
        toast.success('DeliveryBoy Registration Successfully')
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      toast.error('DeliveryBoy Registration failed. please try again.')
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFormData({
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      Role: 'DeliveryBoy',
    });

    setFiles({
      ProfilePicture: null,
      AadharCard: null,
      DrivingLicence: null,
    });
   
    const fileInputs = document.querySelectorAll('input[type="file"]');
       fileInputs.forEach(input => {
       input.value = '';
     });

  };

  const backPage = () => {
    navigate(-1);
  }

  const loginPage = () => {
    navigate('/');
  }

  return <div className='signupbg p-10'>
    
    <div className='max-w-md mx-auto mt-8 p-6 rounded-lg shadow-2xl border border-spacing-5 border-lime-500'>
      <h1 className='text-2xl font-bold mb-6 text-lime-300 text-center'>
        DeliveryBoy Signup
      </h1>

    <form className='space-y-4' onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className='grid'>
         <div className='flex flex-col md:flex-row gap-4'>
            <div>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                className="flex bg-transparent border border-lime-300 px-1 text-white placeholder-gray-100 rounded"
                placeholder='FirstName'
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
            <input
                type="text"
                id="LastName"
                name="LastName"
                className=" flex bg-transparent border border-lime-300 px-1 text-white placeholder-gray-100 rounded"
                placeholder='LastName'
                value={formData.LastName}
                onChange={handleChange}
                required
              />
            </div>
         </div>
      </div>
     
      <div className='mb-2'>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder='Enter Your Email'
            className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
            value={formData.Email}
            onChange={handleChange}
            required
          />
      </div>

      <div className="mb-2">
        <input
          type="number"
          id="PhoneNumber"
          name="PhoneNumber"
          placeholder='Enter Your Phone Number'
          className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
          onChange={handleChange}
          required
        />
      </div>      

      <div className="flex flex-col md:flex-row my-3 gap-4">
        <div className="mb-2">
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder='Create New Password'
            className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            placeholder='Confirm New Password'
            className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-2">
        <textarea
          id="Address"
          name="Address"
          placeholder='Enter Your Address'
          className="w-full flex bg-transparent  text-white border-lime-300 placeholder-gray-100 rounded"
          onChange={handleChange}
          rows="3"
        />
      </div>
      <h3 className='text-xl text-yellow-200 flex justify-center mt-6 mb-4'>
        Upload Documents
      </h3>

      <div className='border-4 border-red-700 border-solid p-6 m-4 shadow-2xl rounded'>
      <div className='mb-4'>
        <label htmlFor='AadharCard' className='text-lime-300'>Upload Your Aadhar Card</label>
        <input
          type="file"
          id="AadharCard"
          name="AadharCard"
          className="w-full flex bg-transparent border border-lime-300 text-white rounded"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='DrivingLicence' className='text-lime-300'>Upload Your DrivingLicence</label>
        <input
          type="file"
          id="DrivingLicence"
          name="DrivingLicence"
          className="w-full flex bg-transparent border border-lime-300 text-white rounded"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='ProfilePicture' className='text-lime-300'>Upload Your ProfilePicture</label>
        <input
          type="file"
          id="ProfilePicture"
          name="ProfilePicture"
          className="w-full flex bg-transparent border border-lime-300 text-white rounded"
          onChange={handleFileChange}
          required
        />
      </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="accept" defaultChecked required/>
        <label htmlFor="accept" className="flex text-lime-200">
          I agree with the&nbsp;
          <a href="/termsconditions" className="text-blue-300 hover:underline hover:text-blue-500">
            terms and conditions
          </a>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="border border-green-200 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-2xl w-full mt-4"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
    <div className='flex gap-2 text-sm mt-6 text-lime-300'>
        <span>Already Have An Account?</span>
        <Link to='/' className='text-green-300 hover:text-red-300 hover:underline'>Login</Link>
    </div>

    {/* Buttons */}
    <div className="flex justify-between m-4 space-x-4">
          <button onClick={backPage} className='flex items-center text-white hover:text-red-400 rounded-lg p-2'>
              <IoMdArrowBack className="m-2" />
              Back
          </button>
          <button onClick={loginPage}  className='flex items-center text-white hover:text-red-400 rounded-lg p-2'>
              Login
              <IoMdArrowForward className="m-1" /> 
          </button>
    </div>

      {errorMessage && (
        <Alert color='failure' icon={HiInformationCircle}>
          <span className='font-medium me-2'>OOPS!</span> &nbsp; {errorMessage}
        </Alert>
      )}
      {successMsg && (
        <Alert color='success' icon={HiInformationCircle}>
          <span className='font-medium me-2'>Success</span> &nbsp; {successMsg}
        </Alert> 
      )}
  </div>
  </div>
  
}

export default DeliveryBoySignup;