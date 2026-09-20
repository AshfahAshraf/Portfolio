import { useEffect, useRef, useState } from 'react';
import ScrollAnimate from './ScrollAnimate';

const Education = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startPoint = windowHeight * 0.75;
      const totalDistance = rect.height;
      const currentScroll = startPoint - rect.top;
      
      const progress = Math.min(Math.max(currentScroll / totalDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const educationData = [
    {
      title: "Python Full Stack Development Training",
      institution: "BLearn Academy",
      period: "Sep 2025 - Mar 2026",
      location: "On-site",
      icon: "fa-solid fa-graduation-cap"
    },
    {
      title: "B.Tech in Computer Science and Engineering",
      institution: "Vimal Jyothi Engineering College",
      period: "July 2021 - April 2025",
      location: "Kannur, Kerala",
      icon: "fa-solid fa-university"
    }
  ];

  return (
    <section id="education" className="education-section py-5">
      <div className="container">
        <ScrollAnimate direction="down">
          <h2 className="text-center text-white mb-5 display-5 fw-bold">
            My <span className="text-violet">Education</span>
          </h2>
        </ScrollAnimate>

        <div ref={containerRef} className="timeline-container mx-auto" style={{ maxWidth: '900px' }}>
          <div className="timeline-line-bg"></div>
          <div 
            className="timeline-line-progress"
            style={{ height: `${scrollProgress * 100}%` }}
          >
            <div className="timeline-line-head" />
          </div>

          {educationData.map((item, idx) => (
            <ScrollAnimate key={idx} delay={idx * 0.2} direction="left">
              <div className="timeline-item mb-5">
                <div className="timeline-dot"></div>
                <div className="timeline-content card-glass p-4">
                  <h3 className="fw-bold text-white mb-2">{item.title}</h3>
                  <p className="text-violet fw-bold mb-3">
                    <i className={`${item.icon} me-2`}></i> {item.institution}
                  </p>
                  <div className="d-flex flex-wrap gap-4 text-secondary small">
                    <span><i className="fa-solid fa-calendar-days text-violet me-2"></i> {item.period}</span>
                    <span><i className="fa-solid fa-location-dot text-violet me-2"></i> {item.location}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

