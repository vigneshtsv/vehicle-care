import React from 'react'
import TopBar from '../Components/UserComponents/TopBar.jsx'
import { Card, Carousel } from 'flowbite-react'
import { Link } from 'react-router-dom'
import Footer from '../Components/UserComponents/Footer.jsx'



function CustomerDashboard() {
  return <div>
      <TopBar />
      <h1 className='text-center text-4xl m-4'>Offers and Rewards</h1>
      <div className="h-60 shadow-lg m-5">
         <Carousel>
           <img src="/src/assets/petrol-image1.jpg" alt="display image" className='w-full h-auto'/>
           <img src="/src/assets/petrol-image2.png" alt="display image" className='w-full h-auto'/>
           <img src="/src/assets/petrol-image3.png" alt="display image" className='w-full h-auto'/>
           <img src="/src/assets/petrol-image4.png" alt="display image" className='w-full h-auto'/>
           <img src="/src/assets/petrol-image5.png" alt="display image" className='w-full h-auto'/>
         </Carousel>
      </div>
        <h1 className='text-center text-4xl m-4'>Explore Our Services</h1>
      
      <div className='flex flex-row justify-between my-10'> 
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
      <p>Do you Want petrol click me</p>
      <button className='bg-blue-700 text-center p-3 text-red-100'>Click Me</button>
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
        Disel
      </h3>
      <p>Do you Want Disel click me</p>
      <button className='bg-blue-700 text-center p-3 text-red-100'>Click Me</button>
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
      <p>Do you Want Service click me</p>
      <button className='bg-blue-700 text-center p-3 text-red-100'>Click Me</button>
    </Card>
      </Link>
      </div>
      
      {/* carousel-part */}
      <div className="h-96 shadow-lg m-5">
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
}

export default CustomerDashboard