import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsConditions = (e) => {
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mt-4 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">2. Use of the Website</h2>
        <p className="mb-4">
          You agree to use the website for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">
          The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">4. Disclaimer of Warranties</h2>
        <p className="mb-4">
          The website and the content are provided on an "as is" basis. We disclaim all warranties, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">5. Limitation of Liability</h2>
        <p className="mb-4">
          In no event will we be liable for any damages, including without limitation direct or indirect, special, incidental, or consequential damages, losses or expenses arising in connection with this site or any linked site or use thereof.
        </p>
      </div>

      <button
        onClick={goToPreviousPage}
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-75"
      >
        Submit
      </button>
    </div>
  );
};

export default TermsConditions;