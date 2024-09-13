import React from 'react'
import { Card, Carousel } from "flowbite-react";
import TopBar from '../UserComponents/TopBar';
import Footer from '../UserComponents/Footer';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <div>
         <TopBar />
      </div>
      
      <div className='flex flex-row justify-between my-20'>
        
        {/* petrol-card */}
      <div>
      <Card
      className="w-72 h-80 m-10 shadow-xl"
      imgAlt="petrol bump"
      imgSrc="../../assets"
      >
      <h3 className="text-2xl font-bold tracking-tight text-gray-900">
        Petrol
      </h3>
      <p className="font-normal text-gray-700">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
      </div>


      {/* disel-card */}
      <Link to='./topbar'>
      <Card
      className="w-72 h-80 m-10 shadow-xl"
      imgAlt="petrol bump"
      imgSrc="../../assets"
    >
      <h3 className="text-2xl font-bold tracking-tight text-gray-900">
        Disel Card
      </h3>
      <p className="font-normal text-gray-700">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
      </Link>

      {/* service-card */}
      <Link to='./sigupnavigation'>
      <Card
      className="w-72 h-80 m-10 shadow-xl"
      imgAlt="petrol bump"
      imgSrc="../../assets"
    >
      <h3 className="text-2xl font-bold tracking-tight text-gray-900">
        Service Center
      </h3>
      <p className="font-normal text-gray-700">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
      </Link>
      </div>
      
      {/* carousel-part */}
      <div className="h-96">
      <Carousel>
        <img src="/src/assets/petrol-image1.jpg" alt="display image" className='w-full h-auto'/>
        <img src="/src/assets/petrol-image2.png" alt="display image" className='w-full h-auto'/>
        <img src="/src/assets/petrol-image3.png" alt="display image" className='w-full h-auto'/>
        <img src="/src/assets/petrol-image4.png" alt="display image" className='w-full h-auto'/>
        <img src="/src/assets/petrol-image5.png" alt="display image" className='w-full h-auto'/>
      </Carousel>
    </div>
    
     <Footer />
    </div>
  )
}

export default Home;