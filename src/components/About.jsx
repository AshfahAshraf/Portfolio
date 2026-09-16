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
                I’m Ashfah Ashraf, a Full Stack Developer dedicated to crafting high-performance, responsive web
                applications with a strong foundation in modern frontend frameworks and robust backend systems.
              </p>
              <p className="about-text">
                Specializing in Python, Django, FastAPI, React, and Next.js, I bridge the gap between design and architecture building seamless user interfaces paired with secure, scalable RESTful APIs and database solutions.
              </p>
              <p className="about-text">
                Passionate about writing clean, maintainable code and solving complex technical challenges, I continuously explore new technologies and best practices to deliver intuitive digital experiences.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-4">
                {['Python', 'Django', 'FastAPI', 'React.js', 'Next.js', 'TypeScript', 'MySQL', 'MongoDB'].map((skill, i) => (
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
