import React, { useState, useEffect, useRef } from "react";
import updateIcon from '../../assets/update.svg';
import deleteIcon from '../../assets/delete.svg';
import { updateCar, fetchCar, deleteCar } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
function EditFleet() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [fleet, setFleet] = useState('');
    const [rate, setRate] = useState('');
    const [passengers, setPassengers] = useState('');
    const [suitCases, setSuitCases] = useState('');
    const [metadata,setMetadata]=useState("");
    const [resmetadata,setresMetadata]=useState("");

    const [error, setError] = useState("");
    const BASE_IMAGE_URL = 'http://localhost:8080'; 
    const navigate = useNavigate();
    const carid = useParams().carid;
    console.log("carid",carid)
    const fetchData = async () => {
        const response = await fetchCar(parseInt(carid,10));
        setFleet(response.car_category)
        setRate(response.mileage_price)
        setSelectedImage(response.image)
        setresMetadata(response.metadata)
        const numbers = response.metadata.match(/\d+/g);
        console.log(numbers)
        if (numbers && numbers.length >= 2) {
            setPassengers(numbers[0])
            setSuitCases(numbers[1])
        }
    };
    useEffect(() => {
       
        fetchData();
    }, [])
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
                setSelectedImage(reader.result); // Use the entire base64 string
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageClick = (event) => {
        event.preventDefault(); // Prevent form submission
        document.getElementById('file-upload').click();
    };
    console.log(fleet, "fleet", rate, "rate", passengers, "passengers", suitCases, "suitcases");
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!fleet || !rate || !passengers || !suitCases || !selectedImage) {
            setError("Please fill in all fields and upload an image.");
            return;
        }

           const formData = {
            car_id: parseInt(carid, 10),
            car_category: fleet,
            mileage_price: parseInt(rate, 10),
            // metadata: metadata
        };
        console.log("1",metadata)
        console.log("2",resmetadata)

        // if (metadata !== resmetadata ) {
        //     formData.metadata = metadata;
        //     // console.log("metaaaa",metadata);
        // }else{
        //     // console.log("metaaaa",metadata);
        //     formData.metadata = resmetadata;
        //     // console.log("resssss",resmetadata);
        // }
        const extractNumbers = (str) => {
            const numbers = str.match(/\d+/g);
            return numbers ? numbers.slice(0, 2) : [];
        };

        const metadataNumbers = extractNumbers(metadata);
        const resmetadataNumbers = extractNumbers(resmetadata);

        if (
            metadataNumbers.length === 2 &&
            resmetadataNumbers.length === 2 &&
            metadataNumbers[0] === resmetadataNumbers[0] &&
            metadataNumbers[1] === resmetadataNumbers[1]
        ) {
            formData.metadata = resmetadata;
        } else {
            formData.metadata = metadata;
        }

        if (!selectedImage.startsWith('./public')) {
            formData.image = selectedImage;
        }
        await updateCar(formData, navigate );
        fetchData();

    };
    const handledelete = async ()=>{
        console.log("car",carid)
        await deleteCar(parseInt(carid, 10), navigate)
    }

    return (
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 max-w-7xl mx-auto mt-10">
         <form onSubmit={handleSubmit}>
         {error && (
                    <div ref={errorRef} className="text-redfive mb-4 text-center">
                        {error}
                    </div>
                )}
                <div className="lg:px-10 px-0">
 <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">Taxi Go</h2>
                    <div className="flex justify-between items-center h-7">
                    <h3 className="text-2xl text-[#333333]">Edit Your Fleet</h3>
                    <img src={deleteIcon} alt="not found" className="w-10 h-20" onClick={handledelete}/>
                    </div>
                    </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
           
                <div className="w-full lg:w-1/2 mx-4 md:mx-10">
                   
                    <div className="mt-8">
                        <h1 className="text-[#FEB601] text-xl font-bold mb-2">Fleet</h1>
                        <input 
                            type="text" 
                            value={fleet} 
                            onChange={(e) => setFleet(e.target.value)} 
                            placeholder="Type Fleet Name..." 
                            className="w-full lg:w-[438px] h-[40px] border rounded pl-8" 
                        />
                    </div>

                    <div className="mt-8">
                        <h1 className="text-[#FEB601] text-xl font-bold mb-2">Rate/Mile</h1>
                        <input 
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            placeholder="$$/Mile"
                            className="w-full lg:w-[438px] h-[40px] border rounded pl-8" 
                        />
                    </div>

                    <div className="mt-8">
                        <h1 className="text-[#FEB601] text-xl font-bold mb-2">Number of Passengers</h1>
                        <input 
                            type="number"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            placeholder="Number of Passengers" 
                            className="w-full lg:w-[438px] h-[40px] border rounded pl-8" 
                        />
                    </div>

                    <div className="mt-8">
                        <h1 className="text-[#FEB601] text-xl font-bold mb-2">Luggage (Suitcases)</h1>
                        <input 
                            type="number"
                            value={suitCases}
                            onChange={(e) => setSuitCases(e.target.value)}
                            placeholder="3 Suitcases" 
                            className="w-full lg:w-[438px] h-[40px] border rounded pl-8" 
                        />
                    </div>
                </div>

                {/* Image Upload Section */}
              
<div className="w-full lg:w-[301px] h-[314px] lg:mt-[150px] lg:mr-[100px] border rounded flex flex-col justify-center items-center relative">
    {selectedImage ? (
        <div className="relative w-full h-full">
            <img 
                src={selectedImage.startsWith('./public') ? `${BASE_IMAGE_URL}/${selectedImage}` : selectedImage} 
                alt="Selected" className="w-full h-full object-contain rounded" />
            <button
                onClick={handleImageClick}
                className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
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
            <div className="flex justify-center mt-10 mb-4">
                <button className="w-full max-w-md h-[53px] bg-[#FFCA09] rounded font-bold text-xl flex justify-center items-center">
                    Update
                    <img src={updateIcon} alt="Update Button" className="ml-2" />
                </button>
            </div>
        </form>
        </div>
    );
}

export default EditFleet;