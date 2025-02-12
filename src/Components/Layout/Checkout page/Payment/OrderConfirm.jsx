import React, { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const OrderConfirm = () => {
    const [messageVisible, setMessageVisible] = useState(false);

    // When the component is mounted, show the congratulatory message
    useEffect(() => {
        setMessageVisible(true);
    }, []);

    return (
        <div className="text-center p-4">
            {messageVisible && (
                <div>
                    {/* Confetti Explosion */}
                    <ConfettiExplosion />
                    <h2 className="text-xl font-semibold mb-4">Congratulations!</h2>
                    <p className="text-lg">Order submitted successfully.</p>
                </div>
            )}

            <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                onClick={() => {
                    // Handle the "Go to shopping" button click (e.g., redirect to a shopping page)
                    window.location.href = "/"; // Replace with actual path
                }}
            >
                Go to Shopping
            </button>
        </div>
    );
}

export default OrderConfirm;
