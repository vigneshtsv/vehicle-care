import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const useLogout = () => {
    let navigate = useNavigate()
    return ()=> {
        toast.error('Logout Successfully')
        localStorage.clear()
        // localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('Role')
        localStorage.removeItem('Id')
        navigate('/')
    }
}
