import React, { useState } from 'react'
import { TextInput,Checkbox,Label,FileInput,Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';



function PetrolStationSignup() {
  const [formData, setFormData] = useState({Role:'PetrolStation'});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value.trim()}));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev)=> ({...prev, file }));
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
  }
  return <div>
    <h1>PetrolStation Signup</h1>
     <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
     <div className="grid grid-flow-col justify-stretch space-x-4">
        <TextInput type='text' placeholder='First Name' id='FirstName' onChange={handleChange} required/>
        <TextInput type='text' placeholder='Last Name' id='LastName' onChange={handleChange} required/>
      </div>
      <section>
      <TextInput type="email" placeholder="vignesh@gmail.com" id='Email' onChange={handleChange} required />
      <br /> 
      <TextInput type='tel' placeholder='9014638964' id='PhoneNumber' onChange={handleChange} required />
      </section>
      <section>
       <TextInput type='password' placeholder='Create New Password' id='Password' onChange={handleChange} required />
       <TextInput type='password' placeholder='Confirm New Password' id='ConfirmPassword' onChange={handleChange} required />
      </section>
     <div>
       <TextInput type='textarea' placeholder='Enter Your Address' id='Address' onChange={handleChange} required/>
       </div>
      <div>
         <section className="grid grid-flow-col justify-stretch space-x-4">
             <FileInput id="AadharCard" onChange={handleFileChange} required />
         </section>
         <section className="grid grid-flow-col justify-stretch space-x-4">
             <FileInput id="PetrolStationCertification" onChange={handleFileChange} required />
         </section>
         <section className="grid grid-flow-col justify-stretch space-x-4">
             <FileInput id="CurrentPhoto" onChange={handleFileChange} required />
         </section>
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
      {/* <input id="Role"  type="text"  value="PetrolStation" onChange={handleChange} /> */}
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
  </div>  
}

export default PetrolStationSignup;