import React from 'react'
import { TextInput,Checkbox,Label,FileInput,Button } from "flowbite-react";

function PetrolStationSignup() {
  return <div>
  <form className="flex max-w-md flex-col gap-4">
    <h1>PetrolStation Signup</h1>
    <div className="grid grid-flow-col justify-stretch space-x-4">
        <TextInput type='text' placeholder='First Name' required/>
        <TextInput type='text' placeholder='Last Name' required/>
      </div>
      <section>
      <TextInput type="email" placeholder="vignesh@gmail.com" required />
      <br /> 
      <TextInput type='tel' placeholder='9999999999' required />
      </section>
      <section>
       <TextInput type='password' placeholder='Create New Password' required />
       <TextInput type='password' placeholder='confirm New Password' required />
      </section>
     <div>
       <TextInput type='textarea' placeholder='Enter Your Address' required/>
       </div>
      <div>
         <section className="grid grid-flow-col justify-stretch space-x-4">
            <Label htmlFor="file-upload-helper-text" value="AadharCard" required/>
            <FileInput />
         </section>
         <section className="grid grid-flow-col justify-stretch space-x-4">
            <Label htmlFor="file-upload-helper-text" value="PetrolStation Certification" required/>
            <FileInput />
         </section>
         <section className="grid grid-flow-col justify-stretch space-x-4">
            <Label htmlFor="file-upload-helper-text" value="Current Photo" required/>
            <FileInput />
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
      <input id="readOnlyInput"  type="text"  value="PetrolStation" />
      <Button type='submit' gradientDuoTone="tealToLime">Submit</Button>
  </form>
  </div>
  
}

export default PetrolStationSignup;