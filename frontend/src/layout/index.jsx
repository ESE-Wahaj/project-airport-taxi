import React from 'react';
import Hero from '../assets/HeroSection.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

const Layout = ({ children, backURL, isLoggedIn }) => {
  const location = useLocation();

  const isAdminPage = location.pathname.toLowerCase() === '/admin/fleet' ||
    location.pathname.toLowerCase() === '/admin/fleet/' ||
    location.pathname.toLowerCase() === '/admin/login' ||
    location.pathname.toLowerCase() === '/admin/dashboard' ||
    location.pathname.toLowerCase() === '/admin/forget-password' ||
    /^\/admin\/edit-fleet\/[^/]+$/.test(location.pathname.toLowerCase());
  console.log(isAdminPage);
  console.log(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-[Poppins]">
      {/* Header */}
      {!isAdminPage ? <Header isLoggedIn={isLoggedIn} /> : <AdminHeader isLoggedIn={isLoggedIn} />}

      {/* Hero Section */}
      <div className="relative w-full h-[80vh] min-h-[480px] max-h-[800px] overflow-hidden">
        {/* Hero Image */}
        <img
          src={Hero}
          alt="Hero"
          className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center -translate-y-4 md:-translate-y-8">
            {/* Decorative top line */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#FFCA09] to-transparent mb-6 opacity-80" />

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFCA09] mb-3 text-center font-[Poppins] tracking-tight leading-tight"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
            >
              Your Ride At One Call
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-center font-[Poppins] font-light tracking-[0.25em] uppercase mt-1"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            >
              All In One Travel Solutions
            </p>

            {/* Decorative bottom line */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FFCA09] to-transparent mt-6 opacity-80" />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/50 text-xs tracking-[0.2em] uppercase font-[Poppins]">Scroll</span>
            <svg
              className="w-5 h-5 text-[#FFCA09]/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-black flex-1">
        {/* Children (booking form etc.) - overlaps hero */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-24 lg:-mt-40">
          <div className="transition-all duration-500 ease-out">
            {children}
          </div>
        </div>

        {/* Admin page spacing */}
        {isAdminPage && (
          <div className="pt-48 md:pt-64 lg:pt-72" />
        )}

        {/* Info Section */}
        <div className="w-full text-white">
          <div className="mt-8 md:mt-12 lg:mt-16">
            <InfoSection />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Keyframe for slow zoom animation */}
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default Layout;
