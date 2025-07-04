import React from 'react'
import { ArrowBigLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function AdminsignupApproval() {
    const navigate = useNavigate()

    const handleback = () => {
        navigate(-1); 
    }
    const goToLogin = () => {
        navigate('/');
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-blue-400">
        
        <div className="mb-6">
          <div className="text-white mb-4">
            <p className="mb-3">
              🔐 <strong className="text-yellow-300">Important Notice:</strong>
            </p>
            <p className="mb-2">
              Your admin registration request will be sent for approval verification.
            </p>
            <p className="mb-2">
              ✅ Once verified by our team, you will receive admin access.
            </p>
            <p className="text-blue-200">
              📧 You'll be notified via email about the approval status.
            </p>
          </div>
          
          <div className="bg-blue-900 bg-opacity-30 p-3 rounded border-l-4 border-blue-400 mb-2">
            <p className="text-sm text-blue-200">
              <strong>Note:</strong> This process may take 24-48 hours for security verification.
            </p>
          </div>
          <div className="bg-blue-900 bg-opacity-30 p-3 rounded border-l-4 border-blue-400">
            <p className="text-sm text-blue-200">
               <strong>Until then, you can continue as a  <u>'Customer'</u>.</strong>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-blue-950 shadow-md rounded-2xl max-w-md mx-auto">
      <button
        onClick={handleback}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition duration-300 w-full sm:w-auto"
      >
        <ArrowBigLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <button
        onClick={goToLogin}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 w-full sm:w-auto"
      >
        Customer Login
      </button>
    </div>
      </div>
    </div>
  )
}

export default AdminsignupApproval;



