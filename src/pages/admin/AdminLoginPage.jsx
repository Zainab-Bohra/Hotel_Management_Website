/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Get credentials from .env
  const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === adminUser && password === adminPass) {
      dispatch(login());
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-brown">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-soft-white p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-heading text-center text-gold mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">
              Username (Email)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-white border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm font-body">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;