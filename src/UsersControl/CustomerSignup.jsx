// import React, { useState } from 'react';
// import { TextInput, Checkbox, Label, FileInput, Button, Spinner, Alert } from "flowbite-react";
// import { Link, useNavigate } from 'react-router-dom';
// import { HiInformationCircle } from 'react-icons/hi';
// import axios from 'axios';

// function CustomerSignup() {
//   const [formData, setFormData] = useState({Role:'Customer'});
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
  
  
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value.trim()}));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !formData.FirstName ||
//       !formData.LastName ||
//       !formData.Email ||
//       !formData.Password
//     ) {
//       return setErrorMessage("Please fill out all fields");
//     }

//     if (formData.Password !== formData.ConfirmPassword) {
//       return setErrorMessage("Passwords do not match");
//     }
//     setLoading(true);
//     setErrorMessage(null);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register"
//       );
//       console.log(response);
      
//       if (!response.ok) {
//         return setErrorMessage(data.message || "Registration failed");
//       } else {
//         setErrorMessage(data.message);
//         sessionStorage.setItem("authToken", data.Token);
//         sessionStorage.setItem("userEmail", formData.Email);

//         navigate("/");
//       }
//     } catch (error) {
//       setErrorMessage("Signup failed.  Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <h1>Customer Signup</h1>
//       <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="grid grid-flow-col justify-stretch space-x-4">
//           <TextInput type='text' placeholder='First Name' autoComplete="given-name" id='FirstName' onChange={handleChange} required />
//           <TextInput type='text' placeholder='Last Name' autoComplete="family-name" id='LastName' onChange={handleChange} required />
//         </div>
//         <TextInput type="email" placeholder="vignesh@gmail.com" autoCorrect='on' autoComplete='email' id='Email' onChange={handleChange} required />
//         <TextInput type='tel' placeholder='7373358187' autoComplete='phonenumber' id='PhoneNumber' onChange={handleChange} required />
//         <div className='grid grid-flow-col justify-stretch space-x-4'>
//         <TextInput type='password' placeholder='Create New Password' autoComplete='new-password' id='Password' onChange={handleChange} required />
//         <TextInput type='password' placeholder='Confirm New Password' autoComplete='confirm-password' id='ConfirmPassword' required onChange={handleChange}/>
//         </div>
//         <TextInput type='text' placeholder='Enter Your Address' autoComplete='address' id='Address' onChange={handleChange} required />
//         <FileInput id="AadharCard" onChange={handleFileChange} required />
//         <div className="flex items-center gap-2">
//           <Checkbox id="accept" defaultChecked required />
//           <Label htmlFor="accept" className="flex">
//             I agree with the&nbsp;
//             <a href="/termsconditions" className="text-cyan-600 hover:underline dark:text-cyan-500">
//               terms and conditions
//             </a>
//           </Label>
//         </div>
//         {/* <TextInput type="text" id="Role" value='Customer' onChange={handleChange} /> */}
        
//         <Button type='submit' outline gradientDuoTone="purpleToPink" disabled={loading}>
//           {loading ? (
//             <>
//               <Spinner color="purple" aria-label="Purple spinner example" size='sm' />
//               <span className='pl-3'>Loading....</span>
//             </>
//           ) : ('Submit')}
//         </Button>
//       </form>
//       <div className='flex gap-2 text-sm mt-6'>
//         <span>Already Have An Account?</span>
//         <Link to='/' className='text-blue-600'>Sign in</Link>
//       </div>
//       {errorMessage && (
//         <Alert color='failure' icon={HiInformationCircle}>
//           <span className='font-medium me-2'>OOPS!</span> &nbsp; {errorMessage}
//         </Alert>
//       )}
//     </>
//   );
// }

// export default CustomerSignup;



import React, { useState } from 'react';
import axios from 'axios';
import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { LogInIcon } from 'lucide-react';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Address: '',
    Role: 'Customer', 
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles({
      ...files,
      [name]: fileList[0]
    });
  };

  const saveToken =(token) => {
    sessionStorage.setItem('authToken',token)
  }
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    // Basic validation
    if (formData.Password !== formData.ConfirmPassword) {
      setErrorMsg('Passwords do not match');
      setLoading(false);
      return;
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
    });
    
    setFiles({
      ProfilePicture: null,
      AadharCard: null,
    });
  };

  const backPage = () => {
    navigate(-1);
  }

  const loginPage = () => {
    navigate('/');
  }


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex space-x-4">
        <Button onClick={backPage} outline gradientDuoTone="purpleToBlue">
          <IoMdArrowBack className="mr-2" />
          Back
        </Button>
        <Button onClick={loginPage} outline gradientDuoTone="purpleToBlue">
          Login <LogInIcon className="mr-2" />
        </Button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Customer Registration
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="FirstName">First Name *</Label>
            <TextInput
              type="text"
              id="FirstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="LastName">Last Name *</Label>
            <TextInput
              type="text"
              id="LastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
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

          <div className="mb-4">
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

        <div className="mb-4">
          <Label htmlFor="Address">Address</Label>
          <Textarea
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
            rows="3"
          ></Textarea>
        </div>

        {/* File upload fields */}
        <h3 className="text-lg font-semibold mt-6 mb-4">Upload Documents</h3>

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

        <div>
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
      <div>
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