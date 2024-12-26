import React from 'react';

const Footer: React.FC = () => {
    const currentYear: number = new Date().getFullYear();
    return (
        <footer className="bg-gray text-white py-6">
            <div className="container mx-auto text-center">
                <p className="mb-4">&copy; 2024 - {currentYear} officialbishowb&apos;s blog. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;