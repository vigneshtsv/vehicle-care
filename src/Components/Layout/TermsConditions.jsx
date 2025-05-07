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
    <div className="termsbg">
      <div className="p-6 max-w-4xl bg-white mx-auto border border-gray-300 rounded-lg shadow-md">
      <h1 className="flex justify-center underline text-3xl font-bold mb-4 text-gray-800">Terms and Conditions</h1>
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
    </div>
  );
};

export default TermsAndConditions;
