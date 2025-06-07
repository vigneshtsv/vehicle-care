import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCurrentUser, signInFailure,signInStart,signInSuccess } from '../Redux/Slice/authSlice';
import { Button } from 'flowbite-react';
import axios from 'axios';


const LoginForm = () => {
  const [formData, setFormData] = useState({Email: '',Password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,error:errorMessage } = useSelector((state) => state.user);
  const {currentUser} = useSelector((state) => state.user);
  
  
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    if (!formData.Email || !formData.Password) {
     return toast.error("Please fill out all fields.");
   }

         try {
           dispatch(signInStart());
           const API_URL = import.meta.env.BE_API_URL || 'https://vehicle-care-api.onrender.com';
           const response = await axios.post(`${API_URL}/api/auth/loginuser`,{
            Email: formData.Email,
            Password: formData.Password
          });  
           const data = response.data
           
            // console.log(data.token);
            // console.log(data.user.Role);
            // console.log(data.user.Id);
            
           if(data.success === true)
           {
             dispatch(signInSuccess(data.message));
             toast.success(data.message)

             localStorage.setItem('token',data.token)
             localStorage.setItem('Role',data.user.Role)
             localStorage.setItem('Id',data.user.Id)
             
             localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in session storage
             
             
             dispatch(setCurrentUser(data.user))
             
             //!Navigte based on Role
                 if(data.user.Role==='Admin'){
                   navigate('/admindashboardpage')
                 }else if(data.user.Role === 'Customer'){
                   navigate('/customerdashboard')
                 }else if(data.user.Role === 'DeliveryBoy'){
                   navigate('/deliveryboydashboard')
                 }else if(data.user.Role === 'PetrolStation'){
                   navigate('/petrolstationdashboard') 
                 }else{
                   navigate('/servicemandashboard')
                 }
                 
                 
           }else{
             const errorData = await response.message
             toast.error(errorData.message || 'An error occurred during login.');
             dispatch(signInFailure(errorData.message));
           }
 
         } catch (error) {
          console.log(error);
           toast.error(error.response?.data?.message || 'Error accurred during login.');
           dispatch(signInFailure(error.message));
         }    
 };

  return (
    <div className="min-h-screen flex flex-col justify-center loginbg">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="bg-transparent rounded-lg shadow-lg p-8 border-2 border-yellow-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-lime-400">Welcome back</h1>
            <p className="text-lime-600 mt-2">Please sign in to your account</p>
            <p className="text-lime-600 mt-2 text-xl">** This is Demo Project **</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-lime-600 mb-2">
                Email Address
              </label>
              <input
                id="Email"
                name="email"
                type="Email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-2 text-white border border-lime-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-800 placeholder:text-lime-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="Password" className="block text-sm font-medium text-lime-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="Password"
                  name="Password"
                  type={showPassword ? "text" : "Password"}
                  required
                  value={formData.Password}
                  onChange={handleChange}
                  className="text-white w-full bg-transparent px-4 py-2 border border-lime-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-800 placeholder:text-lime-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lime-500"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-lime-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-lime-500">
                  Remember me
                </label>
              </div>
              <div>
                <a href="/forgotpassword" className="text-sm font-medium text-lime-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              outline gradientDuoTone="greenToBlue"
              className='w-full'
            >
              LOGIN
            </Button>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-lime-600">Don't have an account? </span>
              <a href="/signupnavigate" className="font-medium text-lime-600 hover:text-green-700">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;