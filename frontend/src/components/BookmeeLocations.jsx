import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import BluePin from "../assets/BluePin.svg";
import RedArrow from "../assets/RedArrow.svg";
import Plus from "../assets/Plus.svg";
import Minus from "../assets/Minus.svg";
import Line from "../assets/line.svg";
import { useNavigate } from "react-router-dom";
import { getPlaceByName, saveLocationApi } from "../api/api";
import { logout } from "../assets";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const BookmeeLocations = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const navigate = useNavigate();
  const componentRef = useRef(null);
  useEffect(() => {
    const isLogged = Cookies.get("authToken");
    setIsLogIn(isLogged);
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const logoutfunc = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("authToken");
        setIsLogIn(false);
        navigate("/login");
      }
    });
  };

  const [vias, setVias] = useState([]);
  const [predictions, setPredictions] = useState({
    start: [],
    end: [],
    vias: {},
  });
  const [locationId, setLocationId] = useState({
    start: null,
    end: null,
    via: null,
  });

  const addVia = () => {
    if (vias.length < 10) {
      setVias([...vias, { id: Date.now(), address: "" }]);
    }
  };

  const removeVia = (id) => {
    setVias(vias.filter((via) => via.id !== id));
  };

  const fetchPredictions = async (value, key, id = null) => {
    try {
      const response = await getPlaceByName(value);
      if (response && !response.error) {
        setPredictions((prev) => {
          if (key === "via") {
            return {
              ...prev,
              vias: { ...prev.vias, [id]: response?.data?.predictions },
            };
          }
          return { ...prev, [key]: response?.data?.predictions };
        });
      }
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  };

  const handleInputChange = (e, key, id = null) => {
    try {
      const { value } = e.target;

      if (key === "via") {
        setVias(
          vias.map((via) => (via.id === id ? { ...via, address: value } : via))
        );
      }

      fetchPredictions(value, key, id);
    } catch (error) {
      console.error("Error handling input change:", error);
    }
  };

  const handlePredictionClick = (prediction, key, id = null) => {
    const placeId = prediction.place_id;

    if (key === "via") {
      setVias(
        vias.map((via) =>
          via.id === id
            ? { ...via, address: prediction.description, locationId: placeId }
            : via
        )
      );
      setPredictions((prev) => ({ ...prev, vias: { ...prev.vias, [id]: [] } }));
    } else if (key === "start") {
      document.getElementById("start").value = prediction.description;
      setPredictions((prev) => ({ ...prev, start: [] }));

      setLocationId({ ...locationId, start: placeId });
    } else if (key === "end") {
      document.getElementById("end").value = prediction.description;
      setPredictions((prev) => ({ ...prev, end: [] }));

      setLocationId({ ...locationId, end: placeId });
    }
  };

  const handleSubmit = async () => {
    const formData = {
      start: {
        description: document.getElementById("start").value,
        place_id: locationId.start,
        reference: predictions.start.reference,
        city: "",
        country: "",
      },
      vias: vias.map((via) => ({
        address: via.address,
        locationId: via.locationId,
      })),
      end: {
        description: document.getElementById("end").value,
        place_id: locationId.end,
        reference: predictions.end.reference,
      },
    };

    try {
      const response = await saveLocationApi(formData);
      const locationId = response.data.id;
      if(!isLogIn)
     {
       const storedLocations = JSON.parse(localStorage.getItem('locationIds')) || [];
      storedLocations.push(locationId);
      localStorage.setItem('locationIds', JSON.stringify(storedLocations));
    }
      navigate(`/fleet/${locationId}`);
    } catch (error) {
      console.error("Error saving location data:", error);
    }
  };

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-2xl -mt-6 md:-mt-16 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8 max-w-xl mx-auto transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="px-1 sm:px-3">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            TAXIGO
          </h2>
          <p className="text-[#888888] text-sm sm:text-base mt-1 font-medium">
            Enter Your Locations
          </p>
        </div>

        <div className="space-y-5">
          {/* Start input */}
          <div className={`relative ${vias.length === 0 ? "-mb-3" : ""}`}>
            <label className="text-[#FEB601] mb-2 font-semibold text-sm uppercase tracking-wider block">
              Start
            </label>
            <div className="relative">
              <input
                id="start"
                type="text"
                placeholder="Pickup Address"
                className="w-full border border-gray-200 text-[#333333] rounded-lg px-4 py-3 pr-12 bg-gray-50 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFCA09]/40 focus:border-[#FEB601] focus:bg-white hover:border-gray-300"
                onChange={(e) => handleInputChange(e, "start")}
              />
              <img
                src={RedArrow}
                alt="Red Arrow"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none"
              />
            </div>
            {predictions.start.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 max-h-56 overflow-y-auto rounded-lg shadow-lg z-50 animate-[fadeSlideDown_0.15s_ease-out]">
                {predictions.start.map((prediction, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 cursor-pointer text-sm text-[#333333] hover:bg-[#FFF8E1] transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                    onClick={() => handlePredictionClick(prediction, "start")}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Via inputs */}
          {vias.map((via) => (
            <div key={via.id} className="relative">
              <label className="text-[#FEB601] mb-2 font-semibold text-sm uppercase tracking-wider block">
                Via
              </label>
              <div className="flex items-center">
                <div className="relative flex-1 pr-14">
                  <input
                    id={`via-${via.id}`}
                    type="text"
                    placeholder="Via Address"
                    value={via.address}
                    onChange={(e) => handleInputChange(e, "via", via.id)}
                    className="w-full border border-gray-200 text-[#333333] rounded-lg px-4 py-3 bg-gray-50 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFCA09]/40 focus:border-[#FEB601] focus:bg-white hover:border-gray-300"
                  />
                  {predictions.vias[via.id]?.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 max-h-56 overflow-y-auto rounded-lg shadow-lg z-50 animate-[fadeSlideDown_0.15s_ease-out]">
                      {predictions.vias[via.id].map((prediction, i) => (
                        <li
                          key={i}
                          className="px-4 py-3 cursor-pointer text-sm text-[#333333] hover:bg-[#FFF8E1] transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                          onClick={() =>
                            handlePredictionClick(prediction, "via", via.id)
                          }
                        >
                          {prediction.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="absolute right-0 flex flex-col items-center">
                  <img src={Line} alt="Line" className="w-0.5 h-[20px] mt-1 opacity-40" />
                  <button
                    type="button"
                    onClick={addVia}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#FFF8E1] transition-colors duration-200"
                  >
                    <img src={Plus} alt="Add" className="w-5 h-5" />
                  </button>
                  <img src={Line} alt="Line" className="w-0.5 h-[20px] opacity-40" />
                  <button
                    type="button"
                    onClick={() => removeVia(via.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors duration-200"
                  >
                    <img src={Minus} alt="Remove" className="w-5 h-[26px]" />
                  </button>
                  <img src={Line} alt="Line" className="w-0.5 h-[20px] opacity-40" />
                  <button
                    type="button"
                    onClick={addVia}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#FFF8E1] transition-colors duration-200"
                  >
                    <img src={Plus} alt="Add" className="w-5 h-5" />
                  </button>
                  <img src={Line} alt="Line" className="w-0.5 h-[20px] opacity-40" />
                </div>
              </div>
            </div>
          ))}

          {/* Add Via button */}
          {vias.length === 0 && (
            <div className="relative flex justify-end pr-1">
              <div className="flex flex-col items-center -mt-2 z-10">
                <img src={Line} alt="Line" className="w-0.5 h-5 opacity-40" />
                <button
                  type="button"
                  onClick={addVia}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FFF8E1] transition-all duration-200 hover:scale-110"
                >
                  <img src={Plus} alt="Add" className="w-6 h-6" />
                </button>
                <img src={Line} alt="Line" className="w-0.5 h-5 opacity-40" />
              </div>
            </div>
          )}

          {/* End input */}
          <div>
            <div className="relative">
              <label
                className={`${
                  vias.length === 0 ? "-mt-14" : ""
                } text-[#FEB601] mb-2 font-semibold text-sm uppercase tracking-wider block`}
              >
                End
              </label>
              <div className="relative">
                <input
                  id="end"
                  type="text"
                  placeholder="Destination Address"
                  className="w-full border border-gray-200 text-[#333333] rounded-lg px-4 py-3 pr-12 bg-gray-50 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFCA09]/40 focus:border-[#FEB601] focus:bg-white hover:border-gray-300"
                  onChange={(e) => handleInputChange(e, "end")}
                />
                <img
                  src={BluePin}
                  alt="Blue Pin"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none"
                />
              </div>
              {predictions.end.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 max-h-56 overflow-y-auto rounded-lg shadow-lg z-50 animate-[fadeSlideDown_0.15s_ease-out]">
                  {predictions.end.map((prediction, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 cursor-pointer text-sm text-[#333333] hover:bg-[#FFF8E1] transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                      onClick={() => handlePredictionClick(prediction, "end")}
                    >
                      {prediction.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 pt-4 pb-2">
            {!isLogIn ? (
              <Link
                to="/login"
                className="bg-[#000000] text-[#FFCA09] font-semibold text-sm sm:text-base px-5 sm:px-8 py-3 rounded-lg flex items-center justify-center flex-1 max-w-[200px] transition-all duration-200 hover:bg-[#1a1a1a] hover:shadow-lg active:scale-[0.98]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Log In
              </Link>
            ) : (
              <button
                onClick={logoutfunc}
                className="bg-[#000000] text-[#FFCA09] font-semibold text-sm sm:text-base px-5 sm:px-8 py-3 rounded-lg flex items-center justify-center flex-1 max-w-[200px] transition-all duration-200 hover:bg-[#1a1a1a] hover:shadow-lg active:scale-[0.98]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Log Out
              </button>
            )}
            <Link to="/fleet" />
            <button
              className="bg-[#FEB601] text-[#111111] font-semibold text-sm sm:text-base px-5 sm:px-8 py-3 rounded-lg flex items-center justify-center flex-1 max-w-[200px] transition-all duration-200 hover:bg-[#FFCA09] hover:shadow-lg active:scale-[0.98]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onClick={handleSubmit}
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe animation for dropdown */}
      <style>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BookmeeLocations;
