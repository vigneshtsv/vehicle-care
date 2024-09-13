import AdminDashboardPage from '../Components/adminCompponents/AdminDashboardPage.jsx';
import AdminTopBarPage from '../Components/adminCompponents/AdminTopBarPage.jsx';
import OrderList from '../Components/adminCompponents/OrderList.jsx';
import UserList from '../Components/adminCompponents/UserList.jsx';
import DashboardProfile from '../Components/Layout/DashboardProfile.jsx';
import AdminProtectedRoute from '../Components/UserComponents/AdminProtectedRoute.jsx';
import Footer from '../Components/UserComponents/Footer.jsx';
import Home from '../Components/UserComponents/Home.jsx';
import TopBar from '../Components/UserComponents/Home.jsx';
import PrivateRoute from '../Components/UserComponents/PrivateRoute.jsx';
import TermsConditions from '../Components/UserComponents/TermsConditions.jsx';
import CustomerSignup from "../UsersControl/CustomerSignup.jsx";
import DeliveryBoySignup from "../UsersControl/DeliveryBoySignup";
import LoginForm from "../UsersControl/LoginForm";
import PetrolStationSignup from "../UsersControl/PetrolStationSignup";
import ServiceManSignup from "../UsersControl/ServiceManSignup";
import SignupNavigate from "../UsersControl/SignupNavigate";



const AppRoutes = [
    {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>
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
        path: "/loginform",
        element: <LoginForm />
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
        element: <AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>
    },
    {
        path: '/admintopbarpage',
        element: <AdminProtectedRoute><AdminTopBarPage /></AdminProtectedRoute>
    },
    {
        path: '/userlist',
        element: <UserList />
    },
    {
        path: '/orderlist',
        element: <OrderList />
    },
    {
        path: 'dashboardprofile',
        element: <DashboardProfile />
    }

    
]
export default AppRoutes