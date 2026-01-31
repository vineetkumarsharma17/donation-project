import React from 'react';
import HybridNavbar from './HybridNavbar';
import FooterNew from './FooterNew';

const PageLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background-light text-text">
            <HybridNavbar />
            <main className="flex-grow pt-24"> {/* Increased padding for better spacing */}
                {children}
            </main>
            <FooterNew />
        </div>
    );
};

export default PageLayout;
