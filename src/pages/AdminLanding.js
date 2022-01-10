import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import Login from "./Login";

const AdminLanding = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(localStorage.getItem("user"));
  }, []);

  return !state ? <Login /> : <HomePage />;
};

export default AdminLanding;
