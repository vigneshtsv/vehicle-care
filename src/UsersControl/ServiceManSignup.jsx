import { useState } from 'react'
import { Checkbox,Label, Spinner, Alert } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

function ServiceManSignup() {
  const [formData, setFormData] = useState({
    FirstName:'',
    LastName:'',
    PhoneNumber:"",
    Email:"",
    Password:"",
    ConfirmPassword:"",
    Address:"",
    Role:'ServiceMan',
  });

  const [files,setFiles] = useState({
    AadharCard: null,
    ProfilePicture: null,
    MechanicCertificate: null,
  })

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value.trim()}));
  }
  
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
  };

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

    if(!files.MechanicCertificate) {
      setErrorMessage('MechanicCertificate is required');
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
        toast.success('ServiceMan Registration Successfully')
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      toast.error('ServiceMan Registration failed. please try again.')
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
      Role: 'ServiceMan',
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
      <div className='max-w-md mx-auto mt-8 p-6 bg-transparent rounded-xl shadow-2xl border border-spacing-5 border-lime-500'>
        <h1 className='text-2xl font-bold mb-6 text-lime-300 text-center'>
          ServiceMan Signup
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='grid'>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                id="FirstName"
                className="flex bg-transparent border border-lime-300 px-1 text-white placeholder-gray-100 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                id="LastName"
                className=" flex bg-transparent border border-lime-300 px-1 text-white placeholder-gray-100 rounded"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='mb-2 my-3'>
            <input
              type="email"
              placeholder="vignesh@gmail.com"
              id="Email"
              className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-2 my-3'>
            <input
              type="number"
              placeholder="7373892019"
              id="PhoneNumber"
              className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
          </div>


          <div className="flex flex-col md:flex-row my-3 gap-4">
            <div className='mb-2'>
            <input
              type="password"
              placeholder="Create New Password"
              id="Password"
              className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
            </div>
            <div className='mb-2'>
            <input
              type="password"
              placeholder="Confirm Your Password"
              id="ConfirmPassword"
              className="w-full flex bg-transparent border border-lime-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
            </div>
          </div>

          <div>
            <textarea
              type="textarea"
              placeholder="Enter Your Address"
              id="Address"
              className="w-full flex bg-transparent  text-white border-lime-300 placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
          </div>
           
           {/* File Upload fields */}

          <h3 className='text-xl flex text-yellow-200 justify-center font-semibold mt-2 mb-2'>
             Upload Documents
          </h3>

          <div className='border border-red-700 p-2 m-2 shadow-2xl rounded'>
            <div className="mb-4">
              <label htmlFor="AadharCard" className='text-lime-300'>AadharCard</label>
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
              <label htmlFor="MechanicCertificate" className='text-lime-300'>MechanicCertificate</label>
              <input
                type="file"
                id="MechanicCertificate"
                name="MechanicCertificate"
                className="w-full flex bg-transparent border border-lime-300 text-white rounded"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ProfilePicture" className='text-lime-300'>ProfilePicture</label>
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
            <Checkbox id="accept" defaultChecked required />
            <Label htmlFor="accept" className="flex">
              I agree with the&nbsp;
              <a
                href="/termsconditions"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </a>
            </Label>
          </div>
        
          <button
            type="submit"
            className="w-full bg-transparent text-white font-bold py-2 px-4 rounded hover:bg-purple-700 border border-lime-300 hover:border-transparent focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  color="purple"
                  aria-label="Purple spinner example"
                  size="sm"
                />
                <span className="pl-3">Loading....</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="flex gap-2 text-sm mt-6">
          <span>Already Have An Account?</span>
          <Link to="/" className="text-blue-600">
            Sign in
          </Link>
        </div>
     
         {/* Buttons */}
         <div className="flex justify-between m-4 space-x-4">
               <button onClick={backPage} className='flex items-center text-white hover:text-red-400 rounded-lg p-2'>
                   <IoMdArrowBack className="m-2" />
                   Back
               </button>
               <button onClick={loginPage} className='flex items-center text-white hover:text-red-400 rounded-lg p-2'>
                   Login <IoMdArrowForward className="mr-2" />
               </button>
         </div>

        {errorMessage && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium me-2">OOPS!</span> &nbsp; {errorMessage}
          </Alert>
        )}
        </div>
  </div>
  
}

export default ServiceManSignup;