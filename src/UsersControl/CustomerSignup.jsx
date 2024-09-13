import React, { useState } from 'react'
import { TextInput,Checkbox,Label,FileInput,Button, Spinner, Alert } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../Redux/Slice/authSlice';


function CustomerSignup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState(null)
  const navigate = useNavigate();

  const handleChange =(e)=> {
      //console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    //console.log(formData);
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    if(!formData.FirstName || !formData.LastName || !formData.Email ) {
      return setErrorMessage("Please fill out the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null)
      const response = await fetch('http://localhost:5000/api/auth/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await response.json();
      if(data.success === false) {
        return setErrorMessage(data.message)
      }
      if(response.ok){
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false) 
    }
  }
  return <div>
    <div>
  <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
    <h1>Customer Signup</h1>
    <div className="grid grid-flow-col justify-stretch space-x-4">
        <TextInput type='text' placeholder='First Name' onChange={handleChange} required/>
        <TextInput type='text' placeholder='Last Name' required/>
      </div>
      <section>
      <TextInput type="email" placeholder="vignesh@gmail.com" onChange={handleChange} required />
      <br /> 
      <TextInput type='tel' placeholder='7373358187' onChange={handleChange} required />
      </section>
      <section>
       <TextInput type='password' placeholder='Create New Password' onChange={handleChange} required />
       <TextInput type='password' placeholder='confirm New Password' onChange={handleChange} required />
      </section>
     <div>
       <TextInput type='text' placeholder='Enter Your Address' onChange={handleChange} required/>
       </div>
      <div>
      <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." required/>
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
      <input id="readOnlyInput"  type="text"  value="Customer" />
      <Button type='submit' gradientDuoTone="tealToLime" disabled={loading}>
        {loading ? (<>
          <Spinner color="purple" aria-label="Purple spinner example" size='sm' />
          <span className='pl-3'>Loading....</span>
        </>) : ('Submit')}
        </Button>
  </form>
  <div className='flex gap-2 text-sm mt-6'>
    <span>Already Have An Account ?</span>
    <Link to='/loginform' className='text-blue-600'>
    signin</Link>
  </div>
  <div>
    {errorMessage && (
      <Alert color='failure' icon={HiInformationCircle}>
        <span className='font-medium me-2'>OOPS!</span> &nbsp; {errorMessage}
      </Alert>
    )}
  </div>
  </div>
  </div>
}

export default CustomerSignup;