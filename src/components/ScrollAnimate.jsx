import { useInView } from 'react-intersection-observer';

const ScrollAnimate = ({ children, className = "", delay = 0, direction = "up" }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.05,
  });

  return (
    <div
      ref={ref}
      className={`${className} scroll-hidden animate-${direction} ${inView ? 'show' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
