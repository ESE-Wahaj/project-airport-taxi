// PopUp.jsx

import React from "react";

function PopUp({ closePopUp, onStatusChange }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-[300px] h-[300px] bg-white rounded-lg p-6 shadow-lg flex items-center justify-center">
                <div className="flex flex-col items-center mt-8 space-y-4">
                    <button
                        onClick={() => onStatusChange(
                            <button className="w-28 h-10 bg-[#A0D9D0] text-[#00B69B] rounded-md">Paid</button>
                        )}
                        className="w-28 h-10 bg-[#A0D9D0] text-[#00B69B] rounded-md">Paid</button>
                    <button
                        onClick={() => onStatusChange(
                            <button className="w-28 h-10 bg-[#F5C6C7] text-[#B60003] rounded-md">Unpaid</button>
                        )}
                        className="w-28 h-10 bg-[#F5C6C7] text-[#B60003] rounded-md">Unpaid</button>
                    <button
                        onClick={() => onStatusChange(
                            <button className="w-28 h-10 bg-[#D8BFD8] text-[#6226EF] rounded-md">Pending</button>
                        )}
                        className="w-28 h-10 bg-[#D8BFD8] text-[#6226EF] rounded-md">Pending</button>
                    <button
                        onClick={closePopUp}
                        className="w-28 h-10 bg-gray-500 text-white rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
}

export default PopUp;