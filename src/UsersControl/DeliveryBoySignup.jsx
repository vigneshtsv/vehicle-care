import { useState } from 'react'
import { TextInput,Checkbox,Label,Button, Alert, Spinner, Textarea } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowBack } from 'react-icons/io';
import { LogInIcon } from 'lucide-react';


function DeliveryBoySignup() {
  const [formData, setFormData] = useState({
    FirstName:"",
    LastName:"",
    PhoneNumber:"",
    Email:"",
    Password:"",
    ConfirmPassword:"",
    Address:"",
    Role:'DeliveryBoy',
  });

  const [files,setFiles] = useState({
    AadharCard: null,
    ProfilePicture: null,
    DrivingLicence: null,
  })
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value.trim()}));
  };

  const handleFileChange = (e) => {
    const { name,files: fileList } = e.target;
    setFiles({
      ...files,
      [name]: fileList[0]
    });
  };

  const saveToken = (token) => {
    sessionStorage.setItem('authToken',token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')
    setSuccessMsg('');
    setLoading(true);

    if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
      return setErrorMessage("Please fill out all fields");
    }

    if(formData.Password !== formData.ConfirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
 
    if(!files.AadharCard) {
      setErrorMessage('AadharCard is required');
      setLoading(false);
      return;
    }

    if(!files.ProfilePicture) {
      setErrorMessage('ProfilePicture is required');
      setLoading(false);
      return;
    }

    if(!files.DrivingLicence) {
      setErrorMessage('DrivingLicence is required');
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();

      Object.entries(formData).forEach(([Key,value]) => {
        submitData.append(Key,value)
      });

      Object.entries(files).forEach(([Key,file]) => {
        if (file) {
          submitData.append(Key,file);
        }
      });

      // setLoading(true);
      // setErrorMessage(null);
      const response = await axios.post('http://localhost:5000/api/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      
      setFormData(response.data.user)
      setSuccessMsg('Registration successful!')
      resetForm();

      if(response.data.token) {
        saveToken(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setSuccessMsg('Registration Successful');
        resetForm();
        navigate('/');
        toast.success('DeliveryBoy Registration Successfully')
      }
    } catch (error) {
      setErrorMessage(error.message);
      toast.error('DeliveryBoy Registration failed. please try again.')
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFormData({
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      Role: 'DeliveryBoy',
    });

    setFiles({
      ProfilePicture: null,
      AadharCard: null,
      DrivingLicence: null,
    });
  };

  const backPage = () => {
    navigate(-1);
  }

  const loginPage = () => {
    navigate('/');
  }

  return <div>
    <div className="flex space-x-4">
          <Button onClick={backPage} outline gradientDuoTone="purpleToBlue">
              <IoMdArrowBack className="mr-2" />
              Back
          </Button>
          <Button onClick={loginPage} outline gradientDuoTone="purpleToBlue">
              Login <LogInIcon className="mr-2" />
          </Button>
    </div>
    <h1>DeliveryBoy Signup</h1>
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit} >
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
       <Textarea type='text' placeholder='Enter Your Address' id='Address' onChange={handleChange} required/>
       </div>
       <h3 className="text-lg font-semibold mt-6 mb-4">Upload Documents</h3>
      <div>
         <div className='mb-4'>
           <Label htmlFor='AadharCard'>AadharCard</Label>
           <TextInput type='file' id='AadharCard' name='AadharCard' onChange={handleFileChange} required/>
         </div>
         <div className='mb-4'>
            <Label htmlFor='DrivingLicence'>DrivingLicence</Label>
            <TextInput type='file' id='DrivingLicence' name='DrivingLicence' onChange={handleFileChange} required/>
         </div>
         <div className='mb-4'>
            <Label htmlFor='ProfilePicture'>ProfilePicture</Label>
            <TextInput type='file' id='ProfilePicture' name='ProfilePicture' onChange={handleFileChange} required/>
         </div>
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
      {/* <input id="Role"  type="text"  value="DeliveryBoy" onChange={handleChange} /> */}
        <Button type='submit' outline gradientDuoTone="purpleToPink" disabled={loading}>
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
      {successMsg && (
        <Alert color='success' icon={HiInformationCircle}>
          <span className='font-medium me-2'>Success</span> &nbsp; {successMsg}
        </Alert> 
      )}
  </div>
  
}

export default DeliveryBoySignup