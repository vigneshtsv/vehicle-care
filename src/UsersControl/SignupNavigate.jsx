import React from 'react'

export default function SignupNavigate() {
  return <div className='box-content bg-green-400 w-80 h-50 mx-auto my-20 p-10 rounded-xl'>
  <div>
    <h1 className='flex-auto items-center text-3xl text-red-700 font-extrabold m-10'>Select Your Role</h1>
  </div>
  <ul>
    <li className='bg-yellow-400 p-3 m-5 px-10 rounded-xl text-2xl hover:bg-yellow-700'>
      <button><a href="/customersignup">CustomerSignup</a></button>
    </li>
    <li className='bg-yellow-400 p-3 m-5 px-10 rounded-xl text-2xl hover:bg-yellow-700'>
      <button><a href="/deliveryboysignup">DeliveryBoySignup</a></button>
    </li>
    <li className='bg-yellow-400 p-3 m-5 px-10 rounded-xl text-2xl hover:bg-yellow-700'>
      <button><a href="/petrolstationsignup">PetrolStationSignup</a></button>
    </li>
    <li className='bg-yellow-400 p-3 m-5 px-10 rounded-xl text-2xl hover:bg-yellow-700'>
      <button><a href="/servicemansignup">ServiceManSignup</a></button>
    </li>
  </ul>
</div>
}
