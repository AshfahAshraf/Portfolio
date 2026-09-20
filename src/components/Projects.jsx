import ScrollAnimate from './ScrollAnimate';

const Projects = () => {
  const projects = [
    {
      title: "LegalTech Platform – Law Firm & Case Management System",
      status: "Featured Project",
      description: "Full-stack legal tech platform with an automated e-Courts India API gateway (CNR tracking), AI-assisted legal document drafting engine with Junior-to-Senior approval workflow, Razorpay payment processing, and Google Calendar hearing alerts.",
      tags: ["FastAPI", "Next.js", "Python", "MySQL", "SQLAlchemy", "JWT", "Razorpay", "Alembic"],
      image: "/legaltech.png",
      github: "https://github.com/AshfahAshraf/Legal-Tech",
      reverse: false
    },
    {
      title: "CraftHover – AI-Powered Handicraft Marketplace",
      description: "Full-stack handicraft marketplace connecting artisans & customers. Integrated Hugging Face Transformers for AI-driven product descriptions and built real-time analytics dashboards using Chart.js.",
      tags: ["Python", "Django", "Hugging Face", "Chart.js", "Bootstrap", "MySQL"],
      image: "/craftHover.png",
      github: "https://github.com/AshfahAshraf/CraftHover",
      reverse: true
    },
    {
      title: "Dental Clinic Management System",
      description: "A modern, high-performance full-stack web application for dental clinics featuring a patient-facing portal (online booking, treatment catalog, before/after gallery, virtual tour, Google reviews) and a robust admin dashboard for clinic staff to manage appointments, doctors, services, and patient inquiries.",
      tags: ["React", "TypeScript", "Python", "Django", "MySQL"],
      image: "/dental.png",
      github: "https://github.com/AshfahAshraf/Dental-Clinic.git",
      reverse: false
    },
    {
      title: "My-G Clone",
      description: "A responsive e-commerce UI inspired by myG with products, navigation, and clean responsive design.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/myg.png",
      github: "https://github.com/AshfahAshraf/myG-E-Commerce-website.git",
      live: "https://my-g-ecommerce-website.vercel.app/",
      reverse: true
    }
  ];

  return (
    <section id="projects" className="projects-section py-5">
      <div className="container">
        <ScrollAnimate direction="down">
          <h2 className="text-center text-white mb-5 display-5 fw-bold">
            Featured <span className="text-violet">Projects</span>
          </h2>
        </ScrollAnimate>

        <div className="project-showcase mt-5">
          {projects.map((proj, idx) => (
            <ScrollAnimate key={idx} direction={proj.reverse ? 'right' : 'left'}>
              <div className={`row align-items-center mb-5 pb-5 project-row`}>
                <div className={`col-lg-5 ${proj.reverse ? 'order-2' : 'order-2 order-lg-1'} text-center text-lg-start ${proj.reverse ? 'offset-lg-1' : ''}`}>
                  <h3 className="fw-bold text-white mb-3">
                    {proj.title}
                    {proj.status && <span className="badge bg-violet text-white ms-2" style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>{proj.status}</span>}
                  </h3>
                  <p className="text-secondary mb-4 fs-5" style={{ lineHeight: 1.6 }}>
                    {proj.description}
                  </p>
                  <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="badge project-badge px-3 py-2">{tag}</span>
                    ))}
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mt-4">
                    {proj.github && proj.github !== '#' && (
                      <a href={proj.github} className="btn btn-outline-light rounded-pill px-4 py-2 w-100 w-sm-auto" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-github me-2"></i> Source Code
                      </a>
                    )}
                    {proj.live && (
                      <a href={proj.live} className="btn btn-violet rounded-pill px-4 py-2 w-100 w-sm-auto" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-arrow-up-right-from-square me-2"></i> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <div className={`col-lg-6 ${proj.reverse ? 'order-1' : 'order-1 order-lg-2'} mb-4 mb-lg-0 ${proj.reverse ? '' : 'offset-lg-1'}`}>
                  <div className="project-image-wrapper">
                    <img src={proj.image} className="img-fluid rounded-3 shadow" alt={proj.title} />
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

export default Projects;

