import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import BackYellow from "../assets/BackYellow.svg";
import Continue from "../assets/continue.svg";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Passengers_details } from "../api/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const CustomDropdown = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };
  const customDatePickerStyle = {
    width: "100%", // Full width
  };
  return (
    <div className="relative">
      <div
        className="bg-gray-50 border-2 border-gray-200 text-gray-600 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer hover:border-[#FFCA09] focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
          {selectedOption || placeholder}
        </span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-2 max-h-60 overflow-auto shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-3 hover:bg-[#FFCA09]/10 text-gray-700 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PhoneNumberInput = ({ onPhoneChange }) => {
  const [selectedCode, setSelectedCode] = useState("+1"); // Default code
  const [phoneNumber, setPhoneNumber] = useState("");

  const countryCodes = ["+1", "+44", "+91", "+61", "+81", "+86", "+49"];

  const handleSelectCode = (code) => {
    setSelectedCode(code);
    onPhoneChange(phoneNumber);
    console.log("handleselectedcode",selectedCode, phoneNumber)
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    onPhoneChange(value);

  };

  return (
    <div className="flex items-center">
      <PhoneInput
        defaultCountry="US"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="+44 12345679"
        className="ml-1 w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FFCA09] focus-within:ring-2 focus-within:ring-[#FFCA09]/20 transition-all duration-200"
      />
    </div>
  );
};

const BookmeeForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [number_of_passengers, setPassengers] = useState(1);
  const [number_of_suitcases, setSuitcases] = useState(1);
  const [flight_number, setFlightNumber] = useState("");
  const [flight_arriving_from, setFlightFrom] = useState("");
  const [meet_and_greet, setMeetGreet] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [has_pet, setPet] = useState(false);
  const [two_way, setTwoway] = useState(false);
  const [userid, setuserid] = useState(null);
  const [bid, setbid] = useState(null);
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [flightError, setFlightError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [flightArrError, setFlightArrError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [SelectDateError, setSelectDateError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const componentRef = useRef(null); // Create a ref for the component

  useEffect(() => {
    const cookie=Cookies.get("authToken");
    console.log(cookie)
    if(cookie){
      setIsAuthenticated(true);
      const decoded=jwtDecode(cookie);
      setFirstName(decoded.firstname);
      setLastName(decoded.lastname);
      setEmail(decoded.email);
    }
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the start of the component
    }
  },[])

  const navigate = useNavigate();
  const { twoway, carid, lid } = useParams();
  useEffect(() => {
    if (twoway === "true") {
      setTwoway(true);
    } else if (twoway === "false") {
      setTwoway(false);
    } else {
      Swal.fire({
        title: "Error!",
        text: "journey is undefined",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [twoway]);
  const handleContinue = async (e) => {
    e.preventDefault();

    const formData = {
      car_id: parseInt(carid, 10), // Convert carid to number
      location_id: parseInt(lid, 10), //This is the dummy data. Actual data will get BookmeMap_Component
      firstname,
      lastname,
      email,
      phone_number,
      number_of_passengers,
      number_of_suitcases,
      flight_number,
      flight_arriving_from,
      meet_and_greet: meet_and_greet === "Yes" ? true : false,
      flight_date_time: selectedDate,
      has_pet: has_pet === "Yes" ? true : false,
      two_way, //This is the dummy data. Actual data will get BookmeMap_Component
      multiple_journey_disc: 300.3, //This is the dummy data. Actual data will get BookmeMap_Component
    };
    let valid = true;
    if (email === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (flight_number === "") {
      setFlightError("Flight number is required");
      valid = false;
    }
    if (phone_number === "") {
      setPhoneError("Phone number is required");
      valid = false;
    }

    if (flight_arriving_from === "") {
      setFlightArrError("Flight Arriving from  is required");
      valid = false;
    }
    if (firstname === "") {
      setFirstError("First Name is required");
      valid = false;
    }
    if (lastname === "") {
      setLastError("Last Name is required");
      valid = false;
    }
    if (selectedDate === null) {
      setSelectDateError("Date is Required");
    }
    console.log(formData);

    if (!valid) return;
    let guestQuotesIDs = [];
    try {
      const storedData = localStorage.getItem('locationIds');
      if (storedData) {
        guestQuotesIDs = JSON.parse(storedData);
      }
// console.log("guest locations",storedData)
      const form_data = {
        ...formData,
        quote_ids: guestQuotesIDs,
      };
      const res = await Passengers_details(form_data);
      setuserid(res.data.user_id);
      setbid(res.data.id);

      // console.log(res.data.user_id);
      localStorage.removeItem('locationIds');


      Swal.fire({
        title: "Success!",
        text: "Your booking details have been submitted successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigate(`/order-summary?user_id=${res.data.user_id}&bid=${res.data.id}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was a problem submitting your booking details. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto mt-[-1rem] md:mt-[-4rem] font-[Poppins]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">TAXIGO</h2>
        <div className="flex items-center gap-3 mt-2">
          <div className="h-1 w-10 bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-500">Enter Passenger Details</h3>
        </div>
      </div>

      <form onSubmit={handleContinue}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">First Name *</label>
            <input
              type="text"
              placeholder="John"
              className="bg-gray-50 border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-3 w-full focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
              value={firstname}
              disabled={isAuthenticated}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstError && (
              <p className="text-red-500 text-sm mt-1.5 font-medium">{firstError}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">Last Name *</label>
            <input
              type="text"
              placeholder="Doe"
              className="bg-gray-50 border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-3 w-full focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
              value={lastname}
              disabled={isAuthenticated}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastError && (
              <p className="text-red-500 text-sm mt-1.5 font-medium">{lastError}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">Mobile Number *</label>
            <PhoneNumberInput onPhoneChange={setPhone} />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1.5 font-medium">{phoneError}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">E-mail *</label>
            <input
              type="email"
              placeholder="Email@yahoo.com"
              className="bg-gray-50 border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-3 w-full focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
              value={email}
              disabled={isAuthenticated}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1.5 font-medium">{emailError}</p>
            )}
          </div>

          {/* Passengers */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">Passengers</label>
            <CustomDropdown
              options={[
                "1 Person",
                "2 Persons",
                "3 Persons",
                "4 Persons",
                "5 Persons",
              ]}
              placeholder="1 Person"
              onChange={(option) => setPassengers(parseInt(option, 10))}
            />
          </div>

          {/* Number of Suitcases */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">
              Number of Suitcases
            </label>
            <CustomDropdown
              options={[
                "1 Suitcase",
                "2 Suitcases",
                "3 Suitcases",
                "4 Suitcases",
                "5 Suitcases",
              ]}
              placeholder="1 Suitcase"
              onChange={(option) => setSuitcases(parseInt(option, 10))}
            />
          </div>

          {/* Flight Number */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">Flight Number</label>
            <input
              type="text"
              placeholder="DEX-001100"
              className="bg-gray-50 border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-3 w-full focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200"
              value={flight_number}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
            {flightError && (
              <p className="text-red-500 text-sm mt-1.5 font-medium">{flightError}</p>
            )}
          </div>

          {/* Flight Arriving From */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">
              Flight Arriving From
            </label>
            <input
              type="text"
              placeholder="Manchester"
              className="bg-gray-50 border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-3 w-full focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200"
              value={flight_arriving_from}
              onChange={(e) => setFlightFrom(e.target.value)}
            />
            {flightArrError && (
              <p className="text-red-500 text-sm mt-1.5 font-medium">{flightArrError}</p>
            )}
          </div>

          {/* Meet & Greet */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">
              Meet & Greet on Arrival
            </label>
            <CustomDropdown
              options={["No", "Yes"]}
              placeholder="Select"
              onChange={setMeetGreet}
            />
          </div>

          {/* Flight Arrival Date & Time */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">
              Flight Arrival Date & Time
            </label>
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="customdatapicker bg-gray-50 border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-3 w-full focus:border-[#FFCA09] focus:ring-2 focus:ring-[#FFCA09]/20 focus:outline-none transition-all duration-200"
                placeholderText="Select a date and time"
              />
            </div>
          </div>

          {/* Pet */}
          <div>
            <label className="text-sm font-semibold text-[#FEB601] block mb-2">
              Do you have a pet with you?
            </label>
            <CustomDropdown
              options={["No", "Yes"]}
              placeholder="No"
              onChange={setPet}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link to={`/fleet/${lid}`} className="w-full sm:w-auto">
            <button className="w-full sm:w-[260px] bg-black text-[#FFCA09] font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Back
              <img src={BackYellow} alt="Back Icon" className="h-3.5 w-3.5" />
            </button>
          </Link>
          <button
            onClick={handleContinue}
            className="w-full sm:w-[280px] bg-gradient-to-r from-[#FFCA09] to-[#FFAE00] text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            type="submit"
          >
            Continue
            <img src={Continue} alt="" className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookmeeForm;
