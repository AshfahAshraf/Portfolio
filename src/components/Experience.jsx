import ScrollAnimate from './ScrollAnimate';

const Experience = () => {
  return (
    <section id="experience" className="experience-section py-5">
      <div className="container">
        <ScrollAnimate direction="down">
          <h2 className="text-center text-white mb-5 display-5 fw-bold">
            Work <span className="text-violet">Experience</span>
          </h2>
        </ScrollAnimate>

        <div className="timeline-container mx-auto" style={{ maxWidth: '900px' }}>
          <div className="timeline-line"></div>

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
                  <span><i className="fa-solid fa-calendar-days text-violet me-2"></i> April 2026 - September 2026</span>
                  <span><i className="fa-solid fa-location-dot text-violet me-2"></i> Kerala, India</span>
                </div>

                <ul className="text-secondary mb-3 ps-3 text-start">
                  <li className="mb-2">
                    Developed a <strong className="text-white">LegalTech platform</strong> serving 5 user roles with secure <strong className="text-violet">JWT Authentication</strong> and <strong className="text-violet">Role-Based Access Control (RBAC)</strong>.
                  </li>
                  <li className="mb-2">
                    Improved API response time by <strong className="text-success">30%</strong> through query optimization and efficient database design.
                  </li>
                  <li>
                    Led feature development for a <strong className="text-white">4-member development team</strong>, managing Git workflows, code reviews, and sprint delivery.
                  </li>
                </ul>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {['Python', 'FastAPI', 'Next.js', 'Django', 'MySQL', 'JWT', 'RBAC', 'Git'].map((tech, idx) => (
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

