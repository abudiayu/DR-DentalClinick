import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  allowedRoles: string[];
};

function getUser(): { role: string } | null {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export default function ProtectedRoute({ allowedRoles }: Props) {
  const location = useLocation();
  const user = getUser();

  // Not logged in: send to login and remember where they wanted to go
  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  // Logged in but wrong role: send to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}