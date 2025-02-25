import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectRoutesProps = {
  children: ReactNode;
};

const ProtectRoutes = ({ children }: ProtectRoutesProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [user, navigate, location]);

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectRoutes;
