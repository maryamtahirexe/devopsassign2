import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { API } from "../../utils/api.js";
import logo from "../../assets/images/logo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/owner/signin", formData);

      if (response.data.owner) {
        setPopupMessage("Sign in successful!");
        setNavigateToDashboard(true);
      } else {
        setPopupMessage("Authentication failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      setPopupMessage(errorMessage);
    }
  };

  const handlePopupClose = () => {
    setPopupMessage(null);
    if (navigateToDashboard) {
      navigate("/dashboard", { state: { owner: formData } });
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-20 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-600 mb-4">Sign in to continue</p>
        <form className="w-full" onSubmit={handleSignIn}>
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="text-black placeholder-gray-900 bg-white border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="text-black placeholder-gray-900 bg-white border border-gray-300 p-2 rounded-md"
          />
          <div className="mt-6 w-full">
            <Button text="Login" className="w-full bg-blue-600 hover:bg-blue-700" />
          </div>
        </form>
      </div>

      {popupMessage && (
        <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <Button text="OK" onClick={handlePopupClose} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export { SignIn };
