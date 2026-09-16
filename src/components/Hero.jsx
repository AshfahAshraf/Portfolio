import { useEffect, useState } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Ashfah Ashraf";
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero d-flex align-items-center justify-content-center text-center" id="home">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?fm=jpg&q=60&w=3000" alt="Hero Background" />
      </div>

      <div className="container position-relative hero-content">
        <h1 className="fw-bold display-3 text-white">
          Hi, I'm <span className="text-violet">{displayText}</span>
          <span className="type-cursor">|</span>
        </h1>

        <div style={{ opacity: showContent ? 1 : 0, transform: showContent ? 'translateY(0)' : 'translateY(15px)', transition: 'all 0.8s ease' }}>
          <p className="lead fw-bold text-secondary">Full Stack Developer</p>
          <p className="skills-text text-violet">
            Python | Django | FastAPI | React | Next.js | MySQL
          </p>

          <div className="mt-4">
            <a href="#projects" className="btn btn-violet me-3">
              View My Work ↓
            </a>
            <a href="/Ashfah_Ashraf_Python_Fullstack.pdf" download className="btn btn-violet">
              Download Resume ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
