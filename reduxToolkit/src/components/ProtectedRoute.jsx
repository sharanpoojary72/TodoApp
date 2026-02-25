// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { token } = useSelector((state) => state.auth);

    // Rigorous Check: Token must exist AND not be the literal string "undefined"
    const isActuallyLoggedIn = token && token !== 'undefined' && token !== 'null';

    return isActuallyLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;