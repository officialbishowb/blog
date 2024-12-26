import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray text-white py-6">
            <div className="container mx-auto text-center">
                <p className="mb-4">&copy; {currentYear} officialbishowb. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;