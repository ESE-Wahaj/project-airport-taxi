import React, { useState, useEffect } from "react";
import { TfiBackLeft } from "react-icons/tfi";
import { HiShoppingCart } from "react-icons/hi2";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getCurrentBooking } from "../api/api";
import { BackYellow } from "../assets";

const OrderSummary = ({ isOneWay, fare }) => {
    const location = useLocation();
    const [isTwoWay,setIsTwoWay]=useState(false)
    const [meetandgreet,setmeetAndGreet]=useState(false)



    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const user_id = query.get('user_id');
    const id = query.get('bid');
    const twoway = query.get('twoway');
    const carid = query.get('carid');
    const lid = query.get('lid');
    const [data,setData] =useState()
    const back=()=>{
        // navigate(`/`)

          navigate(-1); // Previous page par navigate karein

    }
    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await getCurrentBooking(user_id, id);
              setData( res.data[0])
              setIsTwoWay(res.data[0].two_way)
              setmeetAndGreet(res.data[0].meet_and_greet)
          } catch (error) {
              console.error("Error fetching car data:", error);
          }
      };

    fetchData();
  }, [user_id, id]);
    const standardFare = data?data.standard_fare:"";
    const meetAndGreet =  meetandgreet ? 50 : 0;
    const FareDiscount = data?data.multiple_journey_disc:"";
    const oneWayTotalFare = standardFare + meetAndGreet;
    const twoWayTotalFare = ((standardFare * 2)) + meetAndGreet - (FareDiscount*2);
    const [journeyDetails, setJourneyDetails] = useState(isOneWay);

    useEffect(() => {
        // Update the state when the prop changes
        setJourneyDetails(isOneWay);
    }, [isOneWay]);
    const navigate = useNavigate()

    const payout=()=>{
        navigate(`/Cardpage/${user_id}/${id}`)
      }

    const singleOrderDetails = data ? [
        { label: "Start:", value: data.start_point.name },
        { label: "End:", value: data.end_point.name },
        { label: "Flight Arrival:", value: data.flight_date_time },
        { label: "Fleet:", value: data.car_category },
        { label: "Passengers:", value: data.number_of_passengers + " Person" },
        { label: "Suitcase:", value: data.number_of_suitcases + " Suitcase" },
        {
          label: "Arriving Flight:",
          value: data.flight_number && data.flight_arriving_from,
        },
        {
          label: "Meet & Greet:",
          value: data.meet_and_greet ? "Selected" : "Not Selected",
        },
      ]
    : [];

  const FirstJourneyOrderDetails = data
    ? [
        { label: "Start:", value: data.start_point.name },
        { label: "End:", value: data.end_point.name },
        { label: "Flight Arrival:", value: data.flight_date_time },
        { label: "Fleet:", value: data.car_category },
        { label: "Passengers:", value: data.number_of_passengers + " Person" },
        { label: "Suitcase:", value: data.number_of_suitcases + " Suitcase" },
        {
          label: "Arriving Flight:",
          value: data.flight_number && data.flight_arriving_from,
        },
        {
          label: "Meet & Greet:",
          value: data.meet_and_greet ? "Selected" : "Not Selected",
        },
      ]
    : [];

  const SecondJourneyOrderDetails = data
    ? [
        { label: "Start:", value: data.end_point.name },
        { label: "End:", value: data.start_point.name },
        { label: "Flight Arrival:", value: data.flight_date_time },
        { label: "Fleet:", value: data.car_category },
        { label: "Passengers:", value: data.number_of_passengers + " Person" },
        { label: "Suitcase:", value: data.number_of_suitcases + " Suitcase" },
        {
          label: "Arriving Flight:",
          value: data.flight_number && data.flight_arriving_from,
        },
        {
          label: "Meet & Greet:",
          value: data.meet_and_greet ? "Selected" : "Not Selected",
        },
      ]
    : [];

  const OnewayfareDetails = [
    { label: "Standard Fare:", value: `£${standardFare}` },
    { label: "Meet and Greet:", value: `+£${meetAndGreet}` },
    { label: "Total Fare:", value: `£${oneWayTotalFare}` },
  ];

  const ReturnfareDetails = [
    { label: "Multiple Journey Discount:", value: `£${FareDiscount}` },
    { label: "Standard Fare:", value: `£${(standardFare * 2)}` },
    { label: "Meet and Greet:", value: `+£${meetAndGreet}` },
    { label: "Total Fare:", value: `£${twoWayTotalFare}` },
  ];

  /* ---- Reusable sub-components for cleaner JSX ---- */

  const JourneyDetailRow = ({ label, value, index }) => (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 md:px-5 transition-colors duration-150"
      style={{
        backgroundColor: index % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <span className="text-[13px] md:text-[15px] font-semibold text-[#111D47] tracking-wide">
        {label}
      </span>
      <span className="text-[13px] md:text-[15px] text-[#444] font-medium text-left sm:text-right mt-0.5 sm:mt-0">
        {value}
      </span>
    </div>
  );

  const FareRow = ({ label, value, isTotal }) => (
    <div
      className="flex items-center justify-between py-3 px-4 md:px-6 transition-all duration-200"
      style={{
        backgroundColor: isTotal ? "#FEB601" : "#111D47",
        fontFamily: "'Poppins', sans-serif",
        borderRadius: isTotal ? "12px" : "8px",
        marginTop: isTotal ? "8px" : "4px",
        boxShadow: isTotal ? "0 4px 14px rgba(254, 182, 1, 0.35)" : "none",
      }}
    >
      <span
        className="font-semibold text-[13px] md:text-[16px]"
        style={{ color: isTotal ? "#111D47" : "#FFCA09" }}
      >
        {label}
      </span>
      <span
        className="font-bold text-[15px] md:text-[20px]"
        style={{ color: isTotal ? "#000" : "#FFF" }}
      >
        {value}
      </span>
    </div>
  );

  const JourneySection = ({ title, details, journeyNumber }) => (
    <div className="mb-6">
      <div
        className="flex items-center gap-3 mb-3 px-1"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: "#FEB601", color: "#111D47" }}
        >
          {journeyNumber}
        </div>
        <h3 className="text-base md:text-lg font-bold text-[#111D47] uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {details.map((detail, index) => (
          <JourneyDetailRow
            key={index}
            label={detail.label}
            value={detail.value}
            index={index}
          />
        ))}
      </div>
    </div>
  );

  const FareBreakdown = ({ fareDetails, title }) => {
    const regularFares = fareDetails.filter(
      (f) => f.label !== "Total Fare:"
    );
    const totalFare = fareDetails.find((f) => f.label === "Total Fare:");

    return (
      <div className="mt-6 mb-2">
        <div
          className="flex items-center gap-3 mb-3 px-1"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div
            className="w-1.5 h-7 rounded-full"
            style={{ backgroundColor: "#FEB601" }}
          />
          <h3 className="text-base md:text-lg font-bold text-[#111D47] uppercase tracking-wide">
            {title || "Fare Breakdown"}
          </h3>
        </div>
        <div className="space-y-1">
          {regularFares.map((fare, index) => (
            <FareRow key={index} label={fare.label} value={fare.value} />
          ))}
          {totalFare && (
            <FareRow label={totalFare.label} value={totalFare.value} isTotal />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 relative">
        <div className="container mt-[-4rem] md:mt-[-7rem] lg:mx-auto mx-auto">
          <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-5 sm:p-8 md:p-12 w-full lg:w-[100%] mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#111D47",
                }}
              >
                TAXIGO
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ backgroundColor: "#FEB601" }}
                />
                <p
                  className="text-base md:text-lg font-semibold text-[#555]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Your Order Summary
                </p>
              </div>
            </div>

            {/* Conditionally render based on journeyDetails state */}
            {isTwoWay ? (
              <>
                <JourneySection
                  title="First Journey"
                  details={FirstJourneyOrderDetails}
                  journeyNumber={1}
                />
                <JourneySection
                  title="Second Journey"
                  details={SecondJourneyOrderDetails}
                  journeyNumber={2}
                />
                <FareBreakdown fareDetails={ReturnfareDetails} title="Return Fare Breakdown" />
              </>
            ) : (
              <>
                {/* Single Journey Details */}
                <JourneySection
                  title="Journey Details"
                  details={singleOrderDetails}
                  journeyNumber={1}
                />
                <FareBreakdown fareDetails={OnewayfareDetails} title="Fare Breakdown" />
              </>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mt-8 md:mt-10">
              <button
                onClick={back}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 text-base md:text-lg font-semibold rounded-xl w-full sm:w-auto sm:min-w-[220px] md:min-w-[280px] transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#000",
                  color: "#FEB601",
                  border: "2px solid #000",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#111D47";
                  e.currentTarget.style.borderColor = "#111D47";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                  e.currentTarget.style.borderColor = "#000";
                }}
              >
                Back
                <img src={BackYellow} className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" alt="back" />
              </button>
              <button
                onClick={payout}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 text-base md:text-lg font-semibold rounded-xl w-full sm:w-auto sm:min-w-[220px] md:min-w-[280px] transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#FEB601",
                  color: "#000",
                  border: "2px solid #FEB601",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFAE00";
                  e.currentTarget.style.borderColor = "#FFAE00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEB601";
                  e.currentTarget.style.borderColor = "#FEB601";
                }}
              >
                Proceed to Pay
                <HiShoppingCart className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
