import { Navigate, useLocation, useNavigate } from "react-router-dom";
const ProtectedLogin = ({ isLoggedIn, children }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/home";

    if (isLoggedIn) {
        console.log(from)
        navigate(from, { replace: true })
    }
    return children;
};
export default ProtectedLogin;