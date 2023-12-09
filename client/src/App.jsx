import { useState } from "react";
import Login from "./Pages/user/login";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Pages/user/SignUp";
import Home from "./Pages/user/Home";
import Profile from "./Pages/user/Profile";
import ProtectedRoute from "./Pages/user/ProtectedRoute";
import AdminLogin from "./Pages/admin/AdminLogin";
import Dashboard from "./Pages/admin/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
