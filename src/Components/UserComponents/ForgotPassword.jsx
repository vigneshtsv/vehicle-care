import { Button, Modal } from "flowbite-react";
import { ArrowLeft, BackpackIcon, MoveLeft, MoveLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setUpdatePopup(true);
  };
  const handleClosePopup = () => {
    setUpdatePopup(false);
  };
  const handlebackpage = () => {
    navigate('/');
  };
  return (
    <div className="forgotbg flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-transparent backdrop-blur-sm border border-white p-8 rounded-lg shadow-md w-full max-w-md">
        <button onClick={handlebackpage}
          className="flex items-center border border-red-600 p-2 rounded-xl gap-2 text-yellow-100 hover:text-yellow-400 mb-6 transition-colors"
        ><ArrowLeft />Back</button>
        <h2 className="text-2xl font-bold mb-6 text-yellow-100 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-yellow-100">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div>
            <Button
              type="submit"
              className={`w-full px-4 py-2 text-white rounded-lg ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
        <p className="text-sm text-lime-400 mt-4 text-center">
          Remembered your password?{" "}
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>

        {/* popupnotification */}
        {updatePopup && (
          <Modal show={updatePopup} size='xl' popup onClose={handleClosePopup}>
            <Modal.Header>Update Project</Modal.Header>
            <Modal.Body>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className="text-gray-600 mb-4">
                      We're improving our e-commerce platform with new features and enhanced tracking capabilities. 
                      The system will remain operational during the update.
                    </p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <Button
                    onClick={() => setUpdatePopup(false)}
                  >
                    Close
                  </Button>
                </div>
                </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
