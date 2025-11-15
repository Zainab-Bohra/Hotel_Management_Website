import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBed,
  FaBook,
  FaUsers,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const handleLinkClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Rooms", icon: <FaBed />, path: "/admin/rooms" },
    { name: "Bookings", icon: <FaBook />, path: "/admin/bookings" },
    { name: "Guests", icon: <FaUsers />, path: "/admin/guests" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin/reports" },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-deep-brown text-beige p-6
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0
      `}
    >
      <button
        onClick={() => setIsMobileOpen(false)}
        className="absolute top-4 right-4 text-beige md:hidden"
      >
        <FaTimes size={24} />
      </button>

      <h2 className="text-3xl font-heading text-gold text-center mb-10 mt-6 md:mt-0">
        Serenity
        <span className="block text-sm font-body text-beige">Admin Panel</span>
      </h2>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? "bg-gold text-soft-white" : "hover:bg-gold/20"
              }`
            }
          >
            {item.icon}
            <span className="font-body">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;