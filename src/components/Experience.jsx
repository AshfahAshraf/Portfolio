import { useEffect, useRef, useState } from 'react';
import ScrollAnimate from './ScrollAnimate';

const Experience = () => {
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

  return (
    <section id="experience" className="experience-section py-5">
      <div className="container">
        <ScrollAnimate direction="down">
          <h2 className="text-center text-white mb-5 display-5 fw-bold">
            Work <span className="text-violet">Experience</span>
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

          <ScrollAnimate direction="right">
            <div className="timeline-item mb-5">
              <div className="timeline-dot"></div>
              <div className="timeline-content card-glass p-4">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="fw-bold text-white mb-1">Full Stack Developer</h3>
                    <p className="text-violet fw-bold mb-0">
                      <i className="fa-solid fa-briefcase me-2"></i> MarketBytes
                    </p>
                  </div>
                  <span className="badge bg-violet text-white px-3 py-2">Infopark, Cherthala</span>
                </div>

                <div className="d-flex flex-wrap gap-4 text-secondary small mb-3">
                  <span><i className="fa-solid fa-calendar-days text-violet me-2"></i> March 2026 - September 2026</span>
                  <span><i className="fa-solid fa-location-dot text-violet me-2"></i> Kerala, India</span>
                </div>

                <ul className="text-secondary mb-3 ps-3 text-start">
                  <li className="mb-2">
                    Led feature development for a <strong className="text-white">4-member team</strong> to build a production-ready law firm management system using <strong className="text-violet">Next.js 16</strong>, <strong className="text-violet">React</strong>, <strong className="text-violet">Python FastAPI</strong>, and <strong className="text-violet">MySQL</strong>.
                  </li>
                  <li className="mb-2">
                    Engineered an automated <strong className="text-white">eCourts portal sync engine</strong> and background scheduler, optimizing database indexing to reduce API response latency by <strong className="text-success">30%</strong> during load testing.
                  </li>
                  <li>
                    Architected granular <strong className="text-violet">JWT-based RBAC</strong> across 4 user roles, integrated <strong className="text-white">Razorpay payment workflows</strong>, and containerized microservices with <strong className="text-violet">Docker</strong> for seamless staging deployments.
                  </li>
                </ul>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {['Python', 'FastAPI', 'Next.js 16', 'React', 'MySQL', 'Docker', 'JWT', 'RBAC', 'Razorpay'].map((tech, idx) => (
                    <span key={idx} className="badge project-badge px-2 py-1">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
};

export default Experience;

