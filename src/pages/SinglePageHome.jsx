import React from 'react';
import { Element } from 'react-scroll';
import HybridNavbar from '../components/HybridNavbar';
import HeroSectionScroll from '../components/HeroSectionScroll';
import AboutSectionScroll from '../components/AboutSectionScroll';
import ProgramsSectionScroll from '../components/ProgramsSectionScroll';
import BlogSectionScroll from '../components/BlogSectionScroll';
import EventsSectionScroll from '../components/EventsSectionScroll';
import GallerySectionScroll from '../components/GallerySectionScroll';
import ContactSectionScroll from '../components/ContactSectionScroll';
import GetInvolvedSectionScroll from '../components/GetInvolvedSectionScroll';
import FooterNew from '../components/FooterNew';
import MobileStickyDonateBar from '../components/MobileStickyDonateBar';

const SinglePageHome = () => {
    return (
        <div className="w-full overflow-x-hidden bg-background-light text-text">
            {/* Sticky Navigation */}
            <HybridNavbar />

            {/* All Sections */}
            <main className="flex flex-col">
                <Element name="home">
                    <HeroSectionScroll />
                </Element>

                <Element name="about">
                    <AboutSectionScroll />
                </Element>

                <Element name="programs">
                    <ProgramsSectionScroll />
                </Element>

                <Element name="blog">
                    <BlogSectionScroll />
                </Element>

                <Element name="events">
                    <EventsSectionScroll />
                </Element>

                <Element name="gallery">
                    <GallerySectionScroll />
                </Element>

                <Element name="contact">
                    <ContactSectionScroll />
                </Element>

                <Element name="get-involved">
                    <GetInvolvedSectionScroll />
                </Element>
            </main>

            {/* Footer */}
            <FooterNew />

            {/* Mobile Sticky Donate Bar */}
            <MobileStickyDonateBar />
        </div>
    );
};

export default SinglePageHome;
