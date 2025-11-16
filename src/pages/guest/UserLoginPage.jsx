import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../features/userAuthSlice";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const UserLoginPage = () => {
  const[username, setUsername]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    
    dispatch(userLogin({ userName:username, userEmail: email }));
    
    
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-soft-white p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-heading text-center text-gold mb-2">
          Welcome to Serenity
        </h1>
        <p className="text-center font-body text-gray-600 mb-8">
          Please sign in to continue
        </p>
        <form onSubmit={handleLogin} className="space-y-6">

        <div>
            <label className="block text-sm font-body font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserLoginPage;