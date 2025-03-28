import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOutSuccess } from "../../Redux/Slice/authSlice";


export const useLogout = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    return ()=> {
        toast.error('Logout Successfully')
        sessionStorage.clear()
        navigate('/')
        dispatch(signOutSuccess())
    }
}
