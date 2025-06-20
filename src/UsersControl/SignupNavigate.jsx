import { ArrowLeft, LogIn, Shield } from "lucide-react";

export default function SignupNavigate() {
  const handleBack = () => {
    window.history.back(); 
  };
  const handleAdminSignup = () => {
    window.location.href = "/adminsignup";
  }
  const handleLogin = () => {
    window.location.href = "/"; 
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center navigationbg px-4">
      <div className="w-full max-w-md md:max-w-2xl bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 p-6 md:p-10 rounded-2xl border-2 border-red-500 shadow-xl">
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
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 my-12">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-300 to-lime-200 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-500 border-opacity-50"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </button>

          {/* Admin Signup Button */}
          <button
            onClick={handleAdminSignup}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r bg-yellow-400 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-red-500 border-opacity-50"
          >
            <Shield className="w-6 h-6" />
            Admin Signup
          </button>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-300 to-lime-200 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-500 border-opacity-50"
          >
            <LogIn className="w-6 h-6" />
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
