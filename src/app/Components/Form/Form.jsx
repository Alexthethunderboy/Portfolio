"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const notify = () => {
    toast('🦄 Message sent!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
  };
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const form = useRef();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChange1 = (e) => {
    setValue1(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };
  const handleChange3 = (e) => {
    setValue3(e.target.value);
  };
  const sendEmail = (e) => {
    setValue("");
    setValue1("");
    setValue2("");
    setValue3("");
    e.preventDefault();

    emailjs
      .sendForm("service_tzcu777", "template_4ao44pg", form.current, {
        publicKey: "7iXe6bVRtr4aLWbG_",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <motion.div
      initial={{ y: "20vh" }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <form
        action=""
        ref={form}
        onSubmit={sendEmail}
        className="w-[100%] flex justify-center"
      >
        <div className="flex flex-col justify-center gap-5 rounded-xl md:border-2 border-blue-900 p-10 border-none md:border-solid">
          <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 text-center">
            Send a message
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-2">
            <input
              type="text"
              name="user_name"
              value={value}
              onChange={handleChange}
              placeholder="First Name"
              className="border-2 border-blue-900 bg-transparent text-gray-500 rounded-lg p-2"
            />
            <input
              type="text"
              name="user_l_name"
              value={value1}
              onChange={handleChange1}
              placeholder="Last Name"
              className="border-2 border-blue-900 bg-transparent text-gray-500 rounded-lg p-2"
            />
          </div>
          <input
            type="email"
            name="user_email"
            value={value2}
            onChange={handleChange2}
            placeholder="Email"
            className="border-2 border-blue-900 bg-transparent text-gray-500 rounded-lg p-2"
          />
          <textarea
            placeholder="Enter message"
            id=""
            cols="30"
            rows="10"
            name="message"
            value={value3}
            onChange={handleChange3}
            className="border-2 border-blue-900 bg-transparent text-gray-500 rounded-lg p-2"
          ></textarea>
          <input
            type="submit"
            value={"Send"}
            onClick={notify}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-semibold"
          />
          <ToastContainer
            // position="top-right"
            // autoClose={5000}
            // hideProgressBar={false}
            // newestOnTop={false}
            // closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
            // theme="dark"
            // transition="Bounce"
          />
        </div>
      </form>
    </motion.div>
  );
};

export default Form;
