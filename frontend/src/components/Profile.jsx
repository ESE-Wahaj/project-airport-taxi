import React, {useContext} from 'react'
import {bucket, logoutimg, quotes, viewbook} from '../assets/index';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';


import { FaArrowRight, FaCalendarPlus, FaCreditCard, FaPencilAlt } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { getRideHistory } from '../api/api';
import { jwtDecode } from "jwt-decode";


 const Profile = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext);

  const token = Cookies.get('authToken');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      var user_Id = decodedToken.id ;

    } catch (error) {
      console.error("Invalid token", error);
    }
  } else {
    console.log("No token found in cookies.");
  }
  const managecard=()=>{
    navigate(`/manage-card/${user_Id}`)
  }
const handleLogout=()=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to logout",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      Cookies.remove('authToken');
      logout();
      navigate("/login")
    }
  })

}
const ridehistory=()=>{
  navigate("/ride-history")
}
const viewbookings=()=>{
  navigate("/view-bookings")
}
const viewQuote=()=>{
  navigate("/quotes-history")
}

  return (

    <div
      className='bg-white mx-auto mt-[-4rem] rounded-2xl shadow-xl max-w-5xl'
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 rounded-t-2xl px-8 py-8 md:px-12 md:py-10">
        <h1 className='font-bold text-3xl md:text-4xl text-[#FFCA09] tracking-tight'>TAXIGO</h1>
        <h5 className='text-lg md:text-xl mt-1 text-white/80 font-light'>Your Profile Dashboard</h5>
      </div>

      <div className="px-6 py-8 md:px-12 md:py-10">
        {/* Intro */}
        <div className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5 md:p-6 border border-amber-100">
          <h4 className='font-semibold text-base md:text-lg text-gray-800 leading-relaxed'>
            From here you can manage Bookings you've made, create new bookings, or change your account information.
          </h4>
        </div>

        {/* Rides History Section */}
        <div className="mb-8 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100"
          style={{ transition: "box-shadow 0.3s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFCA09] flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h4 className='font-bold text-lg text-gray-800'>Rides History</h4>
          </div>
          <p className='text-gray-500 text-sm md:text-base mb-4 leading-relaxed'>
            Access your Rides history to see all your previous rides and other ride details.
          </p>
          <button
            onClick={ridehistory}
            className="text-black py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full md:w-auto md:min-w-[280px] text-sm md:text-base shadow-md"
            style={{
              background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            Rides History <img src={bucket} className='w-5 h-5' alt="" />
          </button>
        </div>

        {/* Manage Bookings Section */}
        <div className="mb-8 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100"
          style={{ transition: "box-shadow 0.3s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFCA09] flex items-center justify-center shadow-sm">
              <FaCalendarPlus className="w-4 h-4 text-black" />
            </div>
            <h4 className='font-bold text-lg text-gray-800'>Manage Your Bookings</h4>
          </div>
          <p className='text-gray-500 text-sm md:text-base mb-4 leading-relaxed'>
            You can make amendments to your bookings up until 24 hours before your journey is due to start. You can also download copies of receipts for previous bookings here.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <Link to='/' className="block">
              <button
                className='text-black py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full text-sm md:text-base shadow-md'
                style={{
                  background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Make a Booking <FaCalendarPlus className="w-4 h-4" />
              </button>
            </Link>
            <button
              onClick={viewbookings}
              className='text-black py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full text-sm md:text-base shadow-md'
              style={{
                background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              View Bookings <img src={viewbook} className='w-5 h-5' alt="" />
            </button>
          </div>
        </div>

        {/* Recover Quotes Section */}
        <div className="mb-8 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100"
          style={{ transition: "box-shadow 0.3s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFCA09] flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h4 className='font-bold text-lg text-gray-800'>Recover Your Quotes</h4>
          </div>
          <p className='text-gray-500 text-sm md:text-base mb-4 leading-relaxed'>
            If we have previously quoted for a journey you can select the quote here and proceed with booking. You can also call us with the reference number from your quote and continue your booking over the phone.
          </p>
          <button
            onClick={viewQuote}
            className='text-black py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full md:w-auto md:min-w-[280px] text-sm md:text-base shadow-md'
            style={{
              background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            View Quotes <img src={quotes} className='w-5 h-5' alt="" />
          </button>
        </div>

        {/* Payment Methods Section */}
        <div className="mb-8 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100"
          style={{ transition: "box-shadow 0.3s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFCA09] flex items-center justify-center shadow-sm">
              <FaCreditCard className="w-4 h-4 text-black" />
            </div>
            <h4 className='font-bold text-lg text-gray-800'>Manage Payment Methods</h4>
          </div>
          <p className='text-gray-500 text-sm md:text-base mb-4 leading-relaxed'>
            If you have previously saved cards while booking online you may review and remove them here.
          </p>
          <button
            onClick={managecard}
            className='text-black py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full md:w-auto md:min-w-[280px] text-sm md:text-base shadow-md'
            style={{
              background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            Card Details <FaCreditCard className="w-4 h-4" />
          </button>
        </div>

        {/* Update Details / Account Section */}
        <div className="mb-4 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100"
          style={{ transition: "box-shadow 0.3s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFCA09] flex items-center justify-center shadow-sm">
              <FaPencilAlt className="w-4 h-4 text-black" />
            </div>
            <h4 className='font-bold text-lg text-gray-800'>Update Your Details</h4>
          </div>
          <p className='text-gray-500 text-sm md:text-base mb-4 leading-relaxed'>
            Keeping your details up to date helps us contact you in the event of a problem with your booking. You may also change your password here.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <button
              onClick={handleLogout}
              className='bg-black text-[#FFCA09] py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full text-sm md:text-base shadow-md'
              style={{
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Log Out <img src={logoutimg} className='w-4 h-4' alt="" />
            </button>
            <Link to='/edit-profile' className="block">
              <button
                className='text-black py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 w-full text-sm md:text-base shadow-md'
                style={{
                  background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Edit Profile <FaPencilAlt className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile