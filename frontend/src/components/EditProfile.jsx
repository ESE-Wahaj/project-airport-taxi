import React, { useEffect, useState } from "react";
import { IoIosCloudDone } from "react-icons/io";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { editProfileApi } from "../api/api";
import { getUserById } from "../api/api";
import { BackYellow } from "../assets/index.js";
import { Link } from "react-router-dom";
import backgone from "../assets/backgone.svg";
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });
  const handleChange = (e) => {
   console.log( e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData)
  useEffect(() => {
    const getUser = async () => {
      const response = await getUserById();
      setFormData(response);
    };
    getUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfileApi(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const inputClass = "w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400";

  return (
    <div className="min-h-screen mt-[-3rem] bg-gray-100 py-12 relative font-[Poppins]">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl -mt-6 md:-mt-16 shadow-lg border border-gray-100 p-6 sm:p-8 md:p-10 w-full lg:w-[80%] xl:w-[60%] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              TAXIGO
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-1 w-10 bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] rounded-full"></div>
              <p className="text-lg font-medium text-gray-500">Edit Profile</p>
            </div>
          </div>

          <p className="text-center text-gray-500 mb-8 text-sm">Update your details like name, email, address, city, etc.</p>

          <form onSubmit={handleSubmit} className="space-y-0">
            {/* Name Fields - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Contact Fields - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  Mobile Number *
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+44 123456789"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email@yahoo.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                Billing Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="1234 Elm St"
                className={inputClass}
                required
              />
            </div>

            {/* City, Post Code, Country - Three Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  Post Code *
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="12345"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#FEB601]">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United Kingdom"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/profile" className="w-full sm:w-auto flex justify-center">
                <button className="w-full sm:w-[260px] bg-black text-[#FEB601] py-3 px-6 text-lg font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                  Back
                  <img
                    src={BackYellow}
                    alt="Back"
                    className="w-4 h-4"
                  />
                </button>
              </Link>
              <button className="w-full sm:w-[280px] bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] text-black py-3 px-6 text-lg font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 mx-auto sm:mx-0">
                Update
                <IoIosCloudDone className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
