import React from 'react';
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";

const TermsConditions = () => {
  return <div>
    <Card className="box-content bg-green-500 w-96 h-50 mx-auto border-4 border-blue-500 p-5 rounded-3xl shadow-lg justify-center">
      <h1 className="text-3xl font-bold mb-6 justify-center">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be
        bound by the following terms and conditions of use, which together with our privacy policy govern <b>Vehicle-care</b>’s relationship with you in relation to this website.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
      <p className="mb-4">
        The content of the pages of this website is for your general information and use only. It is subject to change
        without notice.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. User Agreement</h2>
      <p className="mb-4">
        By using this website, you are agreeing to be bound by the following terms and conditions. If you do not agree to
        these terms, please do not use this website.
      </p>

      <h3 className="text-xl font-medium mb-2">2.1. Use of the Site</h3>
      <p className="mb-4">
        You may not use the website for any illegal or unauthorized purpose. You must not, in the use of the website,
        violate any laws in your jurisdiction.
      </p>

      <h3 className="text-xl font-medium mb-2">2.2. Modifications</h3>
      <p className="mb-4">
         <b>Vehicle-care</b> reserves the right to modify or discontinue any service with or without notice at any time.
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
      <p className="mb-4">
        All content on this website, including text, graphics, logos, and images, is the property of <b>Vehicle-care</b>
         or its content suppliers and is protected by international copyright laws.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
      <p className="mb-4">
      <b>Vehicle-care</b> will not be liable for any damages arising out of or in connection with the use of this
        website. This is a comprehensive limitation of liability that applies to all damages of any kind.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
      <p className="mb-4">
        These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and you
        irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms and Conditions</h2>
      <p className="mb-4">
      <b>Vehicle-care</b> reserves the right to change these terms and conditions at any time. It is your
        responsibility to check the terms and conditions regularly for any changes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
      <p className="mb-4">
        If you have any questions about these Terms and Conditions, please contact us at [Your Contact Information].
      </p>
      <Button gradientMonochrome="teal">Accept</Button>
    </Card>
  </div>
};

export default TermsConditions;