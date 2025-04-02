// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Label, Textarea, TextInput } from 'flowbite-react';
// import { useNavigate } from 'react-router-dom';
// import { IoMdArrowBack } from "react-icons/io";
// import { LogInIcon } from 'lucide-react';

// const CustomerSignup = () => {
//   const [formData, setFormData] = useState({
//     FirstName: '',
//     LastName: '',
//     PhoneNumber: '',
//     Email: '',
//     Password: '',
//     ConfirmPassword: '',
//     Address: '',
//     Role: 'Customer', 
//   });

//   const [files, setFiles] = useState({
//     ProfilePicture: null,
//     AadharCard: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
//   const navigate = useNavigate();

//   // Handle text input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Handle file input changes
//   const handleFileChange = (e) => {
//     const { name, files: fileList } = e.target;
//     setFiles({
//       ...files,
//       [name]: fileList[0]
//     });
//   };

//   const saveToken =(token) => {
//     sessionStorage.setItem('authToken',token)
//   }
//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setSuccessMsg('');
//     setLoading(true);

//     // Basic validation
//     if (formData.Password !== formData.ConfirmPassword) {
//       setErrorMsg('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     // Check required documents
//     if(!files.AadharCard) {
//       setErrorMsg('Aadhar Card is required');
//       setLoading(false);
//       return;
//     }

//     if(!files.ProfilePicture) {
//       setErrorMsg('ProfilePicture is required');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Create form data for sending files
//       const submitData = new FormData();
      
//       // Add text fields
//       Object.entries(formData).forEach(([key, value]) => {
//         submitData.append(key, value);
//       });
      
//       // Add file fields
//       Object.entries(files).forEach(([key, file]) => {
//         if (file) {
//           submitData.append(key, file);
//         }
//       });

//       // Send the request
//       const response = await axios.post('http://localhost:5000/api/auth/register', submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//       setFormData(response.data.user)
//       // Optionally reset form
//       console.log(response.data.token);
      
//       if(response.data.token) {
//         saveToken(response.data.token);
//         axios.defaults.headers.common['Authorization'] = `Bearer${response.data.token}`;
//         setSuccessMsg('Registration Successfully');
//         resetForm();
//         toast.success('Customer Registration Successfully')
//         setTimeout(() => navigate('/'), 1500);
//       }
//     } catch (error) {
//       setErrorMsg(
//         error.response?.data?.message || 
//         'Registration failed. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       FirstName: '',
//       LastName: '',
//       PhoneNumber: '',
//       Email: '',
//       Password: '',
//       ConfirmPassword: '',
//       Address: '',
//       StationName: '',
//       Role: 'Customer',
//     });
    
//     setFiles({
//       ProfilePicture: null,
//       AadharCard: null,
//     });
//   };

//   const backPage = () => {
//     navigate(-1);
//   }

//   const loginPage = () => {
//     navigate('/');
//   }


//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <div className="flex space-x-4">
//         <Button onClick={backPage} outline gradientDuoTone="purpleToBlue">
//           <IoMdArrowBack className="mr-2" />
//           Back
//         </Button>
//         <Button onClick={loginPage} outline gradientDuoTone="purpleToBlue">
//           Login <LogInIcon className="mr-2" />
//         </Button>
//       </div>
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Customer Registration
//       </h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="FirstName">First Name *</Label>
//             <TextInput
//               type="text"
//               id="FirstName"
//               name="FirstName"
//               value={formData.FirstName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="LastName">Last Name *</Label>
//             <TextInput
//               type="text"
//               id="LastName"
//               name="LastName"
//               value={formData.LastName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <Label htmlFor="Email">Email *</Label>
//           <TextInput
//             type="email"
//             id="Email"
//             name="Email"
//             value={formData.Email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <Label htmlFor="PhoneNumber">Phone Number *</Label>
//           <TextInput
//             type="tel"
//             id="PhoneNumber"
//             name="PhoneNumber"
//             value={formData.PhoneNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="mb-4">
//             <Label htmlFor="Password">Password *</Label>
//             <TextInput
//               type="password"
//               id="Password"
//               name="Password"
//               value={formData.Password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <Label htmlFor="ConfirmPassword">Confirm Password *</Label>
//             <TextInput
//               type="password"
//               id="ConfirmPassword"
//               name="ConfirmPassword"
//               value={formData.ConfirmPassword}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <Label htmlFor="Address">Address</Label>
//           <Textarea
//             id="Address"
//             name="Address"
//             value={formData.Address}
//             onChange={handleInputChange}
//             rows="3"
//           ></Textarea>
//         </div>

//         {/* File upload fields */}
//         <h3 className="text-lg font-semibold mt-6 mb-4">Upload Documents</h3>

//         <div className="mb-4">
//           <Label htmlFor="AadharCard">Aadhar Card *</Label>
//           <TextInput
//             type="file"
//             id="AadharCard"
//             name="AadharCard"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <Label htmlFor="ProfilePicture">ProfilePicture *</Label>
//           <TextInput
//             type="file"
//             id="ProfilePicture"
//             name="ProfilePicture"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div>
//           <Button
//             type="submit"
//             gradientDuoTone="purpleToPink"
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </div>
//       </form>
//       <div>
//         {errorMsg && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {errorMsg}
//           </div>
//         )}

//         {successMsg && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//             {successMsg}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerSignup;

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
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
    Role: 'Customer',
    ProfilePicture:'',
    AadharCard:''
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
   
   const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Handle file input changes
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFormData({...formData,[e.target.name]:base64});
    } catch (error) {
      console.error('Error converting file to base64:', error);
      setErrorMsg('Error converting file to base64. Please try again.');
    }

    const { name, files: fileList } = e.target;
    if(files && files[0]){
      const file = fileList[0];
      setFiles({
        ...files,
        [name]: file
      });
    }

    //   const reader = new FileReader();

    //   reader.onload = (event) => {
    //     const base64String = event.target.result;
    //     setFormData({
    //       ...formData,
    //       [name]: base64String
    //     });
    //   };
    //   reader.readAsDataURL(file);
    // }
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
    // if(!files.AadharCard) {
    //   setErrorMsg('Aadhar Card is required');
    //   setLoading(false);
    //   return;
    // }

    // if(!files.ProfilePicture) {
    //   setErrorMsg('ProfilePicture is required');
    //   setLoading(false);
    //   return;
    // }

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
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // setFormData(response.data.user)
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