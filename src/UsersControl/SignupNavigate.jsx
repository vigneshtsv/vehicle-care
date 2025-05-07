import React from "react";

export default function SignupNavigate() {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center navigationbg px-4">
      <div className="w-full max-w-md md:max-w-2xl bg-transparent bg-opacity-90 p-6 md:p-10 rounded-2xl border-2 border-red-500 shadow-xl">
        <h1 className="text-center text-2xl md:text-3xl text-red-900 font-extrabold bg-green-500 mb-8 p-2 border-2 border-red-500 rounded-xl shadow-lg">
          Role Based Signup & Add Your Details
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li className="bg-yellow-400 p-4 rounded-xl text-center text-xl hover:bg-yellow-600 transition">
            <a href="/customersignup">Customer Signup</a>
          </li>
          <li className="bg-yellow-400 p-4 rounded-xl text-center text-xl hover:bg-yellow-600 transition">
            <a href="/deliveryboysignup">Delivery Boy Signup</a>
          </li>
          <li className="bg-yellow-400 p-4 rounded-xl text-center text-xl hover:bg-yellow-600 transition">
            <a href="/petrolstationsignup">Petrol Station Signup</a>
          </li>
          <li className="bg-yellow-400 p-4 rounded-xl text-center text-xl hover:bg-yellow-600 transition">
            <a href="/servicemansignup">Service Man Signup</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
