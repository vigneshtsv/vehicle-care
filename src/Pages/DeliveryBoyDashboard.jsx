import React from 'react'
import TopBar from '../Components/UserComponents/TopBar'
import { Carousel } from "flowbite-react";
import { Card } from "flowbite-react"
import Footer from '../Components/UserComponents/Footer';

function DeliveryBoyDashboard() {
  return <>
  <TopBar />
  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
    <div className='flex flex-row justify-between'>
      {/* card with plan a trip */}
       <Card
         className="max-w-sm m-5"
         imgAlt="pickup"
         imgSrc=""
       >
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           Pickup
         </h5>
       </Card>
       {/* card with plan a trip */}
       <Card
         className="max-w-sm m-5"
         imgAlt="Delivery"
         imgSrc=""
       >
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             Delivery
         </h5>
       </Card>
       {/* card with plan a trip */}
       <Card
         className="max-w-sm m-5"
         imgAlt="Plan a Trip"
         imgSrc=""
       >
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           Plan a Trip
         </h5>
       </Card>
     </div>
       {/* Carousel of the photos */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
          </Carousel>
     </div>
     <Footer />
  </>
}

export default DeliveryBoyDashboard