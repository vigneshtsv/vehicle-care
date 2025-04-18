import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Label, Textarea, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { LogInIcon } from 'lucide-react';
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
    sessionStorage.setItem('authToken',token)
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
      return setErrorMessage("Passwords do not match");
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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md customersingupbg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Customer Registration
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid">
        <div className='flex flex-col md:flex-row gap-4'>
            <div>
              <Label htmlFor="FirstName" className="block mb-1">First Name</Label>
              <TextInput
                type="text"
                id="FirstName"
                name="FirstName"
                className="rounded"
                value={formData.FirstName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="LastName" className="block mb-1">Last Name</Label>
              <TextInput
                type="text"
                id="LastName"
                name="LastName"
                className="rounded"
                value={formData.LastName}
                onChange={handleInputChange}
                required
              />
            </div>
        </div>
        </div>

        <div className="mb-2">
          <Label htmlFor="Email">Email *</Label>
          <TextInput
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-2">
          <Label htmlFor="PhoneNumber">Phone Number *</Label>
          <TextInput
            type="tel"
            id="PhoneNumber"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-2">
            <Label htmlFor="Password">Password *</Label>
            <TextInput
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="ConfirmPassword">Confirm Password *</Label>
            <TextInput
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <Label htmlFor="Address">Enter Your Address</Label>
          <Textarea
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
            rows="3"
          ></Textarea>
        </div>

        {/* File upload fields */}
        <h3 className="text-xl flex bg-green-400 justify-center font-semibold mt-6 mb-4">Upload Documents</h3>

        <div className="mb-4">
          <Label htmlFor="AadharCard">Aadhar Card *</Label>
          <TextInput
            type="file"
            id="AadharCard"
            name="AadharCard"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="ProfilePicture">ProfilePicture *</Label>
          <TextInput
            type="file"
            id="ProfilePicture"
            name="ProfilePicture"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Checkbox id="accept" defaultChecked required/>
          <Label htmlFor="accept" className="flex">
            I agree with the&nbsp;
            <a href="/termsconditions" className="text-cyan-600 hover:underline dark:text-cyan-500">
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
      <div>
       {/* Buttons */}
       <div className="flex justify-between m-5">
        <Button onClick={backPage} outline gradientDuoTone="purpleToBlue">
          <IoMdArrowBack className="m-1" />
          Back
        </Button>
        <Button onClick={loginPage} outline gradientDuoTone="purpleToBlue">
          Login <IoMdArrowForward className="m-1" />
        </Button>
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
  );
};

export default CustomerSignup;