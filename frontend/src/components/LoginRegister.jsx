import React, { useState } from "react";
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";

import { VscEyeClosed,VscEye } from "react-icons/vsc";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {bookride} from "../assets/index"
import { Link } from "react-router-dom";
import { signup } from "../api/api";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";


export const LoginRegister = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [passwordi, setPasswordi] = useState("");
  const [confirmPasswordi, setConfirmPasswordi] = useState("");

  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(LoginEmail, LoginPassword, navigate);

      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password length validation
    if (passwordi.length < 7) {
      setErrorMessage("Password must be at least 8 characters long.");
      console.log(password.length,"length")
      return;
    }

    // Password match validation
    if (passwordi !== confirmPasswordi) {

      setErrorMessage("Passwords do not match!");
      return;
    }

    // If all validations pass, clear the error message
    setErrorMessage("");

    // Create an object with the form data
    const userData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      passwordi,
      billingAddress,
      city,
      postcode,
      country,
    };

    try {
      // Send the signup request with the user data
      const response = await signup(userData);

      // Clear all the form fields after successful signup
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPasswordi("");
      setConfirmPasswordi("");
      setBillingAddress("");
      setCity("");
      setPostcode("");
      setCountry("");
    } catch (error) {
      // Log the error if signup fails
      console.error("Signup failed:", error);
    }
  };

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); // Toggle between true and false
};
const togglePasswordVisibilityi = () => {
  setShowPassword1(!showPassword1); // Toggle between true and false
};
const toggleLoginPasswordVisibility = () => {
  setShowLoginPassword(!showLoginPassword); // Toggle between true and false
};

  /* Shared input class for consistency */
  const inputBaseClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-[#333333] placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFCA09]/40 focus:border-[#FEB601] focus:bg-white hover:border-gray-300";

  return (
    <div
      className="bg-white rounded-2xl -mt-6 md:-mt-16 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-5 sm:p-8 lg:p-10 max-w-5xl mx-auto"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight">
          TAXIGO
        </h1>
        <p className="text-[#888888] text-base sm:text-lg mt-1 font-medium">
          Login / Register
        </p>
        <p className="text-sm text-[#BDBDBD] max-w-xl mt-4 leading-relaxed">
          If you have booked before, an account will have been created for you.
          If you are unsure of this account's credentials, select Reset Password
          below.
        </p>
      </div>

      {/* ===================== LOGIN SECTION ===================== */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center flex-shrink-0">
            <FaSignInAlt className="text-[#FFCA09] text-sm" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
            Existing User Login
          </h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="max-w-md mx-auto space-y-5">
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                E-mail *
              </label>
              <input
                type="email"
                placeholder="Email@yahoo.com"
                className={inputBaseClass}
                value={LoginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="********"
                  className={inputBaseClass + " pr-12"}
                  value={LoginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleLoginPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FEB601] transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
                >
                  {showLoginPassword ? (
                    <VscEyeClosed className="h-5 w-5" />
                  ) : (
                    <VscEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-8">
            <Link to="/forget-password" className="w-full sm:w-auto">
              <button
                type="button"
                className="bg-[#000000] text-[#FFCA09] font-semibold text-sm sm:text-base px-6 py-3 rounded-lg flex w-full sm:w-[220px] items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1a1a1a] hover:shadow-lg active:scale-[0.98]"
              >
                Forget Password
                <FaLock className="text-sm" />
              </button>
            </Link>
            <Link to="/profile" className="w-full sm:w-auto">
              <button
                type="submit"
                onClick={handleLogin}
                className="bg-[#FEB601] text-[#111111] font-semibold text-sm sm:text-base px-6 py-3 rounded-lg flex w-full sm:w-[220px] items-center justify-center gap-2 transition-all duration-200 hover:bg-[#FFCA09] hover:shadow-lg active:scale-[0.98]"
              >
                Log In
                <FaSignInAlt className="text-sm" />
              </button>
            </Link>
          </div>
        </form>
      </div>

      {/* ===================== DIVIDER ===================== */}
      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200"></div>
        <span className="text-xs uppercase tracking-widest text-[#BDBDBD] font-semibold px-2">
          or register
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200"></div>
      </div>

      {/* ===================== REGISTRATION SECTION ===================== */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#FEB601] flex items-center justify-center flex-shrink-0">
            <FaUserPlus className="text-[#111111] text-sm" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
            New User Registration
          </h2>
        </div>
        <p className="text-sm text-[#BDBDBD] mb-8 leading-relaxed">
          If you are a <strong className="text-[#999999]">New User/Customer</strong>, fill all the details
          and an account will be created for you.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* First Name */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                First Name *
              </label>
              <input
                type="text"
                placeholder="John"
                className={inputBaseClass}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Doe"
                className={inputBaseClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Mobile Number *
              </label>
              <PhoneInput
                country="US"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                placeholder="+44 12345679"
                inputClass="custom-phone-input"
                containerClass="custom-phone-container"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                E-mail *
              </label>
              <input
                type="email"
                placeholder="Email@yahoo.com"
                className={inputBaseClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className={inputBaseClass + " pr-12"}
                  value={passwordi}
                  onChange={(e) => setPasswordi(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FEB601] transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
                >
                  {showPassword ? (
                    <VscEyeClosed className="h-5 w-5" />
                  ) : (
                    <VscEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - FIXED: was type="pas", now correctly toggles "text"/"password" */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  placeholder="********"
                  className={inputBaseClass + " pr-12"}
                  value={confirmPasswordi}
                  onChange={(e) => setConfirmPasswordi(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibilityi}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FEB601] transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
                >
                  {showPassword1 ? (
                    <VscEyeClosed className="h-5 w-5" />
                  ) : (
                    <VscEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="md:col-span-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Billing Address - full width */}
            <div className="md:col-span-2">
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Billing Address
              </label>
              <input
                type="text"
                placeholder="Billing Address"
                className={inputBaseClass}
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="London"
                className={inputBaseClass}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            {/* Postcode */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Postcode
              </label>
              <input
                type="text"
                placeholder="SW1A 1AA"
                className={inputBaseClass}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-[#FEB601] font-semibold text-sm uppercase tracking-wider mb-2">
                Country
              </label>
              <input
                type="text"
                placeholder="United Kingdom"
                className={inputBaseClass}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Registration buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-10">
            <button
              type="submit"
              className="bg-[#000000] text-[#FFCA09] font-semibold text-sm sm:text-base px-6 py-3 rounded-lg flex w-full sm:w-[220px] items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1a1a1a] hover:shadow-lg active:scale-[0.98]"
            >
              Book A Ride
              <img src={bookride} alt="Book a ride" className="ml-1 h-5 w-5 object-contain" />
            </button>
            <button
              type="submit"
              className="bg-[#FEB601] text-[#111111] font-semibold text-sm sm:text-base px-6 py-3 rounded-lg flex w-full sm:w-[220px] items-center justify-center gap-2 transition-all duration-200 hover:bg-[#FFCA09] hover:shadow-lg active:scale-[0.98]"
            >
              Register
              <FaUserPlus className="text-sm" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
