import React from 'react'
import TopBar from '../Components/UserComponents/TopBar'
import Footer from '../Components/UserComponents/Footer'
import { Card, Carousel } from "flowbite-react";


function PetrolStationDashboard() {
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
     
     <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 justify-center">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* This month revenue */}
        <Card href="#" className="max-w-sm">
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           TOTAL REVENUE
         </h5>
         <div className='flex flex-row justify-between'>
          <div>10.10</div>
          <div>RS.100</div>
         </div>
         <div className='flex flex-row justify-between'>
          <span>Liters</span>
          <span>Amount</span>
         </div>
       </Card>

        {/* This week revenue */}
        <Card href="#" className="max-w-sm">
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           THIS MONTH REVENUE
         </h5>
         <div className='flex flex-row justify-between'>
          <div>10.10</div>
          <div>RS.100</div>
         </div>
         <div className='flex flex-row justify-between'>
          <span>Liters</span>
          <span>Amount</span>
         </div>
       </Card>

       {/* Today revenue */}
       <Card href="#" className="max-w-sm">
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           TODAY REVENUE
         </h5>
         <div className='flex flex-row justify-between'>
           <div>10.10</div>
           <div>RS.100</div>
         </div>
         <div className='flex flex-row justify-between'>
           <span>Liters</span>
           <span>Amount</span>
         </div>
       </Card>
      </div>
    </div>
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

export default PetrolStationDashboard