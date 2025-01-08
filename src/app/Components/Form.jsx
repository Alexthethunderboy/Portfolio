"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './toastStyles.css';

const Form = () => {
  const notify = () => toast.success('Message sent successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const [formData, setFormData] = useState({
    user_name: "",
    user_l_name: "",
    user_email: "",
    message: ""
  });

  const form = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_tzcu777", "template_4ao44pg", form.current, {
        publicKey: "7iXe6bVRtr4aLWbG_",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          notify();
          setFormData({
            user_name: "",
            user_l_name: "",
            user_email: "",
            message: ""
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          toast.error(`Failed to send message: ${error.text}`);
          toast.error('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Send a Message
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-400 focus:border-pink-400 focus:outline-none text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="user_l_name"
            value={formData.user_l_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-400 focus:border-pink-400 focus:outline-none text-white placeholder-gray-400"
            required
          />
        </div>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-400 focus:border-pink-400 focus:outline-none text-white placeholder-gray-400"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter message"
          rows="5"
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-400 focus:border-pink-400 focus:outline-none text-white placeholder-gray-400"
          required
        ></textarea>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-300"
        >
          Send Message
        </motion.button>
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default Form;

