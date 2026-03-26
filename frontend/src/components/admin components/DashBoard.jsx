import React, { useState, useEffect } from 'react';
import edit from '../../assets/edit.svg';
import Car from '../../assets/Car.svg';
import { img1, img2, img3, img4, img5, img6 } from '../../assets/index';
import { fetchAllCars, getAllBookings,updateBookingStatus } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import PopUp from './PopUp.jsx';

function DashBoard() {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState([]);
    const [booking, setBooking]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [status, setStatus]= useState('')
   const BASE_IMAGE_URL = 'http://localhost:8080'; 

   const getAllbookings = async() =>{
    try {
        const data = await getAllBookings();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
}

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
        getAllbookings();
      }, []);
      
      if (loading) {
        return <div>Loading...</div>;
      }
      console.log("all bookings",booking)

    const handleNavigate = (carid) => {
        navigate (`/admin/edit-fleet/${carid}`)
    }

    const handleChange = () => {
        navigate ('/admin/fleet')
    }
const handleclick = (bookingId, bookingstatus) =>{
    setPopUp(bookingId);
    setStatus(bookingstatus);
}
    const handlePopUp = async(bookingId, newStatusElement) => {
        const newStatus = newStatusElement.props.children;
        setBooking((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === bookingId ? { ...booking, booking_status_element: newStatusElement } : booking
            )
        );
        console.log("sds",newStatusElement.props.children)
        setPopUp(false);
        setStatus(newStatus);
        console.log("sds",newStatus)
        const formdata={
            id:bookingId,
            status:newStatus
        }
        await updateBookingStatus(formdata);
        getAllbookings();
    };
    const closePopUp = () => setPopUp(false);

    return (
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 max-w-7xl mx-auto mt-10">
            <div className="mx-4 md:mx-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#333333] text-center">All Bookings</h2>
                <div className="border text-center rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 font-semibold text-gray-600 p-2 border-b-2 border-b-yel">
                        <div>Fleet</div>
                        <div>Date</div>
                        <div>Fare</div>
                        <div>Status</div>
                        <div>Edit</div>
                    </div>
                    {booking && booking.length > 0 ? (
                        booking.map((booking) => (
                            <div
                                key={booking.id}
                                className="grid grid-cols-5 p-2 text-gray-800 hover:bg-gray-100 transition-colors border-b"
                            >
                                <div>{booking.car_category}</div>
                                <div className=''>{new Date(booking.flight_date_time).toLocaleDateString()}</div>
                                <div className=''>£ {booking.total_price.toFixed(2)}</div>
                                <div className="flex justify-center">
                                    {booking.booking_status_element || (
                                        <span className="font-bold">
                                            {booking.booking_status
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={() => handleclick(booking.id, booking.booking_status)
                                        }>
                                        <img src={edit} alt="Edit" className="w-6 h-6 object-cover transform " />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No bookings available.</div>
                    )}
                    {popUp && (
                        <PopUp
                            closePopUp={closePopUp}
                            onStatusChange={(newStatusElement) => handlePopUp(popUp, newStatusElement)}
                        />
                    )}
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#333333] text-center mt-20">All Fleets</h2>
                <div className="border rounded-lg overflow-hidden text-center">
                    <div className="grid grid-cols-4 font-semibold text-gray-600 p-2 border-b-2 border-b-yel">
                        <div>Fleet</div>
                        <div>Rate/Mile</div>
                        <div>Image</div>
                        <div>Edit</div>
                    </div>
                    {vehicle && vehicle.length > 0 ? (
                   vehicle.map((fleet) => (
                        <div
                            key={fleet.id}
                            className="grid grid-cols-4 p-2 text-gray-800 hover:bg-gray-100 transition-colors border-b"
                        >
                            <div className="font-bold mt-9">{fleet.car_category}</div>
                            <div className="font-bold mt-9">£ {fleet.mileage_price.toFixed(2)}</div>
                            <img 
                                src={`${BASE_IMAGE_URL}/${fleet.image}`}
                                alt={fleet.car_category} 
                                className="w-[148px] h-auto object-contain mx-auto mt-4"
                            />
                            <div className="flex justify-center">
                            <button onClick={() => handleNavigate(fleet.id)}>
                            <img src={edit} alt="Edit" className="w-10 h-10 object-cover" />
                                </button>
                            </div>
                        </div>
                    ))
                ): (
                    <div>No fleet added yet.</div>
                )
                }
                </div>
                <button
                    className="w-[200px] lg:w-[400px] h-[54px] bg-[#FFCA09] mt-20 mb-5 mx-auto flex items-center justify-center gap-2 rounded"
                    onClick={handleChange}
                >
                    Add New Fleet
                    <img src={Car} alt="" className="w-5 h-5 object-cover transform scale-x-[-1]" />
                </button>
            </div>
        </div>
    );
}

export default DashBoard;