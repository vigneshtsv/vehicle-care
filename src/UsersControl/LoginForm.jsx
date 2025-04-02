// import React, { useState } from "react";
// import { Alert, Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
// import { useDispatch, useSelector } from "react-redux";
// import {signInFailure,signInStart,signInSuccess,} from "../Redux/Slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// function LoginForm() {
//   const [formData, setFormData] = useState({Email:'',Password:''});
//   const dispatch = useDispatch();
//   const { loading, error: errorMessage } = useSelector((state) => state.user);
//   const navigate = useNavigate();
  

//   const handleChange = async (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });  
//   };

//   const handleSubmit = async (e) => {
//      e.preventDefault();
       
//      if (!formData.Email || !formData.Password) {
//       return toast.error("Please fill out all fields.");
//     }

//           try {
//             dispatch(signInStart());
//             const API_URL = process.env.BE_API_URL || 'http://localhost:5000';
//             const response = await fetch(`${API_URL}/api/auth/loginuser`,{
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(formData),
//             });
//             //const res = await axios.post('http://localhost:5000/api/auth/loginuser',formData);
            
//             const data = await response.json();

//             if(res.status===200)
//             {
//               dispatch(signInSuccess(data.message));
//               toast.success(data.message)
//               sessionStorage.setItem('token',data.token)
//               sessionStorage.setItem('Role',data.Role)
//               sessionStorage.setItem('id',data.id)
              
//               //!Navigte based on Role
//                if(data.Role==='Admin'){
//                  navigate('/admindashboardpage')
//                }else if(res.data.Role === 'Customer'){
//                  navigate('/customerdashboard')
//                }else if(res.data.Role === 'DeliveryBoy'){
//                  navigate('/deliveryboydashboard')
//                }else if(res.data.Role === 'PetrolStation'){
//                  navigate('/petrolstationdashboard')
//                }else{
//                  navigate('/servicemandashboard')
//                }
              
//             }
  
//           } catch (error) {
//             toast.error(error.response?.data?.message || 'Error accurred during login.');
//             dispatch(signInFailure(error.message));
//           }    
//   };


//   return (
//     <div className="box-content bg-green-500 w-80 h-50 mx-auto my-10 p-10 border-4 border-blue-500 ">
//       <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
//         <div>
//           <h1 className="px-28 py-5 font-bold text-4xl text-red-400">LOGIN</h1>
//           <div className="mb-2 block">
//             <Label htmlFor="email" value="Email" />
//           </div>
//           <input
//             type="email"
//             autoComplete='email'
//             placeholder="test@gmail.com"
//             id="Email"
//             value={formData.Email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <div className="mb-2 block">
//             <Label htmlFor="Password" value="Enter Your Password" />
//           </div>
//           <input
//             type="password"
//             autoComplete='ConfirmPassword'
//             placeholder="Password"
//             id="Password"
//             value={formData.Password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Checkbox id="remember" />
//           <Label htmlFor="remember">Remember me</Label>
//           <a href="/forgotpassword">Forget Password ?</a>
//         </div>
//         <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
//           {loading ? (
//             <>
//             <Spinner color='purple' aria-label='Purple spinner example' size='sm' />
//             <span className="pl-3">Loading...</span>
//             </>) : ('Login')}
//         </Button>
//       </form>
//       <div className="m-5">
//         <p>
//           Don't have an account ? <a href="/signupnavigate">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


// import React, { useState } from "react";
// import { Alert, Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
// import { useDispatch, useSelector } from "react-redux";
// import {signInFailure,signInStart,signInSuccess,} from "../Redux/Slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function LoginForm() {
//   const [formData, setFormData] = useState({Email:'',Password:''});
//   const dispatch = useDispatch();
//   const { loading, error: errorMessage } = useSelector((state) => state.user);
//   const navigate = useNavigate();
  

//   const handleChange = async (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    
//   };

//   const handleSubmit = async (e) => {
//      e.preventDefault();
       
//      if (!formData.Email || !formData.Password) {
//       return toast.error("Please fill out all fields.");
//     }

//           try {
//             dispatch(signInStart());
//             const API_URL = process.env.BE_API_URL || 'http://localhost:5000';
//             const res = await fetch(`${API_URL}/api/auth/loginuser`,{
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(formData),
//             });
//             //const res = await axios.post('http://localhost:5000/api/auth/loginuser',formData);

//             if(res.status===200)
//             {
//               dispatch(signInSuccess(res.data.message));
//               toast.success(res.data.message)
//               sessionStorage.setItem('token',res.data.token)
//               sessionStorage.setItem('Role',res.data.Role)
//               sessionStorage.setItem('id',res.data.id)
              
//               //!Navigte based on Role
//                if(res.data.Role==='Admin'){
//                  navigate('/admindashboardpage')
//                }else if(res.data.Role === 'Customer'){
//                  navigate('/customerdashboard')
//                }else if(res.data.Role === 'DeliveryBoy'){
//                  navigate('/deliveryboydashboard')
//                }else if(res.data.Role === 'PetrolStation'){
//                  navigate('/petrolstationdashboard')
//                }else{
//                  navigate('/servicemandashboard')
//                }
              
//             }else{
//               const errorData = await res.json();
//               toast.error(errorData.message || 'An error occurred during login.');
//               dispatch(signInFailure(errorData.message));
//             }
  
//           } catch (error) {
//             toast.error(error.response?.data?.message || 'Error accurred during login.');
//             dispatch(signInFailure(error.message));
//           }    
//   };


//   return (
//     <div className="box-content bg-green-500 w-80 h-50 mx-auto my-10 p-10 border-4 border-blue-500 ">
//       <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
//         <div>
//           <h1 className="px-28 py-5 font-bold text-4xl text-red-400">LOGIN</h1>
//           <div className="mb-2 block">
//             <Label htmlFor="Email" value="Email" />
//           </div>
//           <TextInput
//             type="Email"
//             placeholder="test@gmail.com"
//             id="Email"
//             value={formData.Email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <div className="mb-2 block">
//             <Label htmlFor="Password" value="Enter Your Password" />
//           </div>
//           <TextInput
//             type="Password"
//             placeholder="Password"
//             id="Password"
//             value={formData.Password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Checkbox id="remember" />
//           <Label htmlFor="remember">Remember me</Label>
//           <a href="/forgotpassword">Forget Password ?</a>
//         </div>
//         <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
//           {loading ? (
//             <>
//             <Spinner color='purple' aria-label='Purple spinner example' size='sm' />
//             <span className="pl-3">Loading...</span>
//             </>) : ('Login')}
//         </Button>
//       </form>
//       <div className="m-5">
//         <p>
//           Don't have an account ? <a href="/signupnavigate">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;






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
           const API_URL = import.meta.env.BE_API_URL || 'http://localhost:5000';
           const response = await axios.post(`${API_URL}/api/auth/loginuser`,{
            Email: formData.Email,
            Password: formData.Password
          });  
           const data = response.data
            console.log(data);
            console.log(data.token);  
            console.log(data.user);
          
            
           if(data.success === true)
           {
             dispatch(signInSuccess(data.message));
             toast.success(data.message)

             //localStorage.setItem('user', JSON.stringify({...data.user, AadharCard: null,ProfilePicture}));  //28-3-25
             
            //  dispatch(setCurrentUser(data.user))
             sessionStorage.setItem('token',data.token)
             sessionStorage.setItem('Role',data.user.Role)
             sessionStorage.setItem('Id',data.user.Id)
             //sessionStorage.setItem('user', JSON.stringify(data.user)); // Store user data in session storage
             
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
            <p className="text-gray-600 mt-2 text-xl">** This is Demo Project **</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="Email"
                name="email"
                type="Email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div>
                <a href="/forgotpassword" className="text-sm font-medium text-blue-600 hover:text-blue-500">
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
              login
            </Button>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <a href="/signupnavigate" className="font-medium text-blue-600 hover:text-blue-500">
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