import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const useLogout = () => {
    let navigate = useNavigate()
    return ()=> {
        toast.error('Logout Successfully')
        sessionStorage.clear()
        // sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('Role')
        sessionStorage.removeItem('Id')
        navigate('/')
    }
}
