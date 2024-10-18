// import React, { useState } from 'react'
// import { TextInput, Checkbox, Label, FileInput, Button, Spinner, Alert, } from "flowbite-react";
// import { Link, useNavigate } from 'react-router-dom';
// import { HiInformationCircle } from 'react-icons/hi';


// function CustomerSignup() {
//   const [ formData, setFormData ] = useState({
//     FirstName: '',
//     LastName: '',
//     Email: '',
//     PhoneNumber: '',
//     Password: '',
//     ConfirmPassword: '',
//     Address: '',
//     AadharCard: null
//   });
//   const [ loading, setLoading ] = useState(false)
//   const [ errorMessage, setErrorMessage ] = useState(null)
//   const navigate = useNavigate();
  
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: type === 'file' ? files[0] : value.trim()
//     }));
//   };

//   const handleSubmit = async(e)=> {
//     e.preventDefault();
//     if(!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
//       return setErrorMessage("Please fill out all required fields");
//     }

//     if(formData.Password !== formData.ConfirmPassword) {
//       return setErrorMessage('Passwords do not match')
//     }
//     try {
//       setLoading(true);
//       setErrorMessage(null)
    
//     const dataToSend = new FormData();
//     for (const key in formData) {
//       if (key !== 'ConfirmPassword') {
//         dataToSend.append(key, formData[key]);
//       }
//     }

//     const response = await fetch('http://localhost:5000/api/auth/register', {
//       method: 'POST',
//       body: dataToSend
//     });
//       const data = await response.json();
//       if(data.success === false) {
//         throw new Error(data.message);
//       }
      
//       if(response.ok){
//         navigate('/');
//       }
//     } catch (error) {
//       setErrorMessage(error.message)
 
//     } finally {
//       setLoading(false);
//     }
//   };

//   return <>
//   <div>
//     <h1>Customer Signup</h1>
//   </div>
//   <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
//     <div className="grid grid-flow-col justify-stretch space-x-4">
//       <TextInput type='text' placeholder='First Name' name='FirstName' onChange={handleChange} required/>
//       <TextInput type='text' placeholder='Last Name' name='LastName' onChange={handleChange} required/>
//     </div>
//     <TextInput type="email" placeholder="email@example.com" name='Email' onChange={handleChange} required/>
//     <TextInput type='tel' placeholder='Phone Number' name='PhoneNumber' onChange={handleChange} required />
//     <div className='grid grid-flow-col justify-stretch space-x-4'>
//     <TextInput type='password' placeholder='Create New Password' name='Password' onChange={handleChange} required />
//     <TextInput type='ConfirmPassword' placeholder='Confirm New Password' name='ConfirmPassword' onChange={handleChange} required />
//     </div>
//     <TextInput type='text' id="address" placeholder='Enter Your Address' name='Address' onChange={handleChange} required/>
//     <FileInput name="AadharCard" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." onChange={handleChange} required/>
//     <div className="flex items-center gap-2">
//       <Checkbox id="accept" required/>
//       <Label htmlFor="accept" className="flex">
//         I agree with the&nbsp;
//         <Link to="/termsconditions" className="text-cyan-600 hover:underline dark:text-cyan-500">
//           terms and conditions
//         </Link>
//       </Label>
//     </div>
//     <Button type='submit' gradientDuoTone="tealToLime" disabled={loading}>
//       {loading ? (
//         <>
//           <Spinner color="purple" aria-label="Purple spinner example" size='sm' />
//           <span className='pl-3'>Loading...</span>
//         </>
//       ) : 'Submit'}
//     </Button>
//   </form>
//   <div className='flex gap-2 text-sm mt-6'>
//     <span>Already Have An Account?</span>
//     <Link to='/' className='text-blue-600'>Sign In</Link>
//   </div>
//   {errorMessage && (
//     <Alert color='failure' icon={HiInformationCircle}>
//       <span className='font-medium'>Error:</span> {errorMessage}
//     </Alert>
//   )}
// </>
// }

// export default CustomerSignup;






 //reference : 'https://claude.ai/chat/5fd836df-965e-4aaf-86ec-d23d856e9c45'

import React, { useState } from 'react';
import { TextInput, Checkbox, Label, FileInput, Button, Spinner, Alert } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';


function CustomerSignup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim()}));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
      return setErrorMessage("Please fill out all fields");
    }

    if(formData.Password !== formData.ConfirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        return setErrorMessage(data.message || 'Registration failed');
      }
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Customer Signup</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-flow-col justify-stretch space-x-4">
          <TextInput type='text' placeholder='First Name' id='FirstName' onChange={handleChange} required />
          <TextInput type='text' placeholder='Last Name' id='LastName' onChange={handleChange} required />
        </div>
        <TextInput type="email" placeholder="vignesh@gmail.com" id='Email' onChange={handleChange} required />
        <TextInput type='tel' placeholder='7373358187' id='PhoneNumber' onChange={handleChange} required />
        <div className='grid grid-flow-col justify-stretch space-x-4'>
        <TextInput type='password' placeholder='Create New Password' id='Password' onChange={handleChange} required />
        <TextInput type='password' placeholder='Confirm New Password' id='ConfirmPassword' required onChange={handleChange}/>
        </div>
        <TextInput type='text' placeholder='Enter Your Address' id='Address' onChange={handleChange} required />
        <FileInput id="AadharCard" onChange={handleFileChange} required />
        <div className="flex items-center gap-2">
          <Checkbox id="accept" defaultChecked required />
          <Label htmlFor="accept" className="flex">
            I agree with the&nbsp;
            <a href="/termsconditions" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </a>
          </Label>
        </div>
        <input id="readOnlyInput"  type="text"  value="Customer" onChange={handleChange}/>
        <Button type='submit' gradientDuoTone="tealToLime" disabled={loading}>
          {loading ? (
            <>
              <Spinner color="purple" aria-label="Purple spinner example" size='sm' />
              <span className='pl-3'>Loading....</span>
            </>
          ) : ('Submit')}
        </Button>
      </form>
      <div className='flex gap-2 text-sm mt-6'>
        <span>Already Have An Account?</span>
        <Link to='/' className='text-blue-600'>Sign in</Link>
      </div>
      {errorMessage && (
        <Alert color='failure' icon={HiInformationCircle}>
          <span className='font-medium me-2'>OOPS!</span> &nbsp; {errorMessage}
        </Alert>
      )}
    </>
  );
}

export default CustomerSignup;