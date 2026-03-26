import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import { fetchAllCars, getLocationbyId } from "../api/api.js";
import { PencilIco, PencilIcoyellow, Back } from "../assets/index.js";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BookmeeMap = ({
  startLocation,
  endLocation,
  vias = [],
  distance,
  startName,
  endName,
}) => {
  const [mapCenter, setMapCenter] = useState([54.5, -4]); // Default to UK center
  const [mapZoom, setMapZoom] = useState(5);
  const navigate = useNavigate();
  const route = [startLocation, ...vias, endLocation].filter(Boolean);
  //
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_IMAGE_URL = "http://localhost:8080";

  const id = useParams().id;

  useEffect(() => {
    if (startLocation && endLocation) {
      const bounds = L.latLngBounds(startLocation, endLocation);
      setMapCenter(bounds.getCenter());
      setMapZoom(6);
    }
  }, [startLocation, endLocation]);

  const [oneWayPrices, setOneWayPrices] = useState([
    100, 120, 140, 160, 180, 200, 220,
  ]);
  const [returnPrices, setReturnPrice] = useState([
    200, 240, 260, 280, 300, 320, 340,
  ]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchAllCars();
        setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getVehicles();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl shadow-xl max-w-6xl mx-auto mt-[-1rem] md:mt-[-4rem]">
        <div className="relative w-16 h-16 mb-4">
          <div
            className="absolute inset-0 rounded-full border-4 border-gray-200"
            style={{ borderTopColor: "#FFCA09" }}
          >
            <style>{`
              @keyframes bm-spin { to { transform: rotate(360deg); } }
            `}</style>
            <div
              className="w-full h-full rounded-full"
              style={{ animation: "bm-spin 0.8s linear infinite" }}
            >
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{ borderTopColor: "#FFCA09", animation: "bm-spin 0.8s linear infinite" }}
              />
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
          Loading vehicles...
        </p>
      </div>
    );
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  const handleSelect = ({ twoway, carid }) => {
    navigate(`/details/${twoway}/${carid}/${id}`);

    // navigate(`/details`);
  };
console.log(vehicle)
  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 max-w-6xl mx-auto mt-[-1rem] md:mt-[-4rem]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-0 sm:mx-4 md:mx-8">
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold mb-1 tracking-tight text-black">TAXIGO</h2>
        <p className="text-gray-500 mb-6 mt-1 font-normal text-base md:text-lg">
          Choose Your Fleet
        </p>

        {/* Route Badges */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <div
            className="text-black px-5 py-3 text-base md:text-lg rounded-xl flex justify-between items-center mb-3 md:mb-0 w-full md:w-1/2 shadow-md"
            style={{
              background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 202, 9, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <span className="flex items-center gap-2">
              <span className="bg-black text-[#FFCA09] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                Start
              </span>
              <span className="font-medium truncate max-w-[200px] md:max-w-[300px]">{startName}</span>
            </span>
            <Link to={`/edit-fleet/${id}`} className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <button className="bg-black/10 hover:bg-black/20 border-none cursor-pointer p-2 rounded-lg transition-all duration-200">
                <img src={PencilIco} alt="Edit" className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div
            className="bg-black text-[#FFCA09] px-5 py-3 text-base md:text-lg rounded-xl flex justify-between items-center w-full md:w-1/2 shadow-md"
            style={{
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <span className="flex items-center gap-2">
              <span className="bg-[#FFCA09] text-black text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                End
              </span>
              <span className="font-medium truncate max-w-[200px] md:max-w-[300px]">{endName}</span>
            </span>
            <Link to={`/edit-fleet/${id}`} className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <button className="bg-white/10 hover:bg-white/20 border-none cursor-pointer p-2 rounded-lg transition-all duration-200">
                <img src={PencilIcoyellow} alt="Edit" className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Map Container */}
        <div
          className="rounded-2xl overflow-hidden mb-8 shadow-lg"
          style={{
            border: "3px solid #FFAE00",
            background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
            padding: "3px",
          }}
        >
          <div className="rounded-xl overflow-hidden">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "320px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {startLocation && <Marker position={startLocation} />}
              {endLocation && <Marker position={endLocation} />}

              {Array.isArray(vias) &&
                vias.length > 0 &&
                vias.map((via, index) => <Marker key={index} position={via} />)}
              {route.length > 1 && <Polyline positions={route} color="#FFAE00" />}
            </MapContainer>
          </div>
        </div>

        {/* Journey Fares Header */}
        <div className="flex items-center gap-4 mt-8 md:mt-10 mb-2">
          <h3 className="text-2xl md:text-3xl font-bold text-[#FFAE00] whitespace-nowrap">
            Journey Fares
          </h3>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FFAE00] to-transparent rounded-full" />
        </div>
        <p className="text-gray-400 text-sm mb-6">Select your preferred vehicle and fare type</p>

        {/*  */}

        {vehicle
          ?.sort((a, b) => (a.id === 1 ? -1 : b.id === 1 ? 1 : 0))
          .map((v, index) => (
            <div key={v.id} className="mb-4">
              <div
                className="flex flex-col md:flex-row items-center mt-6 mb-6 bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Vehicle Image */}
                <div className="w-full md:w-[280px] flex-shrink-0 flex items-center justify-center bg-white rounded-xl p-4 shadow-sm">
                  <img
                    src={`${BASE_IMAGE_URL}/${v.image}`}
                    alt={v.car_category}
                    className="w-full md:w-[250px] h-[140px] object-contain"
                    style={{ transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </div>

                {/* Vehicle Info */}
                <div className="mt-4 md:mt-0 md:ml-8 flex-1 w-full">
                  <h4 className="text-xl md:text-3xl font-bold mb-2 text-[#FEB601]">
                    {v.car_category}
                  </h4>
                  <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                    {v.metadata}
                  </p>
                </div>
              </div>

              {/* Price Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-center">
                <button
                  onClick={() => handleSelect({ twoway: false, carid: v.id })}
                  className="bg-black text-[#FFAE00] font-bold w-full sm:w-[45%] md:w-[38%] px-6 py-3 md:py-4 text-lg md:text-2xl rounded-xl flex justify-between items-center shadow-md"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                    One Way
                  </span>
                  <span className="bg-[#FFAE00] text-black px-3 py-1 rounded-lg text-base md:text-xl font-extrabold">
                    £{(v.mileage_price * distance).toFixed(2)}
                  </span>
                </button>
                <button
                  onClick={() => handleSelect({ twoway: true, carid: v.id })}
                  className="font-bold w-full sm:w-[45%] md:w-[38%] px-6 py-3 md:py-4 text-lg md:text-2xl rounded-xl flex justify-between items-center shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #FFCA09 0%, #FEB601 50%, #FFAE00 100%)",
                    color: "#000",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 174, 0, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/></svg>
                    Return
                  </span>
                  <span className="bg-black text-[#FFCA09] px-3 py-1 rounded-lg text-base md:text-xl font-extrabold">
                    £{((v.mileage_price * distance - 15) * 2).toFixed(2)}
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>
          ))}

        {/* Edit Route Button */}
        <Link to={`/edit-fleet/${id}`} className="block">
          <button
            className="w-full h-14 md:h-20 px-6 py-3 text-xl md:text-2xl rounded-xl flex items-center justify-center font-bold my-8 border-2 border-transparent"
            style={{
              background: "linear-gradient(135deg, #FFCA09 0%, #FFAE00 100%)",
              color: "#000",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(255, 202, 9, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Edit Route
            <img
              src={Back}
              alt="Back Icon"
              className="ml-4 w-7 h-7 md:w-10 md:h-10"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookmeeMap;
