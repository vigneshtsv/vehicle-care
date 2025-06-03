import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle, HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "./useLogout.jsx";
import { signOutSuccess } from "../../Redux/Slice/authSlice.jsx";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";


const DashboardProfile = () => {
  const dispatch = useDispatch();
  let logout = useLogout();
  const {currentUser} = useSelector((state) => state.user); 
  const [formData, setFormData] = useState({
    FirstName: currentUser?.FirstName || "",
    Email: currentUser?.Email || "",
    Password: "",
    ProfilePicture: currentUser?.ProfilePicture || "",
  });

  const [imageBase64, setImageBase64] = useState(currentUser?.ProfilePicture || "");
  const [uploadProgress, setUploadProgress]= useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const [error,setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const filePickerRef = useRef(); 

  const convertTobase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    // if(file.size > 2 * 1024 * 1024) {
    //   setUploadError("File size must be less than 2MB");
    //   return;
    // }

    setIsUploading(true);
    setUploadError(null);
    try {
      const base64 = await convertTobase64(file);

      setFormData({ ...formData, ProfilePicture: base64 });

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if(progress >= 100) {
          clearInterval(interval);
          setImageBase64(base64);
          setIsUploading(false);
        }
      },100);
    } catch (error) {
      setUploadError('Failed to convert image to base64');
      setIsUploading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUpdateSuccess(false);

    try {
      
      const userData = {
        FirstName: formData.FirstName,
        Email: formData.Email,
        ProfilePicture:formData.ProfilePicture
      }

      if (formData.Password.trim() !== "") {
        userData.Password = formData.Password;
      }
      const token = localStorage.getItem('token');
      if(!token) {
        throw new Error('Authentication token not found');
      }

      const endpoint =`http://localhost:5000/api/updateprofile/${currentUser?.Id}`;
      
      const response = await fetch(endpoint, {
        method:'PUT',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to save user');
      }

      const updateUser = await response.json();
      console.log('profile updated',updateUser);
      
      if(updateUser && updateUser.user) {
        setImageBase64(updateUser.user.ProfilePicture || '');
      }
      setUpdateSuccess(true);

    } catch (err) {
      setError(`Failed to update user`);
    } finally {
      setIsUploading(false);
    }
  }
  
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) {
        throw new Error('Authentication token not found');
      }
      
      const endpoint = `http://localhost:5000/api/admin/deleteuser/${currentUser?.Id}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete account');
      }
      logout();
      dispatch(signOutSuccess());
    } catch (error) {
      setError(error.message || 'Failed to delete account');
      setIsDeleteModalOpen(false);
    }
  }

  const handleLogout = () => {
    logout();
    dispatch(signOutSuccess());
  }

  return (
    <div className="dashboardprofilebg p-5 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-4 w-full bg-white shadow-lg rounded-lg">
      <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
      
      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mb-4">
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}
      
      {updateSuccess && (
        <Alert color="success" icon={HiInformationCircle} className="mb-4">
          <span className="font-medium">Success!</span> Profile updated successfully
        </Alert>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        
        {/* Profile Picture */}
        <div
          className="relative w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current?.click()}
        >
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
              <div className="w-full h-full relative">
                {/* Custom circular progress indicator */}
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-300"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-blue-600"
                    strokeWidth="4"
                    strokeDasharray={283}
                    strokeDashoffset={283 - (283 * uploadProgress) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <img
            src={imageBase64 || "https://via.placeholder.com/150"}
            alt="Profile"
            className={`rounded-full w-full h-full object-cover border-4 border-pink-400 ${
              isUploading ? "opacity-50" : ""
            }`}
          />
        </div>
        
        {/* Error Alert for Image */}
        {uploadError && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center" role="alert">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">Oops!</span> {uploadError}
          </div>
        )}
        
        {/* Form Inputs */}
        <div className="relative">
          <input
            id="FirstName"
            type="text"
            value={formData.FirstName}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1">First Name</label>
        </div>
        
        <div className="relative">
          <input
            id="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1">Email</label>
        </div>
        
        <div className="relative">
          <input
            id="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Enter Your New Password"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1">Password</label>
        </div>
        
        {/* Update Button */}
        <Button
          type="submit"
          color="purple" outline
        >
          Click To Update
        </Button>
      </form>
      
      {/* Account Actions */}
      <div className="flex justify-between mt-5">
        <Button
          onClick={() => window.history.back()}
          
        >
          <ArrowLeft />Back
        </Button>

        <Button
          onClick={handleLogout}
        >
          Click to Logout
        </Button>
      </div>
      
      {/* back buttons */}
        <div>
        <Button
          color="purple" outline
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full my-5"
        >
          Click to Delete Account
        </Button>
        </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4 text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-900">Confirm to delete</h3>
              <p className="mt-2 text-gray-500">Are you sure you want to delete your account?</p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleDeleteAccount}
              >
                Yes, I'm sure
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DashboardProfile;