import React from 'react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
                <p className="mt-4 text-lg text-gray-700">Loading the content...</p>
            </div>
        </div>
    );
}