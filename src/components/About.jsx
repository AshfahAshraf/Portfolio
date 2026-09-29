import ScrollAnimate from './ScrollAnimate';


const About = () => {
  return (
    <section className="about-section py-5" id="about">
      <div className="container">
        <ScrollAnimate direction="down">
          <h1 className="text-center mb-5 text-white display-4 fw-bold">
            About <span className="text-violet">Me</span>
          </h1>
        </ScrollAnimate>

        <div className="row align-items-center justify-content-center text-center text-md-start">
          <div className="col-md-4 mb-4 mb-md-0">
            <ScrollAnimate delay={0.2} direction="left">
              <img src="/ashfah.png" className="img-fluid rounded-circle shadow profile-img" alt="Ashfah" />
            </ScrollAnimate>
          </div>

          <div className="col-md-6 text-white">
            <ScrollAnimate delay={0.4} direction="right">
              <h2 className="fw-bold mb-3">Full Stack Developer</h2>
              <p className="about-text">
                I’m <strong className="text-white">Ashfah Ashraf</strong>, a Full Stack Developer with hands-on experience building scalable, high-performance web applications using <strong className="text-violet">Python (FastAPI, Django)</strong>, <strong className="text-violet">React</strong>, <strong className="text-violet">Next.js</strong>, and <strong className="text-violet">MySQL/MongoDB</strong>.
              </p>
              <p className="about-text">
                As a <strong className="text-white">Full Stack Developer Intern</strong> at <strong className="text-white">MarketBytes (Infopark Cherthala)</strong>, I led feature development for a 4-member team, engineering a production LegalTech platform with an automated <strong className="text-white">e-Courts India API gateway</strong>, AI document drafting engine, and JWT Role-Based Access Control (RBAC)—achieving a <strong className="text-success">30% reduction in API response times</strong> through query optimization.
              </p>
              <p className="about-text">
                My portfolio includes <strong className="text-violet">CraftHover</strong> (an AI handicraft marketplace leveraging Hugging Face Transformers & Chart.js) and specialized training from <strong className="text-white">BLearn Academy</strong> paired with a B.Tech in Computer Science. I focus on delivering clean, maintainable code, secure RESTful APIs, and responsive digital experiences.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-4">
                {['Python', 'Django', 'FastAPI', 'React.js', 'Next.js', 'TypeScript', 'MySQL', 'MongoDB', 'JWT / RBAC', 'Hugging Face'].map((skill, i) => (
                  <span key={i} className="badge skill-badge px-3 py-2">{skill}</span>
                ))}
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
