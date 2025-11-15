/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setIsModalOpen(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-deep-brown mb-2">
            Get In Touch
          </h1>
          <p className="font-body text-lg text-gray-700">
            We'd love to hear from you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="font-body text-deep-brown">
            <h3 className="text-2xl font-heading text-gold mb-4">
              Contact Information
            </h3>
            <p className="mb-2">123 Luxury Lane, Jaipur, IN</p>
            <p className="mb-2">info@serenity.com</p>
            <p className="mb-4">+91 123 456 7890</p>
            <p>
              Reach out to us for any inquiries, special requests, or feedback.
              Our team is available 24/7 to assist you.
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 bg-soft-white rounded-xl shadow-xl"
          >
            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full p-3 bg-white border border-beige rounded-lg  hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium  text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full p-3 bg-white border border-beige rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message" rows="5" value={formData.message} onChange={handleChange}
                className="w-full p-3 bg-white border border-beige rounded-lg  hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thank You!"
      >
        <p className="font-body text-gray-700 text-center">
          Your message has been sent. We will get back to you shortly.
        </p>
      </Modal>
    </>
  );
};

export default FeedbackPage;