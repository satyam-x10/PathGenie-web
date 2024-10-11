'use client';
import React from "react";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-2xl mb-8">Oops! The page you're looking for can't be found.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-cyan-500 rounded-full shadow-lg text-lg hover:bg-cyan-400 transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
