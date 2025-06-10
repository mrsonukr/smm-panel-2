import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-500 py-4">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
