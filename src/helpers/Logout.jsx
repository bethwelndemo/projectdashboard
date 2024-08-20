import { useNavigate } from "react-router-dom";

const ReactLogout = () => {
    const navigate = useNavigate()
    const logout = () => {
        //clear local storage
        localStorage.clear()
        //redirect to login page
        navigate('/signin')
    }
    // expor the logout function
    return {logout}
}

export default ReactLogout