import React, { useState, useEffect } from "react";
import { getBookings } from "../api/api.js";
import { BackYellow } from "../assets/index.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const BookingItem = ({
  flight_date_time,
  car_category,
  start_point,
  end_point,
  total_price,
  image,
  id,
  user_id,
  onClick,
}) => {

  const formattedFrom = start_point ? `${start_point.name} ` : "N/A"; // Handle case if start_point is null

  const formattedTo = end_point ? `${end_point.name} ` : "N/A"; // Handle case if end_point is null
  return (
    <div
      className="bg-gradient-to-br from-gray-900 to-black rounded-2xl text-white p-5 md:p-6 mb-4 md:mb-6 border border-gray-800 cursor-pointer hover:shadow-xl hover:border-[#FFCA09]/30 transition-all duration-300 hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex-1 w-full">
          <div className="text-[#FFCA09] font-semibold text-sm md:text-lg mb-2">
            {flight_date_time}
          </div>
          <div className="font-bold text-lg md:text-2xl mb-3">
            {car_category}
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-base mb-3">
            <span className="text-[#FFCA09] font-medium text-xs md:text-base">
              From: <span className="text-white font-normal">{formattedFrom}</span>
            </span>
            <span className="text-[#FFCA09] font-medium text-xs md:text-base">
              To: <span className="text-white font-normal">{formattedTo}</span>
            </span>
          </div>
          <div className="font-bold text-xl md:text-2xl text-[#FFCA09]">
            {'\u00A3'}{total_price}
          </div>
        </div>
        <img
          src={image}
          alt={car_category}
          className="w-32 h-24 md:w-56 md:h-36 object-contain flex-shrink-0"
        />
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  if (currentPage > 3) pageNumbers.push(1);
  if (currentPage > 4) pageNumbers.push("...");

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 2) pageNumbers.push("...");
  if (currentPage < totalPages - 1) pageNumbers.push(totalPages);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Only show left arrow if totalPages is 4 or more */}
      {totalPages > 3 && (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white text-[#FFAE00] font-bold border-2 border-gray-200 hover:border-[#FFCA09] hover:bg-[#FFCA09]/5 transition-all duration-200"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      )}
      {/* Render the page numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="w-9 h-9 flex items-center justify-center text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
              page === currentPage
                ? "bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] text-black shadow-md"
                : "bg-white text-gray-600 border-2 border-gray-200 hover:border-[#FFCA09] hover:bg-[#FFCA09]/5"
            }`}
          >
            {page}
          </button>
        )
      )}
      {/* Only show right arrow if totalPages is 4 or more */}
      {totalPages > 3 && (
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white text-[#FFAE00] font-bold border-2 border-gray-200 hover:border-[#FFCA09] hover:bg-[#FFCA09]/5 transition-all duration-200"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      )}
    </div>
  );
};


const ViewBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageConfirmed, setCurrentPageConfirmed] = useState(1);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      Swal.fire({
        title: 'Loading...',
        text: 'Fetching bookings, please wait.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      try {
        const response = await getBookings();

        if (response.data && Array.isArray(response.data)) {
          setRides(response.data); // Store fetched rides in state
        } else {
          setRides([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(rides.length / itemsPerPage));
  }, [rides]);

  const getCurrentPageItems = (status) => {
    const startIndex =
      (status === "pending"
        ? currentPagePending - 1
        : currentPageConfirmed - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rides
      .filter((ride) => ride.booking_status === status)
      .slice(startIndex, endIndex)
      .map((ride) => ({
        ...ride,
        image: require(`../../public/cars/${ride.image}`), // {{ edit_1 }} Map image name to asset path
      }));
  };
  const navigate = useNavigate();

  const handlePendingBookings = (id, user_id) => {
    navigate(`/order-summary?user_id=${user_id}&bid=${id}`);
  };

  return (
    <div className="space-y-6 md:space-y-8 font-[Poppins]">
      {/* Pending Rides Section */}
      <div className="bg-white rounded-2xl -mt-6 md:-mt-16 shadow-lg border border-gray-100 p-6 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 px-2 md:px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">TAXIGO</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-1 w-10 bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] rounded-full"></div>
            <h2 className="text-lg md:text-xl font-medium text-gray-500">Pending Rides</h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-10 h-10 border-4 border-[#FFCA09]/30 border-t-[#FFCA09] rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 font-medium">Loading rides...</p>
          </div>
        ) : rides.filter((ride) => ride.booking_status === "pending").length ===
          0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-400">No Pending Rides</h3>
            <p className="text-sm text-gray-400 mt-1">Your pending bookings will appear here</p>
          </div>
        ) : (
          getCurrentPageItems("pending").reverse().map((ride, index) => (
            <BookingItem key={index} {...ride}
              onClick={() => handlePendingBookings(ride.bid, ride.user_id)} />
          ))
        )}
        <Pagination
          currentPage={currentPagePending}
          totalPages={Math.ceil(
            rides.filter((ride) => ride.booking_status === "pending").length /
            itemsPerPage
          )} // {{ edit_1 }} Corrected filter for pending rides
          onPageChange={setCurrentPagePending}
        />
      </div>

      {/* Confirmed Rides Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 px-2 md:px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">TAXIGO</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-1 w-10 bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] rounded-full"></div>
            <h2 className="text-lg md:text-xl font-medium text-gray-500">Confirmed Rides</h2>
          </div>
        </div>

        {rides.filter((ride) => ride.booking_status !== "pending").length ===
          0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-400">No Confirmed Rides</h3>
            <p className="text-sm text-gray-400 mt-1">Your confirmed bookings will appear here</p>
          </div>
        ) : (
          getCurrentPageItems("confirmed").reverse().map((ride, index) => (
            <BookingItem key={index} {...ride} />
          ))
        )}
        <Pagination
          currentPage={currentPageConfirmed} // {{ edit_8 }} Use separate state for confirmed pagination
          totalPages={Math.ceil(
            rides.filter((ride) => ride.booking_status !== "pending").length /
            itemsPerPage
          )} // {{ edit_9 }} Calculate total pages for confirmed
          onPageChange={setCurrentPageConfirmed} // {{ edit_10 }} Update pagination handler
        />
        <div className="flex justify-center mt-6">
          <Link to="/profile" className="w-full sm:w-auto flex justify-center">
            <button className="bg-black text-[#FEB601] py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 w-full sm:w-[320px] md:w-[400px] hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Back
              <img src={BackYellow} alt="Back" className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
