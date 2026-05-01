import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;