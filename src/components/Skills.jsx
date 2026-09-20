import ScrollAnimate from './ScrollAnimate';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages & Frontend',
      skills: [
        { name: 'Python', icon: 'fa-brands fa-python', color: '#FFD43B' },
        { name: 'JavaScript (ES6+)', icon: 'fa-brands fa-js', color: '#F7DF1E' },
        { name: 'TypeScript', icon: 'TS', color: '#3178C6', isText: true },
        { name: 'React.js', icon: 'fa-brands fa-react', color: '#61DAFB' },
        { name: 'Next.js', icon: 'N', color: '#ffffff', isText: true },
        { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#38bdf8' },
        { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: '#7952b3' },
        { name: 'HTML5 / CSS3', icon: 'fa-brands fa-html5', color: '#E34F26' },
      ]
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'Django', icon: 'fa-solid fa-server', color: '#092E20' },
        { name: 'Django REST (DRF)', icon: 'fa-solid fa-code-branch', color: '#a30000' },
        { name: 'FastAPI', icon: 'fa-solid fa-bolt', color: '#009688' },
        { name: 'MySQL', icon: 'fa-solid fa-database', color: '#4479A1' },
        { name: 'MongoDB', icon: 'fa-solid fa-leaf', color: '#47A248' },
        { name: 'RESTful APIs', icon: 'fa-solid fa-network-wired', color: '#8A2BE2' },
        { name: 'JWT Auth', icon: 'fa-solid fa-key', color: '#d63384' },
        { name: 'RBAC Security', icon: 'fa-solid fa-shield-halved', color: '#20c997' },
      ]
    },
    {
      title: 'Tools & Ecosystem',
      skills: [
        { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
        { name: 'GitHub', icon: 'fa-brands fa-github', color: '#ffffff' },
        { name: 'GitHub Copilot', icon: 'fa-solid fa-robot', color: '#6f42c1' },
        { name: 'Jira', icon: 'fa-brands fa-jira', color: '#0052CC' },
        { name: 'Linux', icon: 'fa-brands fa-linux', color: '#EAA545' },
        { name: 'Hugging Face', icon: 'fa-solid fa-brain', color: '#FFD21E' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-5 skills-section">
      <div className="container text-center">
        <ScrollAnimate direction="down">
          <h2 className="mb-4 display-5 fw-bold text-white">
            Skills & <span className="text-violet">Technologies</span>
          </h2>
        </ScrollAnimate>

        <div className="skills-wrapper">
          {skillCategories.map((cat, idx) => (
            <ScrollAnimate key={idx} delay={idx * 0.2} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className="skill-category">
                <h4 className="category-title">{cat.title}</h4>
                <div className="skill-pill-group">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-pill">
                      {skill.isText ? (
                        <b style={{ color: skill.color, fontFamily: 'monospace', fontSize: '1.1rem' }}>{skill.icon}</b>
                      ) : (
                        <i className={skill.icon} style={{ color: skill.color, background: skill.bg || 'transparent', borderRadius: skill.bg ? '50%' : '0', padding: skill.bg ? '2px' : '0' }}></i>
                      )}
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

