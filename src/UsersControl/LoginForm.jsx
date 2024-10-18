import React, { useState } from "react";
import { Alert, Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {signInFailure,signInStart,signInSuccess,} from "../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { ApiRoutes } from "../Utils/ApiRoutes.jsx";
// import AxiosService from "../Utils/AxiosService.jsx";
import axios from "axios";


function LoginForm() {
  const [formData, setFormData] = useState({Email:'',Password:''});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  

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
            const API_URL = process.env.BE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/auth/loginuser`,formData)
            //const res = await axios.post('http://localhost:5000/api/auth/loginuser',formData);

            if(res.status===200)
            {
              dispatch(signInSuccess(res.data.message));
              toast.success(res.data.message)
              sessionStorage.setItem('token',res.data.token)
              sessionStorage.setItem('Role',res.data.Role)
              sessionStorage.setItem('id',res.data.id)
              
              //!Navigte based on Role
              // if(res.data.Role==='Admin'){
              //   navigate('/admindashboardpage')
              // }else if(res.data.Role === 'Customer'){
              //   navigate('/customerdashboard')
              // }else if(res.data.Role === 'DeliveryBoy'){
              //   navigate('/deliveryboydashboard')
              // }else if(res.data.Role === 'PetrolStation'){
              //   navigate('/petrolstationdashboard')
              // }else{
              //   navigate('/servicemandashboard')
              // }
              
            }
  
          } catch (error) {
            toast.error(error.response?.data?.message || 'Error accurred during login.');
            dispatch(signInFailure(error.message));
          }    
  };


  return (
    <div className="box-content bg-green-500 w-80 h-50 mx-auto my-10 p-10 border-4 border-blue-500 ">
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <h1 className="px-28 py-5 font-bold text-4xl text-red-400">LOGIN</h1>
          <div className="mb-2 block">
            <Label htmlFor="Email" value="Email" />
          </div>
          <TextInput
            type="Email"
            placeholder="test@gmail.com"
            id="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Password" value="Enter Your Password" />
          </div>
          <TextInput
            type="Password"
            placeholder="Password"
            id="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
          <a href="/forgotpassword">Forget Password ?</a>
        </div>
        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
          {loading ? (
            <>
            <Spinner color='purple' aria-label='Purple spinner example' size='sm' />
            <span className="pl-3">Loading...</span>
            </>) : ('Login')}
        </Button>
      </form>
      <div className="m-5">
        <p>
          Don't have an account ? <a href="/signupnavigate">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;


//!new code

// import React, { useState } from "react";
// import { Alert, Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
// import { useDispatch, useSelector } from "react-redux";
// import { signInFailure, signInStart, signInSuccess } from "../Redux/Slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// function LoginForm() {
//   const [formData, setFormData] = useState({ Email: '', Password: '' });
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.Email || !formData.Password) {
//       return toast.error("Please fill out all fields.");
//     }

//     try {
//       dispatch(signInStart());
//       const res = await axios.post('http://localhost:5000/api/auth/loginuser', formData);

//       if (res.status === 200) {
//         toast.success(res.data.message);
//         sessionStorage.setItem('token', res.data.token);
//         sessionStorage.setItem('Role', res.data.Role);
//         sessionStorage.setItem('id', res.data.id);

//         // Navigate based on role
//         switch (res.data.Role) {
//           case 'Admin':
//             navigate('/admindashboardpage');
//             break;
//           case 'Customer':
//             navigate('/customerdashboard');
//             break;
//           case 'DeliveryBoy':
//             navigate('/deliveryboydashboard');
//             break;
//           case 'PetrolStation':
//             navigate('/petrolstationdashboard');
//             break;
//           default:
//             navigate('/servicemandashboard');
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'Error occurred during login.');
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="box-content bg-green-500 w-80 h-50 mx-auto my-10 p-10 border-4 border-blue-500">
//       <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
//         <h1 className="px-28 py-5 font-bold text-4xl text-red-400">LOGIN</h1>
        
//         <div>
//           <Label htmlFor="Email" value="Email" />
//           <TextInput
//             type="email"
//             placeholder="test@gmail.com"
//             id="Email"
//             value={formData.Email}
//             onChange={handleChange}
//             required
//           />
//         </div>
        
//         <div>
//           <Label htmlFor="Password" value="Enter Your Password" />
//           <TextInput
//             type="password"
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
//           <a href="/forgotpassword">Forget Password?</a>
//         </div>
        
//         <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
//           {loading ? (
//             <>
//               <Spinner color='purple' aria-label='Purple spinner example' size='sm' />
//               <span className="pl-3">Loading...</span>
//             </>
//           ) : 'Login'}
//         </Button>
//       </form>

//       <div className="m-5">
//         <p>
//           Don't have an account? <a href="/signupnavigate">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
