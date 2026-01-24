import React from 'react';
import ProgramCard from './ProgramCard';
import { FaBookOpen, FaGraduationCap, FaHandsHelping, FaLaptop, FaChalkboardTeacher, FaTruck } from 'react-icons/fa';
import './ProgramCard.css'; // Import shared styles

const programsData = [
    {
        title: "Book Collection Drives",
        description: "We organize community-led drives to collect gently used books, giving them a second life in the hands of eager young readers.",
        icon: <FaBookOpen />
    },
    {
        title: "Rural Library Setup",
        description: "Establishing vibrant libraries in under-served rural schools to nurture a habit of reading and critical thinking.",
        icon: <FaGraduationCap />
    },
    {
        title: "Digital Literacy",
        description: "Bridging the digital divide by providing e-readers and digital learning tools to remote communities.",
        icon: <FaLaptop />
    },
    {
        title: "Teacher Training",
        description: "Empowering educators with modern teaching methodologies and resources to improve learning outcomes.",
        icon: <FaChalkboardTeacher />
    },
    {
        title: "Mobile Library",
        description: "Our 'Knowledge on Wheels' initiative brings books directly to the doorsteps of children in remote hamlets.",
        icon: <FaTruck />
    },
    {
        title: "Community Reading",
        description: "Weekly reading sessions and storytelling workshops to foster a love for literature and storytelling.",
        icon: <FaHandsHelping />
    }
];

const ProgramsSection = () => {
    return (
        <>
            {/* Hero Header with Background Image */}
            <section style={{
                background: 'linear-gradient(rgba(45, 95, 63, 0.85), rgba(45, 95, 63, 0.85)), url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 1rem',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#FBBF24',
                    marginBottom: '1rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Our Impact Programs
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                    opacity: '0.95'
                }}>
                    Explore how we are making a difference through our focused initiatives in education and literacy.
                </p>
            </section>

            {/* Programs Grid Section */}
            <section style={{ padding: '4rem 1rem', background: '#F3F4F6' }}>
                <div className="programs-grid">
                    {programsData.map((program, index) => (
                        <ProgramCard
                            key={index}
                            index={index}
                            title={program.title}
                            description={program.description}
                            icon={program.icon}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default ProgramsSection;
