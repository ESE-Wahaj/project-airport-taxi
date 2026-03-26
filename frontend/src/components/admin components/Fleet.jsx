import React, { useState, useEffect, useRef} from "react";
import update from '../../assets/update.svg';
import { AddCar } from "../../api/api";
import { useNavigate } from "react-router-dom";
function Fleet() {
    const [image, setimage] = useState(null);
    const [fleet, setFleet] = useState('');
    const [rate, setRate] = useState('');
    const [passengers, setPassengers] = useState('');
    const [suitCases, setSuitCases] = useState('');
    const [metadata, setMetadata] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setMetadata(`${fleet} or similar, These can accommodate ${passengers || 0} passengers plus up to ${suitCases || 0} standard suitcases (23kg max).${fleet} or similar`);
    }, [passengers, suitCases]);
    console.log(metadata);
    const errorRef = useRef(null);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [error]);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage(reader.result); // Use the entire base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (event) => {
        event.preventDefault(); // Prevent form submission
        document.getElementById('file-upload').click();
    };
    console.log(fleet, "fleet", rate, "rate", passengers, "passangers", suitCases, "suitcases")
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!fleet || !rate || !passengers || !suitCases || !image) {
            setError("Please fill in all fields and upload an image.");
            return;
        }
        const formData = {
            car_category: fleet,
            mileage_price: parseInt(rate, 10),
            image,
            metadata: metadata
        }
        await AddCar(formData, navigate);
        // Add logic to handle form submission, e.g., sending data to a server
       
    };
console.log(image);
    return (
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 max-w-7xl mx-auto mt-10">
            <form onSubmit={handleSubmit}>
            {error && (
                    <div ref={errorRef} className="text-redfive pt-5 mb-4 font-semibold text-center">
                        {error}
                    </div>
                )}
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
                    <div className="w-full lg:w-auto mx-4 md:mx-10">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333333]">Taxi Go</h2>
                        <h3 className="text-xl sm:text-2xl text-[#333333]">Add New Fleet</h3>

                        <div className="mt-8">
                            <h1 className="text-[#FEB601] text-lg sm:text-xl font-bold mb-2">Fleet</h1>
                            <input
                                type="text"
                                value={fleet}
                                onChange={(e) => setFleet(e.target.value)}
                                placeholder="Type Fleet Name..."
                                className="w-full sm:w-[350px] md:w-[438px] h-[40px] border rounded pl-4 sm:pl-6"
                            />
                        </div>

                        <div className="mt-8">
                            <h1 className="text-[#FEB601] text-lg sm:text-xl font-bold mb-2">Rate/Mile</h1>
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                placeholder="$$/Mile"
                                className="w-full sm:w-[350px] md:w-[438px] h-[40px] border rounded pl-4 sm:pl-6"
                            />
                        </div>

                        <div className="mt-8">
                            <h1 className="text-[#FEB601] text-lg sm:text-xl font-bold mb-2">Number of Passengers</h1>
                            <input
                                type="number"
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                                placeholder="Number of Passengers"
                                className="w-full sm:w-[350px] md:w-[438px] h-[40px] border rounded pl-4 sm:pl-6"
                            />
                        </div>

                        <div className="mt-8">
                            <h1 className="text-[#FEB601] text-lg sm:text-xl font-bold mb-2">Luggage (Suitcases)</h1>
                            <input
                                type="number"
                                value={suitCases}
                                onChange={(e) => setSuitCases(e.target.value)}
                                placeholder="3 Suitcases"
                                className="w-full sm:w-[350px] md:w-[438px] h-[40px] border rounded pl-4 sm:pl-6"
                            />
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="w-full lg:w-[301px] h-[314px] lg:mt-[150px] lg:mr-[100px] border rounded flex flex-col justify-center items-center relative">
                        {image ? (
                            <div className="relative w-full h-full">
                                <img  src={image} alt="Selected" className="w-full h-full object-contain rounded" />
                                <button
                                    onClick={handleImageClick}
                                    className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity"
                                >
                                    Change Image
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer text-center text-gray-500 p-4"
                            >
                                Click to browse or drag and drop images
                            </label>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Update Button */}
                <button className="w-full sm:w-[300px] md:w-[390px] h-[50px] bg-[#FFCA09] rounded mt-8 mb-4 font-bold text-lg md:text-xl flex justify-center items-center mx-auto">
                    Add New Fleet
                    <img src={update} alt="Update Button" className="ml-2" />
                </button>
            </form>
        </div>
    );
}

export default Fleet;