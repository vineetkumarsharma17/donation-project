import React from 'react';
import HybridNavbar from '../components/HybridNavbar';
import FooterNew from '../components/FooterNew';

const PageLayout = ({ children }) => {
    return (
        <>
            <HybridNavbar />
            <main style={{ paddingTop: '80px' }}>
                {children}
            </main>
            <FooterNew />
        </>
    );
};

export default PageLayout;
