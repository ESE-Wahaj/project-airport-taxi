import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { AiOutlineApple, AiOutlineAndroid } from "react-icons/ai";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import logo from "../assets/logo.svg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = [
    {
      title: "Passengers",
      links: [
        "Flights",
        "Airlines",
        "Park",
        "Security Wait Times",
        "Map",
        "Shop & Dine",
      ],
    },
    {
      title: "Business and Community",
      links: ["About us", "Career"],
    },
    {
      title: "General",
      links: ["Report Property", "Sign Up", "Contact us", "Newsroom"],
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF className="w-4 h-4" />,
      label: "Facebook",
      href: "#",
    },
    {
      icon: <FaTwitter className="w-4 h-4" />,
      label: "Twitter",
      href: "#",
    },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      label: "Instagram",
      href: "#",
    },
    {
      icon: <FaLinkedinIn className="w-4 h-4" />,
      label: "LinkedIn",
      href: "#",
    },
  ];

  return (
    <>
      <footer className="bg-black text-white font-['Poppins']">
        {/* Top section: Logo + Back to top */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between pt-10 pb-8">
            <a href="/" className="flex items-center group">
              <img
                src={logo}
                alt="TAXIGO Logo"
                className="h-14 w-14 md:h-16 md:w-16 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/50 text-sm font-medium transition-colors duration-300 hover:text-[#FFCA09] group"
            >
              <span className="hidden sm:inline">Back to top</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 py-12">
            {footerSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <h5 className="text-[#FEB601] font-semibold text-base tracking-wide mb-5">
                  {section.title}
                </h5>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="relative inline-block text-white/60 text-sm transition-colors duration-300 hover:text-white group"
                      >
                        {link}
                        {/* Underline animation on hover */}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#FFCA09] transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Social icons + copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white/50 transition-all duration-300 hover:bg-[#FFAE00] hover:text-black hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-white/30 text-xs tracking-wide">
              &copy; {new Date().getFullYear()} TaxiGo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
