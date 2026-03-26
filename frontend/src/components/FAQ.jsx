import React, { useState } from "react";
import icon from "../assets/Vector.svg";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "What size car do I need?",
    answer: (
      <>
        If you are unsure what vehicle size to book we strongly recommend you
        use our Vehicle Calculator tool,{" "}
        <span className="text-[#FEB601] font-semibold underline cursor-pointer hover:text-[#FFCA09] transition-colors">
          Vehicle & Luggage Calculator
        </span>
        .
      </>
    ),
  },
  {
    question: "How do I make a booking?",
    answer: (
      <>
        Preferably via our "Instant Fare Quote" booking engine, or through{" "}
        <span className="text-[#FEB601] font-semibold underline cursor-pointer hover:text-[#FFCA09] transition-colors">
          Online Chat
        </span>{" "}
        or telephone.
      </>
    ),
  },
  {
    question: "What emails can I expect to receive?",
    answer: (
      <>
        <p className="mb-4">
          As a customer of ours you can expect to receive:
        </p>
        <div className="overflow-hidden rounded-xl shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#111D47]">
                <th className="px-5 py-3.5 text-[#FFCA09] font-semibold text-sm tracking-wide uppercase">
                  Email Type
                </th>
                <th className="px-5 py-3.5 text-[#FFCA09] font-semibold text-sm tracking-wide uppercase">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-white">
                <td className="px-5 py-3.5 font-medium text-[#333] border-b border-gray-100">
                  Welcome Email
                </td>
                <td className="px-5 py-3.5 text-[#555] border-b border-gray-100">
                  A welcome email is sent to all new customers, this contains
                  some frequently asked questions about our company as well as
                  login details for our website.
                </td>
              </tr>
              <tr className="bg-[#F9FAFB]">
                <td className="px-5 py-3.5 font-medium text-[#333] border-b border-gray-100">
                  Confirmation
                </td>
                <td className="px-5 py-3.5 text-[#555] border-b border-gray-100">
                  This is your confirmation email, there will be one of these
                  per journey.
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-5 py-3.5 font-medium text-[#333]">
                  Receipt
                </td>
                <td className="px-5 py-3.5 text-[#555]">
                  This is dispatched shortly after payment is made.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    question:
      "How do I find my driver from an airport, port or station?",
    answer:
      'The pick up instructions will be contained in the "Journey Details" email.',
  },
  {
    question: "What is the 'Meet and Greet' service?",
    answer: (
      <>
        <p className="mb-3">
          The "Meet and Greet" service is where the driver will park their
          vehicle and meet you with a name board in the appropriate place (e.g.
          an Arrivals Hall at an Airport).
        </p>
        <p className="mb-3">
          This service is not included on our journeys as standard but can be
          added for an additional fee, to cover parking charges.
        </p>
        <p>
          The driver will put exactly what you entered in the "Head Passenger
          Full Name" field onto the name board, therefore if you'd rather the
          driver doesn't know the passenger's name then use a pseudonym instead.
          Obviously, you will need to make sure the passenger is aware so they
          know what to look out for!
        </p>
      </>
    ),
  },
  {
    question:
      "Will I incur any extra charges if my plane is delayed?",
    answer:
      "No, we will track your plane's progress when it is in the air.",
  },
  {
    question: "Is your Company licensed and fully insured?",
    answer:
      "Yes, we are fully licensed. All our vehicles are also insured.",
  },
  {
    question: "What do I do if I don't know the postcode?",
    answer:
      "Enter all the details you do have and we will try and find the postcode and email you back a quotation as soon as possible.",
  },
  {
    question:
      "What happens if I haven't received confirmation and my transfer is imminent?",
    answer: (
      <>
        <p className="mb-3">
          This could be due to a number of reasons, most commonly a misspelt
          email address.
        </p>
        <p>
          If this happens to you please contact our office via{" "}
          <span className="text-[#FEB601] font-semibold underline cursor-pointer hover:text-[#FFCA09] transition-colors">
            Online Chat
          </span>{" "}
          or call on 01934744171 and we will deal with your booking as quickly
          as possible.
        </p>
      </>
    ),
  },
  {
    question: "Will you meet us anytime of day or night?",
    answer:
      "Yes, as all bookings are pre-booked we can provide a 24hr service.",
  },
  {
    question: "Can I smoke in the car?",
    answer:
      "No, in compliance with UK law Onward Travel Solutions Ltd operates a strict non-smoking policy in all their vehicles.",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-5 md:px-6 text-left group hover:bg-[#FEFCE8] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span
          className="font-semibold text-[15px] md:text-[17px] leading-snug pr-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: isOpen ? "#FEB601" : "#111D47",
          }}
        >
          {item.question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#FEB601" : "#111D47",
            color: isOpen ? "#111D47" : "#FFCA09",
          }}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? "600px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div
          className="px-5 md:px-6 pb-5 text-[#555] text-[14px] md:text-[15px] leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-4 sm:p-6 md:p-10 md:max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <h1
            className="font-extrabold text-3xl md:text-4xl tracking-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#111D47",
            }}
          >
            TAXIGO
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: "#FEB601" }}
            />
            <h2
              className="text-lg md:text-2xl font-semibold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: "#333",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <p
            className="mt-2 text-sm md:text-base text-[#888]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Find answers to the most common questions about our airport
            transfer services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQ;
