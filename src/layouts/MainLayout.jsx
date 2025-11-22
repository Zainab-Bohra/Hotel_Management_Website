import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserNotifications from "../components/UserNotifications"; // Import this

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-beige">
      <Navbar />
      <UserNotifications /> {/* Add this here */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;