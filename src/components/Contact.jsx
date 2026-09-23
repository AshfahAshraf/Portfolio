import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ScrollAnimate from './ScrollAnimate';


const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    // Fetch EmailJS keys from environment variables with fallbacks
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_u9cx6nr';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_24y1rwn';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 's1uZ06nZSHvekhMB0';

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setStatusMessage('EmailJS credentials missing. Please email directly at ashfahashraf@gmail.com.');
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, {
      publicKey: publicKey,
    })
      .then((result) => {
        console.log('EmailJS Success:', result.text);
        setStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        form.current.reset();
      }, (error) => {
        console.error('EmailJS Error:', error.text);
        setStatus('error');
        setStatusMessage('Failed to send message. Please try again or email directly.');
      });
  };

  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        <ScrollAnimate direction="down">
          <h2 className="text-center text-white mb-5 display-5 fw-bold">
            Get In <span className="text-violet">Touch</span>
          </h2>
        </ScrollAnimate>

        <div className="row justify-content-center align-items-start g-5">
          <div className="col-md-5 text-white">
            <ScrollAnimate delay={0.2} direction="left" className="d-flex flex-column gap-3">
              <h3 className="fw-bold mb-3">Let's work together</h3>
              <p className="text-light mb-4">
                I'm always excited to collaborate on new projects and opportunities.
                Feel free to reach out anytime!
              </p>

              <div className="d-flex flex-column gap-3">
                <a href="mailto:ashfahashraf@gmail.com" className="btn contact-btn w-100">
                  <i className="fa-regular fa-envelope"></i> &nbsp; ashfahashraf@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/ashfah-ashraf-b32b2b22a/" className="btn social-btn w-100" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin-in"></i> &nbsp; LinkedIn
                </a>
                <a href="https://github.com/AshfahAshraf" className="btn social-btn w-100" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i> &nbsp; GitHub
                </a>
                <button className="btn social-btn w-100">
                  <i className="fa-solid fa-map-pin"></i> &nbsp; Kerala, India
                </button>
              </div>
            </ScrollAnimate>
          </div>

          <div className="col-md-5">
            <ScrollAnimate delay={0.4} direction="right">
              <form ref={form} onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                {status === 'success' && (
                  <div className="alert alert-success alert-dismissible fade show border-0 rounded-3 shadow-sm py-3 px-4" role="alert">
                    <i className="fa-solid fa-circle-check me-2"></i> {statusMessage}
                    <button type="button" className="btn-close" onClick={() => setStatus('idle')}></button>
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert alert-danger alert-dismissible fade show border-0 rounded-3 shadow-sm py-3 px-4" role="alert">
                    <i className="fa-solid fa-circle-exclamation me-2"></i> {statusMessage}
                    <button type="button" className="btn-close" onClick={() => setStatus('idle')}></button>
                  </div>
                )}

                <input type="text" name="name" className="form-control contact-input" placeholder="Your Name" required />
                <input type="email" name="email" className="form-control contact-input" placeholder="Your Email" required />
                <textarea name="message" rows="5" className="form-control contact-textarea" placeholder="Your Message" required></textarea>
                
                <button 
                  type="submit" 
                  id="submitBtn" 
                  className="btn btn-violet py-3 w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
