import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerSignup from './UsersControl/CustomerSignup.jsx'
import DashboardProfile from './Components/Layout/DashboardProfile.jsx'
import CustomerDashboard from './Pages/CustomerDashboard.jsx'
import DeliveryBoyDashboard from './Pages/DeliveryBoyDashboard'
import OrderTracking from './Components/Layout/OrderTracking'
import { CarouselOne } from './Components/Layout/CarouselOne'
import MyOrders from './Components/UserComponents/MyOrders'
import LoginForm from './UsersControl/LoginForm'
import AdminSignup from './UsersControl/AdminSignup'
import Footer from './Components/UserComponents/Footer'
import TopBar from './Components/UserComponents/TopBar'
import TermsAndConditions from './Components/Layout/TermsConditions'
import AdminDashboardPage from './Components/adminCompponents/AdminDashboardPage'
import AdminTopBarPage from './Components/adminCompponents/AdminTopBarPage'
import UserList from './Components/adminCompponents/UserList'
import OrderList from './Components/adminCompponents/OrderList'
import ForgotPassword from './Components/UserComponents/ForgotPassword'
import PetrolStationDashboard from './Pages/PetrolStationDashboard'
import ServiceManDashboard from './Pages/ServiceManDashboard'
import MapPage from './Components/Layout/MapPage.jsx'
import RoleBasedProtect from './Components/ProdutedRoutes/RoleBasedProtect'
import AdminsignupApproval from './UsersControl/AdminsignupApproval.jsx'
import SignupNavigate from './UsersControl/SignupNavigate.jsx'
import DeliveryBoySignup from './UsersControl/DeliveryBoySignup.jsx'
import PetrolStationSignup from './UsersControl/PetrolStationSignup.jsx'
import ServiceManSignup from './UsersControl/ServiceManSignup.jsx'

export default function App() {
  return (
    <BrowserRouter>
    {/* public Router */}
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signupnavigate' element={<SignupNavigate />} />
        <Route path='/customersignup' element={<CustomerSignup />} />
        <Route path='/deliveryboysignup' element={<DeliveryBoySignup />} />
        <Route path='/petrolstationsignup' element={<PetrolStationSignup />} />
        <Route path='/servicemansignup' element={<ServiceManSignup />} />
        <Route path='/adminsignup' element={<AdminSignup />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/topbar' element={<TopBar />} />
        <Route path='/termsconditions' element={<TermsAndConditions />} />
        <Route path='/dashboardprofile' element={<DashboardProfile />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/carouselOne' element={<CarouselOne />} />
        <Route path='/adminsignupapproval' element={<AdminsignupApproval />} />
      

        {/* admin Router */}
        <Route path='/admintopbarpage' element={<RoleBasedProtect allowedRoles={['Admin']} />}>
          <Route index element={<AdminTopBarPage />} />
        </Route>
        <Route path='/userlist' element={<RoleBasedProtect allowedRoles={['Admin']} />}>
          <Route index element={<UserList />} />
        </Route>
        <Route path='/orderlist' element={<RoleBasedProtect allowedRoles={['Admin']} />}>
          <Route index element={<OrderList />} />
        </Route>
        <Route path='admindashboardpage' element={<RoleBasedProtect allowedRoles={['Admin']} />}>
          <Route index element={<AdminDashboardPage />} />
        </Route> 

       {/* Customer Routers */}         
        <Route path="/customerdashboard" element={<RoleBasedProtect allowedRoles={['Customer', 'Admin']} />}>
           <Route index element={<CustomerDashboard />} />
        </Route>
        <Route path='/mappage' element={<RoleBasedProtect allowedRoles={['Customer','Admin']} />} >
           <Route index element={<MapPage />} />
        </Route>
        <Route path='/myorders' element={<RoleBasedProtect allowedRoles={['Customer', 'Admin']} />} >
           <Route index element={<MyOrders />} />
        </Route>

       {/* DeliveryBoy Routers */}
        <Route path='/deliveryboydashboard' element={<RoleBasedProtect allowedRoles={['DeliveryBoy', 'Admin']} />}>
          <Route index element={<DeliveryBoyDashboard />} />
        </Route>

        {/* PetrolStation Routers */} 
        <Route path='/petrolstationdashboard' element={<RoleBasedProtect allowedRoles={['PetrolStation','Admin']} />}>
         <Route index element={<PetrolStationDashboard />} />
        </Route>

        {/* ServiceMan Routers */}
        <Route path='/servicemandashboard' element={<RoleBasedProtect allowedRoles={['ServiceMan', 'Admin']} />}>
          <Route index element={<ServiceManDashboard />} />
        </Route>

        {/* ServiceMan and DeliveryBoy Order Tracking */}
        <Route path='/ordertracking' element={<RoleBasedProtect allowedRoles={['ServiceMan','Admin','DeliveryBoy']} />}>
          <Route index element={<OrderTracking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
