import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPageStyles.css';

const AboutPage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page">
            {/* Blue Header Section */}
            <header className="about-header">
                <h1>About Our Foundation</h1>
                <p className="text-white">
  Empowering communities through education and building brighter futures for children across India.
</p>

            </header>

            {/* Main Content Section */}
            <section className="about-content">
                <div className="section-title">
                    <h2>Who We Are</h2>
                    <h3>Transforming lives through education and empowerment</h3>
                    <div className="title-divider"></div>
                </div>

                <div className="content-grid">
                    <div className="text-column">
                        <p>
                            <span className="foundation-name">SHAILENDRA KUMAR AJAY FOUNDATION</span> is a non-profit organization dedicated to transforming the educational landscape in rural and underserved communities across India. Since our inception in 2015, we have been committed to ensuring that every child has access to quality education, regardless of their socio-economic background.
                        </p>
                        <p>
                            Our holistic approach encompasses not just providing educational resources, but also fostering community engagement, teacher training, infrastructure development, and sustainable support systems that create lasting change.
                        </p>

                        <Link to="/get-involved" className="join-btn">
                            <span className="icon">👍</span> Join Our Mission
                        </Link>
                    </div>

                    <div className="image-column">
                        <img
                            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
                            alt="Foundation vehicle and mission center"
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="team-header-container">
                    <h2 className="team-header">OUR BOARD</h2>
                </div>

                <p className="team-description">
                    Grateful for the commitment of our international board who bring experience, opportunities, and resources to the organisation.
                </p>

                <div className="team-grid">
                    {boardMembers.map((member, index) => (
                        <div
                            key={index}
                            className="team-member"
                            tabIndex="0" // Make focusable for keyboard users
                        >
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-img" />

                                {/* Floating Tooltip - Positioned relative to wrapper */}
                                <div className="member-tooltip">
                                    <p>{member.thought}</p>
                                    <div className="tooltip-arrow"></div>
                                </div>
                            </div>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

// Data Array for Board Members
const boardMembers = [
    {
        name: "Prof. Zvi Bentwich",
        role: "Founder and President",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        thought: "I came to know about the foundation when I started working on NTDs as a researcher and got chance to witness their accomplishments."
    },
    {
        name: "Dr Reut Barak Weekes",
        role: "Chair of Board",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        thought: "To me, this means a dedicated organization working for real change of needy communities. I am thrilled to be part of the board."
    },
    {
        name: "Dr. Einav Levy",
        role: "Director",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        thought: "Every child deserves a healthy start. Our mission is to ensure no community is left behind in the fight against preventable diseases."
    },
    {
        name: "Janet Levy Pahima",
        role: "Director",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        thought: "It is an honor to serve with a team so committed to transparency, impact, and sustainable development."
    },
    {
        name: "Jonathan Middleburgh",
        role: "Director",
        image: "https://randomuser.me/api/portraits/men/62.jpg",
        thought: "Building bridges between resources and needs is what we do best. The foundation is a beacon of hope."
    },
    {
        name: "Mandie Winston",
        role: "Director",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        thought: "Empowering women and children is not just charity, it is an investment in the future of humanity."
    }
];

export default AboutPage;
