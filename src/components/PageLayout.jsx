import React from 'react';
import HybridNavbar from '../components/HybridNavbar';
import Footer from '../components/Footer';

const PageLayout = ({ children }) => {
    return (
        <>
            <HybridNavbar />
            <main style={{ paddingTop: '80px' }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default PageLayout;
