import React, { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import default styles
import { contactUsApi } from "../api/api";
import LiveChatAdmin from "../pages/LiveChat";
// import Chat from "./LiveChat/Chat";
import Chat from '../assets/Chat.svg';
import send_msg from '../assets/send_msg.svg';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Allow other fields to update correctly
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      mobileNumber: value,
    });
  };

  const [liveChat, setLiveChat] = useState(false);
  const handleLiveChat = () => {
    setLiveChat(true);
  };
  const handleClose = () => {
    setLiveChat(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      contactUsApi(formData)
    }
    catch (error) {
      console.log(error);
      }
  };

  const inputBaseClass =
    "w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base bg-gray-50 outline-none placeholder-gray-400";

  return (
    <div className="min-h-screen white py-12 max-w-6xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container mx-auto mt-[-4rem] md:mt-[-7rem] px-0">
        <div className="bg-white rounded-2xl -mt-6 md:-mt-16 shadow-xl p-8 md:p-12 w-full lg:w-[100%] mx-auto">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold mb-1 text-black tracking-tight">TAXIGO</h2>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-medium text-gray-700">Contact Us</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FFCA09] to-transparent rounded-full" />
          </div>

          {/* Live Chat CTA */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 md:p-8 mb-10 text-center">
            <p className="text-white/80 mb-4 text-sm md:text-base">
              Get help from the expert Onward Travel Solutions staff 24/7 using our LiveChat below.
            </p>
            <button
              onClick={handleLiveChat}
              className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-bold text-lg md:text-xl text-black mx-auto shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
                transition: "all 0.3s ease",
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(255, 202, 9, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Live Chat With An Operator Now
              <img src={Chat} alt="" className="h-6 md:h-7" />
            </button>
          </div>

          {/* Description */}
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            If you have a query relating to your booking, account, or need support then submit an enquiry below. A member of the Customer Service team will investigate and get back to you as soon as possible. For security purposes please do not enter any credit card information into the boxes below.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  First Name <span className="text-[#FFAE00]">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className={inputBaseClass}
                  style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FFCA09";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255, 202, 9, 0.15)";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Last Name <span className="text-[#FFAE00]">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={inputBaseClass}
                  style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FFCA09";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255, 202, 9, 0.15)";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Mobile Number <span className="text-[#FFAE00]">*</span>
              </label>
              <PhoneInput
                required
                defaultCountry="US"
                value={formData.phone_number}
                onChange={handlePhoneChange}
                placeholder="+44 12345679"
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 text-base"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email <span className="text-[#FFAE00]">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email@example.com"
                className={inputBaseClass}
                style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFCA09";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255, 202, 9, 0.15)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
              />
            </div>

            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Message <span className="text-[#FFAE00]">*</span>
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Type your message here..."
                className={`${inputBaseClass} h-44 resize-none`}
                style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFCA09";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255, 202, 9, 0.15)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-4 px-10 rounded-xl font-bold text-lg text-black mx-auto shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
                transition: "all 0.3s ease",
                minWidth: "250px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(255, 202, 9, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Send Message
              <img src={send_msg} alt="" className="w-4 mt-0.5"/>
            </button>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12 mb-4">
              {/* Write Us Card */}
              <div
                className="bg-gray-50 border border-gray-100 rounded-xl p-6"
                style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFCA09] flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <h4 className="font-bold text-[#FEB601] text-base">Write Us</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">Airport Taxi Travel Solutions Ltd</p>
                <p className="text-gray-500 text-sm leading-relaxed">3, Viking House, Cheddar Business Park</p>
                <p className="text-gray-500 text-sm leading-relaxed">Wedmore Road, Cheddar</p>
                <p className="text-gray-500 text-sm leading-relaxed">BS27 3EB</p>
              </div>

              {/* Call Us Card */}
              <div
                className="bg-gray-50 border border-gray-100 rounded-xl p-6"
                style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFCA09] flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <h4 className="font-bold text-[#FEB601] text-base">Call Us</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <span className="text-gray-600 font-medium">United Kingdom:</span> 0203 4788892
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <span className="text-gray-600 font-medium">International:</span> 0044 203 4788892
                </p>
              </div>
            </div>

            {/* Live Chat Modal */}
            {liveChat && (
              <div className="fixed inset-0 z-50">
                <div
                  className="fixed inset-0 bg-black bg-opacity-70"
                  onClick={handleClose}
                ></div>

                <div className="flex justify-center items-center min-h-screen">
                  <LiveChatAdmin onClose={handleClose} />
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
