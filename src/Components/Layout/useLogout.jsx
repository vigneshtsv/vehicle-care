import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const useLogout = () => {
    let navigate = useNavigate()

    return ()=> {
        toast.error('Logout Successfully')
        sessionStorage.clear()
        navigate('/')
    }
}