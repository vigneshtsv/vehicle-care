import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Label, Textarea, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { toast } from 'react-toastify';



const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Address: '',
    Role: 'Customer'
  });

  const [files, setFiles] = useState({
    ProfilePicture: null,
    AadharCard: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Handle text input changes
  const handleInputChange = (e) => {
    const {id,value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  // Handle file input changes
  const handleFileChange = async (e) => {
    const { name, files: fileList } = e.target;
      setFiles({
        ...files,
        [name]: fileList[0]
      });
    }
  const saveToken =(token) => {
    localStorage.setItem('authToken',token)
  }
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
      return setErrorMsg('Please fill out all fields');
    }
    if (formData.Password !== formData.ConfirmPassword) {
      return setErrorMsg("Passwords do not match");
    }

    // Check required documents
    if(!files.AadharCard) {
      setErrorMsg('Aadhar Card is required');
      setLoading(false);
      return;
    }

    if(!files.ProfilePicture) {
      setErrorMsg('ProfilePicture is required');
      setLoading(false);
      return;
    }

    try {
      // Create form data for sending files
      const submitData = new FormData();
      
      // Add text fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      // Add file fields
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          submitData.append(key, file);
        }
      });

      // Send the request
      const response = await axios.post('http://localhost:5000/api/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setFormData(response.data.user)
      // Optionally reset form
      console.log(response.data.token);
      console.log(formData);
      
      if(response.data.token) {
        saveToken(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer${response.data.token}`;
        setSuccessMsg('Registration Successfully');
        resetForm();
        toast.success('Customer Registration Successfully')
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      StationName: '',
      Role: 'Customer',
      ProfilePicture:'',
      AadharCard:''
    });

    setFiles({
      ProfilePicture: null,
      AadharCard: null,
    })
  }
  const backPage = () => {
    navigate(-1);
  }

  const loginPage = () => {
    navigate('/');
  }

  return <div className='signupbg p-10'>
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-2xl border border-spacing-5 border-lime-500">
      <h2 className="text-2xl font-bold mb-6 text-lime-300  text-center">
        Customer Registration
      </h2>

      <form className='space-y-4' onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid">
        <div className='flex flex-col md:flex-row my-3 gap-4'>
            <div>
              {/* <label htmlFor="FirstName" className="block text-lime-300 mb-1">First Name</label> */}
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                placeholder='FirstName'
                className="flex bg-transparent border border-lime-300 px-1 text-white placeholder-gray-100 rounded"
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              {/* <label htmlFor="LastName" className="block text-lime-300 mb-1">Last Name</label> */}
              <input
                type="text"
                id="LastName"
                name="LastName"
                placeholder='LastName'
                className=" flex bg-transparent border border-lime-300 px-1 text-white placeholder-gray-100 rounded"
                onChange={handleInputChange}
                required
              />
            </div>
        </div>
        </div>

        <div className="mb-2 my-3">
          {/* <label htmlFor="Email" className='text-lime-300'>Enter Your Email</label> */}
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder='Enter Your Email'
            className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-2 my-3">
          {/* <label htmlFor="PhoneNumber" className='text-lime-300 '>Phone Number</label> */}
          <input
            type="tel"
            id="PhoneNumber"
            name="PhoneNumber"
            placeholder='Enter Your Phone Number'
            className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row my-3 gap-4">
          <div className="mb-2">
            {/* <label htmlFor="Password" className='text-lime-300 '>Password</label> */}
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder='Enter Your Password'
              className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            {/* <label htmlFor="ConfirmPassword" className='text-lime-300 '>Confirm Password</label> */}
            <input
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder='Confirm Your Password'
              className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-2 my-3">
          {/* <label htmlFor="Address" className='text-lime-300 '>Enter Your Address</label> */}
          <textarea
            id="Address"
            name="Address"
            placeholder='Enter Your Address'
            className="w-full flex bg-transparent  text-white border-lime-300 placeholder-gray-100 rounded"
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        {/* File upload fields */}
        <h3 className="text-xl text-yellow-200 flex justify-center font-semibold mt-6 mb-4">Upload Documents</h3>

        <div className='border border-red-700 p-2 m-4 shadow-2xl rounded'>
        <div className="mb-4">
          <label htmlFor="AadharCard" className='text-lime-300'>Upload Your AadharCard</label>
          <input
            type="file"
            id="AadharCard"
            name="AadharCard"
            className="w-full flex bg-transparent border border-lime-300 text-white rounded"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ProfilePicture" className='text-lime-300'>Upload Your ProfilePicture</label>
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
          <Label htmlFor="accept" className="flex text-lime-300">
            I agree with the&nbsp;
            <a href="/termsconditions" className="text-blue-300 hover:underline hover:text-blue-500">
              terms and conditions
            </a>
          </Label>
        </div>
         
        <div>
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            disabled={loading}
            className='w-full mt-4'
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
      <div className='flex gap-2 text-sm mt-6 text-lime-300'>
          <span>Already Have An Account?</span>
          <Link to='/' className='text-green-300 hover:text-red-300'>Login</Link>
      </div>

      <div>
       {/* Buttons */}
       <div className="flex justify-between m-5">
        <button onClick={backPage} className='flex items-center text-white hover:text-red-400'>
          <IoMdArrowBack className="m-1" />
          Back
        </button>
        <button onClick={loginPage} className='flex items-center text-white hover:text-red-400'>
          Login
          <IoMdArrowForward className="m-1" /> 
        </button>
      </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMsg}
          </div>
        )}
      </div>
    </div>
  </div>
};

export default CustomerSignup;