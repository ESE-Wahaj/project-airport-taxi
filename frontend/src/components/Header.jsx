import React, { useEffect, useState, useRef, useCallback } from "react";
import logo from "../assets/logo.svg";
import Hamburger from "../assets/HamBurger.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LiveChat from "../pages/LiveChat";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import profilelogo from "../assets/gg_profile.svg";

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const Logout = () => {
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

  useEffect(() => {
    const isLogged = Cookies.get("authToken");
    setIsLogIn(isLogged);
  }, []);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback(
    (e) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Function to open the chat modal
  const handleClick = () => {
    setIsLiveChatOpen(true);
  };

  // Function to close the chat modal
  const handleClose = () => {
    setIsLiveChatOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/qa", label: "Q&A" },
    { to: "/tc", label: "T&C" },
    { to: "/contact", label: "Contact Us" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="font-['Poppins']">
      {/* Sticky header with backdrop blur */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md text-white shadow-lg shadow-black/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Left: Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center group"
            >
              <img
                src={logo}
                alt="TAXIGO Logo"
                className="h-14 w-14 md:h-16 md:w-16 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex items-center space-x-2 lg:space-x-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg poppins
                        ${
                          isActive(link.to)
                            ? "text-[#FFCA09]"
                            : "text-white/80 hover:text-white"
                        }
                      `}
                    >
                      {link.label}
                      {/* Active underline indicator */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#FFCA09] rounded-full transition-all duration-300 ${
                          isActive(link.to) ? "w-6" : "w-0"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3">
              {/* Live Chat button - desktop only */}
              <button
                onClick={handleClick}
                className="hidden md:inline-flex items-center gap-2 bg-[#FFAE00] text-black text-sm font-semibold px-5 py-2 rounded-full poppins transition-all duration-300 hover:bg-[#FFCA09] hover:shadow-lg hover:shadow-[#FFAE00]/20 active:scale-[0.97]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Live Chat
              </button>

              {/* Conditional: Profile or Log In */}
              {isLogIn ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 transition-all duration-300 hover:bg-[#FFAE00]/20 hover:ring-2 hover:ring-[#FFAE00]/50"
                  >
                    <img
                      src={profilelogo}
                      alt="Profile Logo"
                      className="w-5 h-5 cursor-pointer"
                    />
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <button className="text-[#FE9901] px-5 py-1.5 poppins text-sm font-bold bg-white rounded-full transition-all duration-300 hover:bg-[#FFCA09] hover:text-black hover:shadow-lg hover:shadow-[#FFAE00]/20 active:scale-[0.97]">
                    Log In
                  </button>
                </Link>
              )}

              {/* Hamburger - mobile only */}
              <button
                ref={hamburgerRef}
                onClick={toggleMenu}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <img
                    src={Hamburger}
                    alt="Menu"
                    className="w-6 h-6"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile slide-in menu */}
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-72 bg-black z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu header with logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src={logo}
              alt="TAXIGO Logo"
              className="h-12 w-12 object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu links */}
        <ul className="px-4 py-6 space-y-1">
          {navLinks.map((link, index) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={toggleMenu}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium poppins transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-[#FFAE00]/10 text-[#FFCA09] border-l-2 border-[#FFCA09]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Live Chat button */}
        <div className="px-6 mt-2">
          <button
            onClick={() => {
              handleClick();
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#FFAE00] text-black text-sm font-semibold px-5 py-2.5 rounded-full poppins transition-all duration-300 hover:bg-[#FFCA09] active:scale-[0.97]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Live Chat
          </button>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 md:h-[72px]" />

      {/* Modal for Live Chat */}
      {isLiveChatOpen && (
        <div className="fixed inset-0 z-50">
          {/* Black overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70"
            onClick={handleClose}
          ></div>

          {/* LiveChat Modal */}
          <div className="flex justify-center items-center min-h-screen">
            <LiveChat onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
