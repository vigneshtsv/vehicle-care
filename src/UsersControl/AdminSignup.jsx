import { useState } from 'react'
import { Checkbox, Alert } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

function AdminSignup() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Address: "",
    EmployeeId: "",
    Role: 'Customer',
  });

  const [files, setFiles] = useState({
    ProfilePicture: null,
    AadharCard: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    const file = fileList[0];
    
    if (file) {
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
    }
  };

  const saveToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMsg('');
    setLoading(true);

    // Validation
    if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
      setErrorMessage("Please fill out all required fields");
      setLoading(false);
      return;
    }

    if (formData.Password !== formData.ConfirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.EmployeeId) {
      setErrorMessage('Employee ID is required');
      setLoading(false);
      return;
    }

    if (!files.ProfilePicture) {
      setErrorMessage('Profile Picture is required');
      setLoading(false);
      return;
    }

    if (!files.AadharCard) {
      setErrorMessage('AadharCard Document is required');
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

      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          submitData.append(key, file);
        }
      });

      const response = await axios.post('https://vehicle-care-api.onrender.com/api/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);

      if (response.data.token) {
        saveToken(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setSuccessMsg('Admin Registration Successful');
        resetForm();
        toast.success('Admin Registration Successful');
        setTimeout(() => navigate('/adminsignupapproval'), 1000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed';
      setErrorMessage(errorMsg);
      toast.error('Admin Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCondition = () => {
    navigate('/termsconditions');
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
      EmployeeId: '',
      Role: 'Admin',
    });

    setFiles({
      ProfilePicture: null,
      AadharCard: null,
    });

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.value = '';
    });
  };

  const backPage = () => {
    navigate(-1);
  };

  const loginPage = () => {
    navigate('/');
  };

  return (
    <div className="signupbg p-10">
      <div className="bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 max-w-md mx-auto mt-8 p-6 rounded-lg shadow-2xl border border-spacing-5 border-blue-500">
        <h1 className="text-2xl font-bold mb-6 text-blue-300 text-center">
          Admin Signup
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Name Fields */}
          <div className="grid">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName}
                  className="flex bg-transparent border border-blue-300 px-1 text-white placeholder-gray-100 rounded"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  className="flex bg-transparent border border-blue-300 px-1 text-white placeholder-gray-100 rounded"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-2">
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              placeholder="Enter Your Email"
              className="w-full flex bg-transparent border border-blue-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-2">
            <input
              type="number"
              id="PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              placeholder="Enter Your Phone Number"
              className="w-full flex bg-transparent border border-blue-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Employee ID */}
          <div className="mb-2">
            <input
              type="text"
              id="EmployeeId"
              name="EmployeeId"
              value={formData.EmployeeId}
              placeholder="Enter Employee ID"
              className="w-full flex bg-transparent border border-blue-300 text-white placeholder-gray-100 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Fields */}
          <div className="flex flex-col md:flex-row my-3 gap-4">
            <div className="mb-2">
              <input
                type="password"
                id="Password"
                name="Password"
                value={formData.Password}
                placeholder="Create New Password"
                className="w-full flex bg-transparent border border-blue-300 text-white placeholder-gray-100 rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                placeholder="Confirm New Password"
                className="w-full flex bg-transparent border border-blue-300 text-white placeholder-gray-100 rounded"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-2">
            <textarea
              id="Address"
              name="Address"
              // value={formData.Address}
              placeholder="Enter Your Address"
              className="w-full flex bg-transparent text-white border-blue-300 placeholder-gray-100 rounded"
              onChange={handleChange}
              rows="3"
            />
          </div>

          {/* Document Upload Section */}
          <h3 className="text-xl text-yellow-200 flex justify-center mt-6 mb-4">
            Upload Documents
          </h3>

          <div className="border-4 border-blue-700 border-solid p-6 m-4 shadow-2xl rounded">
            <div className="mb-4">
              <label htmlFor="ProfilePicture" className="text-blue-300">
                Upload Your Profile Picture
              </label>
              <input
                type="file"
                id="ProfilePicture"
                name="ProfilePicture"
                className="w-full flex bg-transparent border border-blue-300 text-white rounded"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor=" AadharCard" className="text-blue-300">
                Upload AadharCard
              </label>
              <input
                type="file"
                id="AadharCard"
                name="AadharCard"
                className="w-full flex bg-transparent border border-blue-300 text-white rounded"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked required />
            <label htmlFor="accept" className="flex text-white">
              I agree with the&nbsp;
              <button
                type="button"
                onClick={handleCondition}
                className="text-blue-300 hover:underline hover:text-blue-500 bg-transparent border-none cursor-pointer p-0 font-inherit"
              >
                terms and conditions
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="border border-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-2xl w-full mt-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Admin"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="flex gap-2 text-sm mt-6 text-blue-300">
          <span>Already Have An Account?</span>
          <Link
            to="/"
            className="text-green-300 hover:text-red-300 hover:underline"
          >
            Login
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between m-4 space-x-4">
          <button
            onClick={backPage}
            className="flex items-center text-white hover:text-red-400 rounded-lg p-2"
          >
            <IoMdArrowBack className="m-2" />
            Back
          </button>
          <button
            onClick={loginPage}
            className="flex items-center text-white hover:text-red-400 rounded-lg p-2"
          >
            Login
            <IoMdArrowForward className="m-1" />
          </button>
        </div>

        {/* Alert Messages */}
        {errorMessage && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium me-2">OOPS!</span> &nbsp;{" "}
            {errorMessage}
          </Alert>
        )}
        {successMsg && (
          <Alert color="success" icon={HiInformationCircle}>
            <span className="font-medium me-2">Success</span> &nbsp;{" "}
            {successMsg}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default AdminSignup;