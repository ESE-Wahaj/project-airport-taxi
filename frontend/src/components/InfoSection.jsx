import React from 'react';
import {img1, img2, img3, img4, img5, img6} from '../assets/index';

const InfoSection = () => {
  const vehicles = [
    {
      title: "Saloon Car",
      description:
        "Ford Mondeo. VW Passat or similar. These can accommodate up to 3 passengers plus 3 standard suitcases (23kg max). or 4 passengers plus hand luggage. Ford Mondeo or Passat or similar.",
      imageSrc: img1,
    },
    {
      title: "Executive Car",
      description:
        "E Class Mercedes or similar. These can accommodate up to 3 passengers p,ÅJS 3 standard suitcases (23kg max). or 4 passengers plus hand luggage. E-Class Mercedes or similar. or 4 passengers plus hand luggage. Ford Mondeo or Passat or similar.",
      imageSrc: img2,
    },
    {
      title: "Estate Car",
      description:
        "Volvo Estate, VW Passat or similar. These can accommodate up to 4 passengers plus 4 standard suitcases (23kg max). Volvo Estate, VW Passat or similar",
      imageSrc: img3,
    },
    {
      title: "People Carrier",
      description:
        "VW Sharan, Ford Galaxy or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage.",
      imageSrc: img4,
    },
    {
      title: "Executive People Carrier",
      description:
        "Mercedes Viano or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage.",
      imageSrc: img5,
    },
    {
      title: "8 Seater Minibus",
      description:
        "VW Transporter or similar. These can accommodate 8 passengers plus up to 8 standard suitcases (23kg max).",
      imageSrc: img6,
    },
  ];

  const popularLocations = [
    "Aberdeen", "Belfast-City", "Belfast-International", "Birmingham",
    "Blackpool", "Bournemouth", "Bristol", "Cardiff", "Coventry", "East-Midlands",
    "Edinburgh", "Exeter", "Gatwick", "Glasgow", "Heathrow", "Humberside",
    "Inverness", "Leeds-Bradford", "Liverpool", "London-City", "Luton",
    "Manchester", "Newcastle", "Newquay", "Norwich", "Plymouth", "Prestwick",
    "Sheffield", "Southampton", "Southend", "Stansted", "Teesside",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20 font-[Poppins]">

      {/* --- INTRO SECTION --- */}
      <section className="text-center mb-16 md:mb-24 animate-[fadeInUp_0.8s_ease-out_both]">
        <SectionHeading>
          <span className="text-[#FFCA09]">Taxi Transfers </span>
          <span className="text-white">To And From All UK Airports</span>
        </SectionHeading>

        <div className="max-w-4xl mx-auto space-y-5">
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed md:leading-8 text-justify">
            We specialize in taxi transfers to and from all UK airports for both individuals and groups, with an emphasis on a courteous
            and thoroughly professional personal service at affordable prices. 24 hours a day. 7 days a week,
            if you would like a quote for a journey you are planning please select the 'Type of Journey' you require and enter the post
            code on the 'Instant Online Quote' form above. If you don't have the post code please select the 'Type of Journey' and
            then click on the 'Manual Quote' button and fil in as many details as possible and we will email you with a quote as soon
            as possible. The price we quote is the price you pay.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed md:leading-8 text-justify">
            From the moment you contact us, we'll do everything we can to ensure that your booking and transfer go as smoothly as
            possible. That means an air-conditioned vehicle tailored to the number of passengers and the luggage requirements
            specified by you, and an experienced driver with proven customer service skills and an extensive knowledge of the local area.
          </p>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="mb-16 md:mb-24 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
        <SectionHeading>
          <span className="text-[#FEB601]">Services</span>
        </SectionHeading>

        <div className="max-w-4xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed md:leading-8 text-justify">
            A 'Meet and Greet' service can be arranged when booking whereby the driver will be in arrivals with the passengers name or company name, whichever you prefer. A comforting thought, especially for first time visitors in a foreign country. If your flight is early or subject to delays, we will track your flight's progress and send your driver at the new expected time of arrival. A lot of our work is corporate based so if you are booking a taxi for other people you need not worry we will give them the professional quality service they would expect We accept most major credit cards and debit cards and send receipts via email. OTS also welcomes corporate account customers and, subject to credit references, we'll be happy to offer you a monthly invoicing facility or direct debit on our airport taxi services.
          </p>
        </div>
      </section>

      {/* --- POPULAR LOCATIONS SECTION --- */}
      <section className="mb-16 md:mb-24 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
        <SectionHeading>
          <span className="text-[#FEB601]">Popular </span>
          <span className="text-white font-light">Locations</span>
        </SectionHeading>

        <p className="text-sm sm:text-base md:text-lg text-white/70 text-center mb-8 max-w-2xl mx-auto">
          We cover the whole of the UK, including many popular locations such as:
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
          {popularLocations.map((loc, i) => (
            <span
              key={i}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                         bg-[#FFCA09]/10 text-[#FFCA09] border border-[#FFCA09]/20
                         hover:bg-[#FFCA09]/20 hover:border-[#FFCA09]/40
                         transition-all duration-300 cursor-default"
            >
              {loc}
            </span>
          ))}
          <span
            className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                       bg-white/5 text-white/70 border border-white/10"
          >
            and many more...
          </span>
        </div>
      </section>

      {/* --- FLEET SECTION --- */}
      <section className="animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
        <SectionHeading>
          <span className="text-white">Our </span>
          <span className="text-[#FEB601]">Extensive </span>
          <span className="text-white">Fleet</span>
        </SectionHeading>

        <p className="text-sm sm:text-base md:text-lg text-white/70 text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          We provide access to a large fleet of vehicle sizes and types.
          Regardless of your party size, luggage, or special requirements, we can
          usually provide the perfect vehicle.
        </p>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02]
                         border border-white/[0.08] rounded-2xl overflow-hidden
                         hover:border-[#FFCA09]/30 hover:from-white/[0.08] hover:to-white/[0.04]
                         transition-all duration-500 ease-out
                         hover:shadow-[0_8px_40px_rgba(255,202,9,0.08)]
                         hover:-translate-y-1"
            >
              {/* Card inner */}
              <div className="flex flex-col sm:flex-row items-center p-5 sm:p-6 gap-5 sm:gap-6">
                {/* Image container */}
                <div className="w-full sm:w-2/5 flex-shrink-0">
                  <div className="aspect-[4/3] w-full flex items-center justify-center p-2">
                    <img
                      src={vehicle.imageSrc}
                      alt={vehicle.title}
                      className="max-w-full max-h-full object-contain
                                 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#FEB601] mb-2 font-[Poppins]">
                    {vehicle.title}
                  </h3>
                  {/* Small gold accent line */}
                  <div className="w-10 h-[2px] bg-[#FFCA09]/50 mb-3 mx-auto sm:mx-0 rounded-full" />
                  <p className="text-sm md:text-base text-white/70 leading-relaxed font-light font-[Poppins]">
                    {vehicle.description}
                  </p>
                </div>
              </div>

              {/* Subtle top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFCA09] to-transparent
                              opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

/* Reusable Section Heading with gold underline decoration */
const SectionHeading = ({ children }) => (
  <div className="text-center mb-8 md:mb-10">
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-[Poppins] tracking-tight">
      {children}
    </h2>
    <div className="flex justify-center mt-3">
      <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#FFAE00] to-[#FFCA09]" />
    </div>
  </div>
);

export default InfoSection;
