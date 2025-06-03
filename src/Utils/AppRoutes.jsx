import AdminTopBarPage from '../Components/adminCompponents/AdminTopBarPage.jsx';
import OrderList from '../Components/adminCompponents/OrderList.jsx';
import UserList from '../Components/adminCompponents/UserList.jsx';
import DashboardProfile from '../Components/Layout/DashboardProfile.jsx';
import Footer from '../Components/UserComponents/Footer.jsx';
import TopBar from '../Components/UserComponents/Home.jsx';
import CustomerSignup from "../UsersControl/CustomerSignup.jsx";
import DeliveryBoySignup from "../UsersControl/DeliveryBoySignup";
import PetrolStationSignup from "../UsersControl/PetrolStationSignup.jsx";
import ServiceManSignup from "../UsersControl/ServiceManSignup";
import SignupNavigate from "../UsersControl/SignupNavigate";
import ForgotPassword from '../Components/UserComponents/ForgotPassword.jsx';
import TermsConditions from '../Components/Layout/TermsConditions.jsx';
import AdminDashboardPage from '../Components/adminCompponents/AdminDashboardPage.jsx';
import CustomerDashboard from '../Pages/CustomerDashboard.jsx';
import DeliveryBoyDashboard from '../Pages/DeliveryBoyDashboard.jsx';
import PetrolStationDashboard from '../Pages/PetrolStationDashboard.jsx';
import ServiceManDashboard from '../Pages/ServiceManDashboard.jsx';
import LoginForm from '../UsersControl/LoginForm.jsx';
import MapPage from '../Components/Layout/MapPage.jsx';
import Search from '../Components/Layout/Search.jsx';
import { CarouselOne } from '../Components/Layout/CarouselOne.jsx';
import OrderTracking from '../Components/Layout/OrderTracking.jsx';
import MyOrders from '../Components/UserComponents/MyOrders.jsx';
import AdminProtectedRoute from '../Components/ProdutedRoutes/AdminProtectedRoute.jsx';
import { Outlet } from 'react-router-dom';
import DeletePart from '../Components/adminCompponents/DeletePart.jsx'


const AppRoutes = [
    {
        path: "/",
        element: <LoginForm />
        // <PrivateRoute><LoginForm /></PrivateRoute>
    },
    {
        path: "/signupnavigate",
        element: <SignupNavigate />
    },
    {
        path: "/customersignup",
        element: <CustomerSignup />
    },
    {
        path: "/deliveryboysignup",
        element: <DeliveryBoySignup />
    },
    {
        path: "/petrolstationsignup",
        element: <PetrolStationSignup />
    },
    {
        path: "/servicemansignup",
        element: <ServiceManSignup />
    },
    {
        path: "/footer",
        element: <Footer />
    },
    {
        path: "/topbar",
        element: <TopBar />
    },
    {
        path: "/termsconditions",
        element: <TermsConditions />
    },
    {
        path: '/admindashboardpage',
        element: <AdminDashboardPage />
    },
    {
        path: '/admintopbarpage',
        element: <AdminTopBarPage />
    },
    {
        path: '/admindashboardpage/userlist',
        element: <UserList />
    },
    {
        path: '/admindashboardpage/orderlist',
        element: <OrderList />
    },
    {
        path: '/dashboardprofile',
        element: <DashboardProfile />
    },
    {
        path: '/forgotpassword',
        element: <ForgotPassword />
    },
    {
        path: '/customerdashboard',
        element: <CustomerDashboard />
    },
    {
        path: '/deliveryboydashboard',
        element: <DeliveryBoyDashboard />
    },
    {
        path: '/petrolstationdashboard',
        element: <PetrolStationDashboard />
    },
    {
        path: '/servicemandashboard',
        element: <ServiceManDashboard />
    },
    {
        path:'/mappage',
        element:<MapPage />
    },
    {
        path:'/ordertracking',
        element:<OrderTracking />
    },
    {
        path:'/carouselone',
        element:<CarouselOne />
    },
    {
        path:'/search',
        element:<Search />
    },
    {
        path:'/myorders',
        element:<MyOrders />
    },
    {
        path:'/deletepart',
        element:<DeletePart />
    }

]
export default AppRoutes;