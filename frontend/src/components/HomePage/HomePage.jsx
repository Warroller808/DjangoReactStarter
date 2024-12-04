import React from "react";
import { useAuth } from "../../contexts/AuthContext";


export default function HomePage () {
  const auth = useAuth();

  const handleLogOut = async () => {
    await auth.logout();
  };

  return (
    <div>
      <a onClick={handleLogOut}>Me déconnecter</a>
    </div>
  )
}