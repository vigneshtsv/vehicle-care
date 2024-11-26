// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TermsConditions = (e) => {
//   const navigate = useNavigate();

//   const goToPreviousPage = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
//       <div className="prose max-w-none">
//         <h2 className="text-xl font-semibold mt-4 mb-2">1. Acceptance of Terms</h2>
//         <p className="mb-4">
//           By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
//         </p>

//         <h2 className="text-xl font-semibold mt-4 mb-2">2. Use of the Website</h2>
//         <p className="mb-4">
//           You agree to use the website for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
//         </p>

//         <h2 className="text-xl font-semibold mt-4 mb-2">3. Intellectual Property</h2>
//         <p className="mb-4">
//           The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights.
//         </p>

//         <h2 className="text-xl font-semibold mt-4 mb-2">4. Disclaimer of Warranties</h2>
//         <p className="mb-4">
//           The website and the content are provided on an "as is" basis. We disclaim all warranties, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement.
//         </p>

//         <h2 className="text-xl font-semibold mt-4 mb-2">5. Limitation of Liability</h2>
//         <p className="mb-4">
//           In no event will we be liable for any damages, including without limitation direct or indirect, special, incidental, or consequential damages, losses or expenses arising in connection with this site or any linked site or use thereof.
//         </p>
//       </div>

//       <button
//         onClick={goToPreviousPage}
//         className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-75"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default TermsConditions;


//!chat GPT routing code for 

import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert("You have accepted the Terms and Conditions.");
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Terms and Conditions</h1>
      <h3 className="text-xl font-semibold mb-2 text-gray-700">Vehicle-care</h3>
      <p className="text-gray-600 mb-4">
        Welcome to Vehicle-care! By accessing or using our website, you agree to
        comply with and be bound by the following terms and conditions of use.
        Please read them carefully.
      </p>
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-700">1. Acceptance of Terms</h4>
          <p className="text-gray-600">
            By using this site, you signify your agreement to these terms. If
            you do not agree, please do not use this site.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">2. Use of Our Services</h4>
          <p className="text-gray-600">
            Vehicle-care provides automotive services, products, and related
            content. You agree to use our website only for lawful purposes and
            in accordance with these terms.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">3. Privacy Policy</h4>
          <p className="text-gray-600">
            We respect your privacy and are committed to protecting your
            personal information. Please review our Privacy Policy for more
            details.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">4. Modifications</h4>
          <p className="text-gray-600">
            Vehicle-care reserves the right to update or modify these terms at
            any time without prior notice. Your continued use of the site after
            changes have been made constitutes acceptance of the updated terms.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">5. Limitation of Liability</h4>
          <p className="text-gray-600">
            Vehicle-care shall not be held liable for any damages resulting
            from the use or inability to use our services, including but not
            limited to direct, indirect, or consequential damages.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">6. Contact Information</h4>
          <p className="text-gray-600">
            If you have any questions about these terms, please contact us at
            <a
              href="mailto:support@vehicle-care.com"
              className="text-blue-600 underline ml-1"
            >
              support@vehicle-care.com
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:ring focus:ring-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:ring focus:ring-green-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
